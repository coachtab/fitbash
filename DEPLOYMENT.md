# FitBash Landing Page — Deployment Guide

This repo is the marketing landing page for **fitbash.de**, deployed to Vercel. It is not the FitBash app itself; that lives in a separate repo with its own deployment.

| Field | Value |
|---|---|
| Production URL | `https://fitbash.de` (and `https://www.fitbash.de` → 308 → apex) |
| Hosting | Vercel |
| Repo | `https://github.com/coachtab/fitbash.git` |
| Production branch | `main` (auto-deploys on push) |
| Framework preset | Next.js (auto-detected) |

---

## Architecture in production

```
                Internet
                   |
            Vercel Edge (fitbash.de)
                   |
    +--------------+--------------+
    |                             |
  Next.js page (RSC)        /api/waitlist
    |                             |
    |                       Resend (email)
    +--------------+--------------+
                   |
            Postgres (Neon)
            waitlist_signups
```

Local development runs against SQLite; **production must run against managed Postgres** because Vercel's filesystem is ephemeral per invocation. See *Production database* below.

---

## Pre-flight checklist

Before the first deploy, have these ready:

- [ ] Vercel account with access to the GitHub `coachtab` org
- [ ] DNS for `fitbash.de` controllable (registrar dashboard)
- [ ] Resend account, with `fitbash.de` verified as a sending domain (SPF + DKIM + DMARC records added)
- [ ] Plausible account with a site for `fitbash.de`
- [ ] A managed Postgres (Neon recommended — generous free tier, instant Vercel integration)

---

## First-time deployment

### 1. Provision the production database (Neon)

1. Create a Neon project named `fitbash-waitlist`.
2. Copy the **pooled** connection string — it looks like `postgresql://user:pass@ep-xyz-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`.
3. Switch the Prisma datasource from SQLite to Postgres (one-time, locally):
   ```bash
   # prisma/schema.prisma — change datasource block to:
   #   provider = "postgresql"
   # then regenerate the client and create a Postgres-targeted migration:
   npx prisma migrate dev --name init_postgres
   ```
   Replace the SQLite adapter in `lib/db.ts` with `@prisma/adapter-pg` and `pg` (`npm install @prisma/adapter-pg pg`). Commit the schema/adapter change.

> Keep `better-sqlite3` available in `devDependencies` if you want to keep local SQLite for development. If you'd rather hit Neon locally too, point `DATABASE_URL` at Neon and remove the SQLite adapter entirely.

### 2. Connect the repo to Vercel

1. In Vercel, **Add New → Project → Import** `coachtab/fitbash`.
2. Framework preset: Next.js (auto). Build command, output, install — leave defaults.
3. Add environment variables (see table below) **before** the first deploy.
4. Click Deploy.

### 3. Add the custom domain

1. Vercel project → **Settings → Domains** → Add `fitbash.de`.
2. Add `www.fitbash.de` and let Vercel set it to redirect to the apex.
3. Vercel will show the required DNS records (apex `A` to `76.76.21.21` and `CNAME` for `www`). Add them at the registrar.
4. SSL is provisioned automatically once DNS resolves.

### 4. Verify

- `https://fitbash.de` resolves and the hero renders
- `POST https://fitbash.de/api/waitlist` accepts a real email and returns `{ok:true}`
- The confirmation email arrives within ~30 seconds, sent from `marc@fitbash.de`
- Plausible dashboard shows the visit
- A row exists in `waitlist_signups` (check via `psql` against Neon)

---

## Environment variables

Set these in Vercel under **Settings → Environment Variables** for the **Production** environment (and Preview if you want preview deployments to be functional too). Never commit these values.

| Variable | Required | Value | Notes |
|---|---|---|---|
| `DATABASE_URL` | yes | Neon pooled connection string | Use the pooled URL, not the direct one — Vercel functions need pgbouncer-style pooling |
| `RESEND_API_KEY` | yes | `re_...` | From Resend → API Keys. Production key, not test key |
| `RESEND_FROM_EMAIL` | yes | `marc@fitbash.de` | Mailbox must exist on the verified sending domain |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | yes | `fitbash.de` | Exposed to the client; matches the site you registered in Plausible |

Local `.env` keeps `DATABASE_URL="file:./dev.db"` and an empty `RESEND_API_KEY` (sending is silently skipped in dev). See [.env.example](.env.example).

---

## DNS records (registrar)

| Host | Type | Value | TTL |
|---|---|---|---|
| `fitbash.de` (apex) | `A` | `76.76.21.21` | 3600 |
| `www` | `CNAME` | `cname.vercel-dns.com` | 3600 |
| `fitbash.de` | `TXT` | `v=spf1 include:amazonses.com ~all` (or value provided by Resend) | 3600 |
| `resend._domainkey` | `TXT` | DKIM value from Resend | 3600 |
| `_dmarc` | `TXT` | `v=DMARC1; p=none; rua=mailto:dmarc@fitbash.de` | 3600 |

Resend will display the exact SPF/DKIM/DMARC values when you add `fitbash.de` as a sending domain — copy those, not the placeholders above.

---

## Email sending (Resend)

1. Resend dashboard → **Domains → Add Domain** → `fitbash.de`.
2. Copy the SPF, DKIM, and DMARC records into the registrar.
3. Wait for verification (usually < 15 min).
4. Verify a test send: in Vercel logs, watch for `confirmation email failed` errors after a real signup.

The confirmation email is plain text, signed personally — see [lib/email.ts](lib/email.ts). Do not change the sender to `noreply@`; the brief explicitly forbids it.

---

## Plausible analytics

1. Plausible dashboard → **Add a website** → `fitbash.de`.
2. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=fitbash.de` in Vercel.
3. The script is loaded conditionally in [app/layout.tsx](app/layout.tsx) — it does not load at all if the env var is unset, which keeps preview deployments out of production analytics.
4. No cookie banner is needed: Plausible is cookieless and is the only tracking on the site.

---

## Redeployment

Production redeploys on every push to `main`:

```bash
git push origin main
```

Vercel runs `npm run build` (which includes `prisma generate`) and ships once the build is green. There is no manual step.

For database schema changes, run the migration **before** the deploy that depends on it:

```bash
# Locally, against the production DATABASE_URL (one-shot)
DATABASE_URL="<neon-prod-url>" npx prisma migrate deploy
git push origin main
```

---

## Rollback

Vercel project → **Deployments** → pick the last green deployment → **Promote to Production**. Takes seconds and is reversible the same way.

---

## Database operations (Neon)

```bash
# Connect (use the direct, non-pooled URL for psql)
psql "<neon-direct-url>"

# Quick count
psql "<neon-direct-url>" -c "SELECT count(*) FROM waitlist_signups;"

# Export
psql "<neon-direct-url>" -c "\copy waitlist_signups TO 'waitlist.csv' CSV HEADER"
```

Neon has built-in branching and point-in-time restore — prefer those over manual `pg_dump` for routine backups.

---

## What is *not* in scope for this guide

- The FitBash mobile app and its backend — separate repo, separate deployment
- Any VPS / Strato / PM2 / Docker / Nginx configuration — this site is on Vercel and does not need any of that
- Multi-region edge configuration — the landing page is light enough to ship from Vercel's defaults
