# Project Intro — GitHub & Strato Deploy Template

A reusable playbook to drop into every new project. Replace each `<PLACEHOLDER>` with the project's value; the boilerplate (server IP, user, key, paths) stays the same across projects.

---

## Per-project placeholders to fill

| Placeholder | Example (fitbash) | Notes |
|---|---|---|
| `<NAME>` | `fitbash` | repo name = directory name = PM2 process = nginx site (keep them aligned) |
| `<DOMAIN>` | `fitbash.de` | apex; `www.<DOMAIN>` is added as an alias |
| `<PORT>` | `3003` | pick a free one — see *Used ports* below |
| `<DB>` | `SQLite` / `Postgres in Docker` | SQLite for waitlist/marketing; Postgres for real apps |
| `<EMAIL_FROM>` | `marc@<DOMAIN>` | sender address; mailbox must exist on a verified sending domain |

---

## GitHub

| Field | Value |
|---|---|
| Org | `coachtab` |
| Repo URL (HTTPS) | `https://github.com/coachtab/<NAME>.git` |
| Repo URL (SSH) | `git@github.com:coachtab/<NAME>.git` |
| Production branch | `main` |
| Commit author name | Kamara, Osman Damian |
| Commit author email | Osman.Kamara+UMGEMU@umusic.com |

### First-time push (from local working dir)

```bash
git init -b main
git remote add origin https://github.com/coachtab/<NAME>.git
git add <files-or-explicit-paths>
git commit -m "Initial commit"
git push -u origin main
```

### Recurring push

```bash
git add <files>
git commit -m "..."
git push origin main
```

> **Never use `git add -A` or `git add .`** — list files explicitly so you don't accidentally stage `.env`, local DB files, or `.claude/`.

---

## Strato server (shared across all projects)

| Field | Value |
|---|---|
| Provider | Strato Dedicated Server |
| IP | `93.90.201.90` |
| OS | Ubuntu 24.04 LTS |
| Node | 22.x via NodeSource apt repo (`/etc/apt/sources.list.d/nodesource.sources` → `node_22.x`) |
| SSH key (local) | `~/.ssh/coachtap_strato` |
| Root user | `root` (system config / nginx / certbot only) |
| App user | `deploy` (owns `/home/deploy/*`) |
| Process manager | PM2, two daemons: `pm2-deploy.service` (deploy-owned apps) and `pm2-root.service` (root-owned services) |
| Web server | nginx 1.24+ with `sites-available` / `sites-enabled` pattern |
| TLS | Let's Encrypt via `certbot --nginx`, auto-renewed by certbot's systemd timer |

### Used ports (pick something else for `<PORT>`)

| Port | Used by | Notes |
|---|---|---|
| 3000 | coachtap | Node app (PM2 deploy) |
| 3002 | kyrooapp | Node app (PM2 root) |
| 3003 | fitbash | Next.js (PM2 deploy) |
| 5499 | coachtap-db | Postgres (Docker) |
| 6379 | Redis | (Docker) |
| 15434 | kyrooapp-db | Postgres (Docker) |
| 22 / 80 / 443 | sshd / nginx | reserved |

Next free for a new app: **`3004`**.

---

## First-time deployment of a new project

### 1. Verify DNS resolves to the server (BEFORE certbot)

```bash
dig +short A <DOMAIN> @1.1.1.1
# expect: 93.90.201.90
```

If empty, add at the registrar:

| Host | Type | Value | TTL |
|---|---|---|---|
| `<DOMAIN>` (apex / `@`) | A | `93.90.201.90` | 3600 |
| `www` | A | `93.90.201.90` | 3600 |

Propagation: 5–30 min on Strato.

### 2. Clone, env, install, build, start (one command)

```bash
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 \
  "su - deploy -c 'set -e; \
    cd /home/deploy && git clone https://github.com/coachtab/<NAME>.git && \
    cd <NAME> && \
    cat > .env << ENVEOF
# fill per-project secrets here, e.g.:
# DATABASE_URL=\"file:./dev.db\"
# RESEND_API_KEY=
# RESEND_FROM_EMAIL=\"<EMAIL_FROM>\"
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
ENVEOF
    npm install && \
    npm run build && \
    PORT=<PORT> pm2 start npm --name <NAME> -- start && \
    pm2 save'"
```

For Prisma-backed apps, also run `npx prisma migrate deploy` between `npm install` and `npm run build`.

### 3. Stage nginx (HTTP only — certbot adds HTTPS in step 4)

```bash
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 "cat > /etc/nginx/sites-available/<NAME> << 'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name <DOMAIN> www.<DOMAIN>;

    location / {
        proxy_pass http://127.0.0.1:<PORT>;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \"upgrade\";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;
}
NGINX
ln -sf /etc/nginx/sites-available/<NAME> /etc/nginx/sites-enabled/<NAME>
nginx -t && systemctl reload nginx"
```

### 4. Issue TLS cert (only after DNS resolves)

```bash
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 \
  "certbot --nginx -d <DOMAIN> -d www.<DOMAIN> --non-interactive --agree-tos --register-unsafely-without-email --redirect"
```

`--redirect` adds the 80 → 443 redirect. Cert auto-renews via certbot's systemd timer.

### 5. Smoke-test

```bash
curl -sI -m 10 https://<DOMAIN> | head -3            # expect 200
curl -sI -m 10 http://<DOMAIN> | head -3             # expect 301 to https
```

---

## Redeploy after a code change

Local:

```bash
git push origin main
```

Server (zero-downtime hot reload — `reload` not `restart`):

```bash
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 \
  "su - deploy -c 'cd /home/deploy/<NAME> && git pull --ff-only && npm install && npm run build && pm2 reload <NAME>'"
```

For config-only changes (no rebuild needed), drop `npm install && npm run build`.

To pick up env changes, `pm2 reload <NAME> --update-env`.

---

## Common operations

```bash
# Tail logs
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 \
  "su - deploy -c 'pm2 logs <NAME> --lines 50 --nostream'"

# Process status (deploy daemon)
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 "su - deploy -c 'pm2 ls'"

# Process status (root daemon — kyrooapp etc.)
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 "pm2 ls"

# What's listening on which port
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 \
  "ss -tlnp | grep -E ':(80|443|<PORT>)'"

# nginx config test + reload (after editing /etc/nginx/sites-available/<NAME>)
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 "nginx -t && systemctl reload nginx"

# Cert status
ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 "certbot certificates"
```

---

## What NOT to commit (always gitignored)

- `.env`, `.env.local`, `.env.*.local` — but `.env.example` *is* committed
- `dev.db`, `dev.db-journal`, any local DB files
- Generated Prisma client (`lib/generated/prisma/` or wherever the schema points)
- `.claude/` — per-machine Claude Code permission rules (paths and tokens are local-only)
- `node_modules/`, `.next/`, `out/`, `build/`, `*.tsbuildinfo`
- SSH keys, TLS certs, PM2 dumps

Use explicit `git add <path>` over `git add .` so a stray sensitive file can't slip in.

---

## Vulnerability handling

When `npm audit` flags transitive vulns and `npm audit fix --force` would downgrade your real dependencies (`next`, `react`, etc.) to ancient versions, use **npm overrides** in `package.json`:

```json
"overrides": {
  "<vulnerable-package>": "<safe-version-range>"
}
```

This forces the secure version everywhere it appears in the tree, leaving your top-level deps untouched. Verify with `npm install && npm audit` afterward.

Example from fitbash:

```json
"overrides": {
  "postcss": "^8.5.0",
  "uuid": "^14.0.0",
  "@hono/node-server": "^1.19.13"
}
```

---

## Pre-deploy checklist for first launch

1. Free port confirmed (next default: `3004`)
2. DNS A records added at registrar, propagated
3. Email service (Resend / etc.) — API key in `.env`, sending domain verified, SPF/DKIM/DMARC records added
4. Analytics (Plausible / etc.) — site registered, env var set
5. Legal pages (Impressum, Datenschutz) reachable from footer with placeholder TODOs
6. Local `npm run build && npm run typecheck && npm run lint` all green
7. Local `npm audit` shows no high/critical (moderate transitive vulns may be acceptable — see *Vulnerability handling*)
8. Server `pm2 ls` shows no name collision with the new app
