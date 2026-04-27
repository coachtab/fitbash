# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

FitBash is a fitness exercise discovery app being validated through Instagram. **This repo is the pre-launch marketing landing page only — not the app.** Its single job is converting Instagram bio-link visitors into email subscribers for a launch notification. Most traffic is mobile, in the Instagram in-app browser, DACH region.

The full build brief is at [docs/BRIEF.md](docs/BRIEF.md). The constraints below are the durable rules every session must respect.

## Tech stack

- **Framework:** Next.js 16.2 (App Router) + React 19 + TypeScript. Turbopack is on by default. The bundled docs at `node_modules/next/dist/docs/` are the source of truth — APIs differ from older Next.
- **Styling:** Tailwind v4 (CSS-first config in [app/globals.css](app/globals.css) via `@theme`). No component library — write markup directly.
- **Email:** Resend ([lib/email.ts](lib/email.ts)). Confirmation send is best-effort — DB write succeeds even if Resend fails. If `RESEND_API_KEY` is unset, sending is silently skipped (local dev convenience).
- **DB:** Prisma 7 + SQLite via the **`@prisma/adapter-better-sqlite3`** driver adapter. Prisma 7 requires an adapter — `new PrismaClient()` with no args fails type checks. See [lib/db.ts](lib/db.ts).
- **Analytics:** Plausible (cookieless). Loaded only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. **Never Google Analytics.**
- **Hosting:** Vercel, deployable via `git push` with zero config. For Vercel, swap SQLite for Supabase/Neon by changing the adapter and `DATABASE_URL`.
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

`postinstall` runs `prisma generate` — needed because the generated client lives at [lib/generated/prisma](lib/generated/prisma) and is gitignored. **Don't import `@prisma/client` directly** — import `prisma` from [lib/db.ts](lib/db.ts), which wires the adapter.

## Architecture

- **Single-scroll landing page**, no client-side router. The home route is [app/page.tsx](app/page.tsx); section components live flat in [components/](components/), SVG illustrations in [components/illustrations/](components/illustrations/). The page is `force-dynamic` so the live waitlist count is always fresh.
- **Two German legal placeholder routes:** [app/impressum/page.tsx](app/impressum/page.tsx) and [app/datenschutz/page.tsx](app/datenschutz/page.tsx). Both use `noindex`. Real legal content marked with `TODO` comments — confirm before launch.
- **POST /api/waitlist** ([app/api/waitlist/route.ts](app/api/waitlist/route.ts)): validate → lowercase email → dedupe (idempotent: returns `{ok:true, alreadySubscribed:true}` for repeat) → store with `locale` (from `Accept-Language`), `source` (from request body, defaulted from `?ref=` on the page), and consent timestamp → send Resend confirmation (subject *"You're on the FitBash list."*, sender `marc@fitbash.com`, **never** `noreply@`).
- **Hero waitlist count** is read live from the DB. On query failure or when count < `SIGNUP_COUNT_REVEAL_THRESHOLD` (50), the hero shows *"Be one of the first."* instead.
- **OG image** at [app/opengraph-image.tsx](app/opengraph-image.tsx) is generated at build time via `next/og` `ImageResponse` — no static file to maintain.
- **Structured data** (Organization JSON-LD) is injected in [app/layout.tsx](app/layout.tsx).
- **Source attribution** flows: page reads `?ref=` from `searchParams` (capped at 64 chars, fallback `"direct"`) → passes to both `WaitlistForm` instances → form sends in POST body.
- JS-disabled visitors can still read the content and find the Instagram link. The form requires JS — that's OK per the brief.

## Visual non-negotiables

- Background `#FAFAF7`, text `#0F0F0E`, single accent warm coral `#E2613D` (hover `#D95D3A`). No other colors. Whitespace separates sections, not borders.
- Inter variable font, weights **400 + 500 only** (never 600 / 700). Loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx).
- No gradients, no shadows (one exception: subtle email-input focus state), no glow, no parallax, no scroll-jacking, no sticky CTAs, no animated backgrounds. Allowed motion: 200ms one-shot fade-in (`.fb-fade-in`) and the hero duel SVG cycle. All animations honor `prefers-reduced-motion`.
- Button system, in full: solid coral, white text, 14px / 24px padding, 8px radius, hover 4% darker. That's it.
- Email input: transparent background, 1px bottom border only — editorial, not form-like.
- No emoji in copy. No stock photos. Original SVG illustrations / phone mockups only.
- Aesthetic reference: Linear, Things 3, Oura, Stripe. **Not Gymshark, not MyFitnessPal.** If the page could be mistaken for a Webflow template, it has failed.

## Copy non-negotiables

- **English only.** No language toggle.
- Positioning line is fixed: *"Discover the exercises you'll actually keep doing."* Do not reword.
- Banned marketing verbs: revolutionize, transform, unleash, level up, crush. Rewrite anything that could appear on any other fitness landing page.
- Honest about stage: pre-launch. No fake testimonials, no fabricated user counts, no pretending the app exists.
- One promise per section. The page should read in under 90 seconds.

## GDPR / DACH requirements

- Consent checkbox above the submit button, **unticked by default**. Consent timestamp persisted on the row (`consentAt`).
- No pre-ticked boxes, no exit-intent popups, no dark patterns.
- Impressum + Datenschutz reachable from every page footer. Placeholder content is fine for now; mark TODOs clearly.
- No cookie banner — Plausible is cookieless and is the only tracking.

## Placeholder TODOs

Confirm before launch (also tagged in code with `TODO:`):
- Real Instagram handle in [lib/config.ts](lib/config.ts) (currently `fitbash.app`)
- Real founder photo + bio in [components/Founder.tsx](components/Founder.tsx)
- Real Impressum and Datenschutz copy
- `RESEND_FROM_EMAIL` mailbox is provisioned and the domain is verified in Resend
- Production `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set on the Vercel deployment

## Out of scope (do not build)

User accounts, blog, multi-language, any real app functionality (duels/votes), pricing page, live chat, A/B testing infra, cookie banner, newsletter platform integrations beyond simple waitlist storage.

## When to ask before deciding

The brief flags these as ask-first:
1. Which email service if not Resend
2. Hero visual — SVG animation (preferred, currently shipped) vs. autoplay-muted-loop video
3. How much placeholder is acceptable in the founder section before real photo + bio are provided

## Verification before declaring done

- `npm run typecheck` and `npm run build` clean
- Lighthouse 95+ on all metrics, mobile and desktop
- Total page weight under 200kb excluding fonts
- Render correctly in iOS Safari, Android Chrome, and the **Instagram in-app browser** (its webview has quirks that desktop testing won't catch — test on a real phone)
