# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

FitBash is a fitness exercise discovery app being validated through Instagram. **This repo is the pre-launch marketing landing page only — not the app.** Its single job is converting Instagram bio-link visitors into email subscribers for a launch notification. Most traffic is mobile, in the Instagram in-app browser, DACH region.

The original brief at [docs/BRIEF.md](docs/BRIEF.md) is **historical context** — many of its specific copy and visual rules have been overridden by direct user feedback. The constraints in *this* file reflect the current state and are the authoritative rules.

## Tech stack

- **Framework:** Next.js 16.2 (App Router) + React 19 + TypeScript. Turbopack is on by default. The bundled docs at `node_modules/next/dist/docs/` are the source of truth — APIs differ from older Next.
- **Styling:** Tailwind v4 (CSS-first config in [app/globals.css](app/globals.css) via `@theme`). No component library — write markup directly.
- **Fonts:** Fraunces (serif, with `opsz` and `SOFT` axes) for display + Hanken Grotesk (sans) for body, both via `next/font/google` in [app/layout.tsx](app/layout.tsx).
- **Email:** Resend ([lib/email.ts](lib/email.ts)). Confirmation send is best-effort — DB write succeeds even if Resend fails. If `RESEND_API_KEY` is unset, sending is silently skipped (local dev convenience).
- **DB:** Prisma 7 + SQLite via the **`@prisma/adapter-better-sqlite3`** driver adapter. Prisma 7 requires an adapter — `new PrismaClient()` with no args fails type checks. See [lib/db.ts](lib/db.ts).
- **Analytics:** Plausible (cookieless). Loaded only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. **Never Google Analytics.**
- **Hosting:** Strato VPS at `93.90.201.90`, behind nginx + PM2 (process name `fitbash`, port 3003). Production URL: https://fitbash.de. SSH key for deploys: `~/.ssh/coachtap_strato`. See [intro.md](intro.md) for the full deploy playbook (the older [DEPLOYMENT.md](DEPLOYMENT.md) describes a Vercel target that was never used — treat it as stale).
- **Forms:** Native HTML + `/api/waitlist` route handler. No third-party form builders.

## Commands

```bash
npm run dev          # start dev server on http://localhost:3000
npm run build        # prisma generate && next build
npm run start        # serve the built output
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run db:migrate   # prisma migrate dev (creates dev.db at project root)
npm run db:generate  # prisma generate (regenerate client only)
npm run db:studio    # prisma studio for inspecting waitlist_signups
```

`postinstall` runs `prisma generate` — needed because the generated client lives at `lib/generated/prisma` and is gitignored. **Don't import `@prisma/client` directly** — import `prisma` from [lib/db.ts](lib/db.ts), which wires the adapter.

## Architecture

- **Single-scroll landing page**, no client-side router. The home route is [app/page.tsx](app/page.tsx). Section components live flat in [components/](components/). Page is `force-dynamic` — kept dynamic so we can re-introduce per-request behavior cheaply.
- **Section order** (top to bottom): `SiteHeader` → `Hero` (with the interactive `DuelDemo`) → `HowItWorks` → `WhyItWorks` → `FinalCTA` → `SiteFooter`. There is no SneakPeek, Founder, or FAQ section in the current design — those were dropped during a redesign and the "Built in Berlin" line lives as a bullet inside `WhyItWorks` instead.
- **Two German legal placeholder routes:** [app/impressum/page.tsx](app/impressum/page.tsx) and [app/datenschutz/page.tsx](app/datenschutz/page.tsx). Both `noindex`. Real legal content marked with `TODO` — confirm before launch.
- **POST /api/waitlist** ([app/api/waitlist/route.ts](app/api/waitlist/route.ts)): validate → lowercase email → store with `locale` (from `Accept-Language`), `source` (from body, defaulted from `?ref=` on the page), and `consentAt` → send Resend confirmation. **Idempotent:** repeat submissions return `{ok:true, alreadySubscribed:true}` rather than 409, so the form can show a friendly "Already on the list" state instead of an error.
- **`WaitlistForm`** ([components/WaitlistForm.tsx](components/WaitlistForm.tsx)) is a client component shared by Hero and FinalCTA. It branches the success card based on `alreadySubscribed`: fresh signups get a coral checkmark + celebratory copy, repeats get an ink info icon + neutral copy. Each caller can override the success/duplicate copy via props (`successTitle`/`successBody`/`duplicateTitle`/`duplicateBody`).
- **`DuelDemo`** ([components/DuelDemo.tsx](components/DuelDemo.tsx)) is a client component. It hard-codes a 63%/37% reveal — the hint after voting reads *"Demo only — real votes update live."* so the percentages aren't passed off as real waitlist data.
- **OG image** at [app/opengraph-image.tsx](app/opengraph-image.tsx) generated at build time via `next/og` `ImageResponse`.
- **Structured data** (Organization JSON-LD) in [app/layout.tsx](app/layout.tsx).
- **Source attribution** flows: page reads `?ref=` (capped at 64 chars, fallback `"direct"`) → passes to both `WaitlistForm` instances → form sends in POST body.
- JS-disabled visitors can read all content and find the Instagram link. The form requires JS — that's accepted per the brief.

## Visual system

- **Palette:** background warm cream `#F4EEE2`, elevated surface `#FBF7EE`, pure surface `#FFFFFF` (cards), ink `#161311`, ink-soft `#4A433D`, ink-mute `#8B847C`, accent terracotta `#D94A2B` (hover/deep `#A8341B`, soft `#F7DCD2`). Hairlines via the `--color-line` / `--color-line-strong` variables (`rgba(22,19,17,0.10/0.18)`). The page also has a subtle SVG paper-grain noise overlay on `body::before`.
- **Typography:** Fraunces serif for headlines, italic Fraunces (with `SOFT 100`) for inline accent words highlighted in coral. Hanken Grotesk sans for body, eyebrows, UI. The `.font-serif` utility wires the right `font-variation-settings` (`opsz 144, SOFT 30` default; `SOFT 100` on `<em>`).
- **Allowed motion:** `.fb-fade-up` (entrance, with `.d1`–`.d5` stagger), `.fb-pulse` (the live-dot in the hero pill), `.fb-shake` (form on validation/network failure), `.fb-slide-up` (success card). All animations honor `prefers-reduced-motion`.
- **Buttons / CTAs:** the primary signup button is a pill (`rounded-full`, ink fill, cream text, hover terracotta). The waitlist form is a single rounded-pill row containing input + button. No box shadows except the focus ring on the form (`box-shadow: 0 0 0 4px var(--color-accent-soft)`).
- **No emoji in copy.** Original SVG only — no stock photos. The interactive duel cards use simple stylised gradients as placeholder thumbnails until real video frames are wired in.

## Copy

- The page is in English. The "German-first, English available" line in `WhyItWorks` describes the *app's* roadmap, not the marketing site — there is no language switcher on the landing page.
- The hero positioning is *"Two exercises. One duel. You decide."* with sub-headline *"Discover the workouts you'll actually keep doing…"*
- Banned marketing verbs: revolutionize, transform, unleash, level up, crush. Rewrite anything that could appear on any other fitness landing page.
- The "Free for the first 500 / Lifetime free access for early supporters" framing is a real offer — keep it consistent. If it changes, update both the hero note and the FinalCTA body.
- Honest about stage: pre-launch. The duel demo's percentages are explicitly labelled as a demo. No fake testimonials.

## GDPR / DACH requirements

- Consent checkbox below the submit button, **unticked by default**. Submit is rejected (client and server) without consent. Timestamp persisted on the row (`consentAt`).
- No pre-ticked boxes, no exit-intent popups, no dark patterns.
- Impressum + Datenschutz reachable from the footer. Placeholder content is fine for now; mark TODOs clearly.
- No cookie banner — Plausible is cookieless and is the only tracking.

## Production deploy (Strato)

- App lives at `/home/deploy/fitbash` on the VPS, owned by `deploy` user.
- Run under PM2 (`pm2-deploy.service` daemon) on port 3003 — process name `fitbash`.
- nginx site at `/etc/nginx/sites-available/fitbash` proxies `fitbash.de` + `www.fitbash.de` → `127.0.0.1:3003`. TLS via Let's Encrypt (`certbot --nginx`, auto-renews via certbot's systemd timer).
- **Redeploy after a code change** (zero-downtime hot reload):
  ```bash
  git push origin main
  ssh -i ~/.ssh/coachtap_strato root@93.90.201.90 \
    "su - deploy -c 'cd /home/deploy/fitbash && git pull --ff-only && npm install && npm run build && pm2 reload fitbash'"
  ```
- Environment variables live in `/home/deploy/fitbash/.env` on the server. To pick them up after editing, append `--update-env` to the `pm2 reload`.
- Don't touch the other apps on this server (`coachtap` on port 3000, `kyrooapp` on port 3002 under a separate `pm2-root.service`) without explicit reason.

## Placeholder TODOs

Confirm before public launch (tagged in code with `TODO:` where applicable):
- Real founder bio copy in [components/WhyItWorks.tsx](components/WhyItWorks.tsx) "Built in Berlin" bullet (currently generic)
- Real Impressum and Datenschutz copy
- Real Resend `RESEND_API_KEY` + verified `fitbash.de` sending domain (SPF/DKIM/DMARC) so confirmation emails actually send
- Production `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=fitbash.de` set in `/home/deploy/fitbash/.env`
- Replace the duel-card gradient placeholders with real video thumbnails when ready

## Out of scope (do not build)

User accounts, blog, multi-language toggle, any real app functionality (duels/votes), pricing page, live chat, A/B testing infra, cookie banner, newsletter platform integrations beyond the simple waitlist.

## Verification before declaring done

- `npm run typecheck`, `npm run lint`, and `npm run build` all clean
- `npm audit` shows no high/critical (transitive moderates may be pinned via the `overrides` block in [package.json](package.json) — see the existing `postcss` / `uuid` / `@hono/node-server` pins for the pattern)
- Lighthouse 95+ on all metrics, mobile and desktop
- Render correctly in iOS Safari, Android Chrome, and the **Instagram in-app browser** (its webview has quirks that desktop testing won't catch — test on a real phone)
- For UI changes: hard-reload the dev server in a browser; the duel demo, signup form (incl. duplicate detection), and footer links all need a click-through, not just an HTML grep
