# FitBash — Landing Page Build Brief

## What you are building

A single-page landing site for FitBash, a fitness exercise discovery app concept currently being validated through Instagram. The page has one job: **convert curious visitors from Instagram into email subscribers** who will be notified when the app launches.

This is **not** the app. It's a marketing landing page. Keep scope tight, ship fast.

**Positioning line (do not change):** *"Discover the exercises you'll actually keep doing."*

**Primary audience:** Instagram visitors clicking the bio link. Mostly DACH region, mostly mobile, mostly already familiar with the duel format from the daily Stories. They don't need to be sold the *what* — they need to be told *when* and given a reason to leave their email.

---

## Tech stack

- **Framework:** Next.js 14+ (App Router) with TypeScript. Static export where possible.
- **Styling:** Tailwind CSS. No component libraries — write the markup directly.
- **Email collection:** Resend + a single API route, OR direct integration with ConvertKit / Beehiiv / Loops if API key is provided. Default to Resend with a Postgres-backed waitlist table if no preference is stated. Ask before assuming.
- **Database (for waitlist):** SQLite via Prisma for simplicity, or Supabase/Neon if deployment is on Vercel. One table: `waitlist_signups (id, email, locale, source, created_at)`.
- **Analytics:** Plausible (privacy-friendly, GDPR-compliant out of the box, important for DACH audience). Not Google Analytics.
- **Hosting:** Vercel. Custom domain ready to point at it.
- **Forms:** No third-party form builders. Native HTML form, server action or API route handler.

If any of these don't fit cleanly, raise it before substituting.

---

## Page structure (single scroll, no routes)

The whole page is one vertical scroll. No multi-page navigation, no router. Sections in order:

### 1. Hero (above the fold)
- Centered, generous whitespace. Mobile-first.
- One-line headline: **"Two exercises. One duel. You decide."**
- Sub-headline: **"Discover the exercises you'll actually keep doing."**
- A small visual anchor — either an animated SVG of two cards toggling between A and B with a vote bar filling, or a 6-second autoplay-muted-loop video of a real duel/reveal. SVG is preferred (no asset weight, scales perfectly).
- Primary CTA: email input + "Get early access" button. Inline, not a modal.
- Below the CTA: a single line of social proof, e.g. *"Join 1,247 people on the waitlist"* — pull this number live from the database, fall back to a sensible static number if the query fails. If the number is below 50, show *"Be one of the first"* instead of a count.

### 2. How it works (3 simple steps, illustrated)
- Three columns on desktop, stacked on mobile.
- Each step is: small SVG illustration + one-word title + one-sentence description.
  - **Vote** — Pick the exercise you'd actually do.
  - **Reveal** — See what everyone else picked, plus a coach's note.
  - **Build** — Your favorites become a routine you'll actually keep.
- No card backgrounds, no shadows. Just whitespace and the illustrations.

### 3. Why it works (the insight)
- A short prose section, max 80 words.
- Headline: **"Most fitness apps tell you what's optimal. We help you find what's enjoyable."**
- Body: One paragraph that lands the insight — the exercise you'll actually do beats the optimal one you skip. Cite no studies, make no medical claims.

### 4. Sneak peek (3 mockup screens)
- Three phone mockups side-by-side (single row on desktop, horizontal scroll on mobile).
- Show: the duel screen, the crowd reveal, the saved collection.
- Use simple SVG mockups — phone frames as rounded rectangles, content inside. Don't try to render a real React Native UI. Static, illustrative, on-brand.

### 5. Founder / story section
- Photo (or placeholder circle if no photo provided yet) + 80-word personal note.
- Headline: **"Built in Berlin, tested daily on Instagram."**
- Body: Short, first-person note explaining the daily Instagram duels and that the app is in early development. Include the @handle as a link.
- This section is what makes the project feel real and not vapourware. Critical for trust on a pre-launch page.

### 6. FAQ (4 questions max)
- Accordion-style, all collapsed by default.
- Questions:
  - **When does the app launch?** — Short, honest answer. Soft date or "we'll email you the moment it's ready."
  - **What does it cost?** — Free at launch. Premium routine features later.
  - **Is it for beginners?** — Yes. Onboarding adapts to your level and equipment.
  - **What language is it in?** — German and English from day one.

### 7. Final CTA
- Repeat the email signup form, framed differently: **"One email when we launch. Nothing else."**
- A small bullet list under it: *No spam. No newsletter. No tracking pixels in your inbox.* — this matters for DACH GDPR-conscious users.

### 8. Footer
- Three lines, small text:
  - Imprint / Impressum link (German legal requirement — generate a placeholder Impressum page at `/impressum` with TODO comments for legal info)
  - Privacy / Datenschutz link (same — placeholder at `/datenschutz`)
  - Instagram handle, no other social links

---

## Visual design

The landing page must feel like the app it's promoting. The aesthetic is the *opposite* of typical fitness marketing.

- **Style:** clean, editorial, Scandinavian. Think Linear, Things 3, Oura, Stripe — not Gymshark, not MyFitnessPal.
- **Background:** off-white `#FAFAF7` throughout. No alternating section colors. Whitespace separates sections, not borders.
- **Text:** near-black `#0F0F0E`. Single accent color: warm coral `#E2613D`, used only on CTAs and one or two intentional highlights. That's it. No secondary accent.
- **Typography:** Inter variable font (loaded from Google Fonts or self-hosted). Two weights: 400 regular, 500 medium. Never 600 or 700. Headline sizes large and confident — H1 around 48–56px desktop, 32–36px mobile. Body 17–18px, line-height 1.6.
- **No gradients. No shadows except a single subtle one on the email input focus state. No glow effects. No animated backgrounds. No parallax. No scroll-triggered animations except very subtle fade-in (200ms, once).**
- **Buttons:** solid coral fill, white text, generous padding (14px vertical, 24px horizontal), 8px radius, no shadow, no gradient. Hover state: 4% darker. That's the entire button system.
- **Form input:** transparent background, 1px bottom border only (no full box), focus state lifts to coral border. Should look like editorial design, not like a generic form.
- **No emoji in copy.** None.
- **No stock photos.** Only original illustrations or product mockups.

---

## Copy principles

- **English only.** No translation toggle. The Instagram audience is comfortable with English; adding a language switcher is scope creep for a validation page.
- **Short sentences.** The page should read in under 90 seconds.
- **No marketing speak.** No "revolutionize," "transform," "unleash," "level up," "crush." If the sentence could appear on any fitness landing page, rewrite it.
- **Honest about stage.** This is a pre-launch page. Don't pretend the app exists. Don't fake testimonials. Don't fabricate user counts.
- **One promise per section.** Don't try to say everything. The Instagram presence does the relationship building; the landing page just captures the email.

---

## Email signup behavior

- On submit: validate format client-side, then POST to `/api/waitlist`.
- Server: dedupe by email (case-insensitive), store with locale (from `Accept-Language` header) and source (`?ref=` query param if present, else `direct`).
- On success: replace the form with a clean confirmation message — *"You're in. We'll email you when FitBash is ready."* No confetti, no animation beyond a fade.
- On error: inline error text in coral, never a popup or alert.
- Send a confirmation email via Resend immediately. Subject: *"You're on the FitBash list."* Body: 3-line plain text email, signed personally by the founder. No HTML newsletter template.
- GDPR: include a single unticked checkbox above the button: *"It's okay to email me when the app launches."* Do not collect emails without explicit consent. Store consent timestamp with the row.

---

## Performance & SEO

- Lighthouse score 95+ on all metrics, mobile and desktop.
- Total page weight under 200kb (excluding fonts). No video files; if hero animation is video, host on Mux or Cloudflare Stream and lazy-load.
- Open Graph tags: title, description, a custom OG image (1200x630, simple — wordmark on off-white background with the tagline).
- Meta description: the sub-headline, exactly.
- Structured data: minimal `Organization` schema. No fake reviews, no fake ratings.
- Robots: allow indexing.

---

## What "done" looks like

A visitor can:
1. Land on the page from a phone (Instagram in-app browser) and read the entire thing in under 90 seconds.
2. Submit their email in two taps from any section.
3. Receive a personal-feeling confirmation email within 30 seconds.
4. See a working Impressum and Datenschutz page (placeholder content with clearly marked TODOs is fine — actual legal copy comes later).
5. Get value even if they don't sign up: they understand what FitBash is, who's behind it, and where to follow along on Instagram.

The page should also:
- Pass Lighthouse audit at 95+
- Render correctly in iOS Safari, Android Chrome, and the Instagram in-app browser specifically (test this — IG's webview has quirks)
- Work with JavaScript disabled enough to read the content and find the IG link (form can require JS, that's fine)
- Be deployable to Vercel via `git push` with zero config

---

## Out of scope (do not build)

- User accounts, login, dashboard
- A blog or article system
- Multi-language support (English only for v1)
- Any actual app functionality — no real duels, no votes
- Pricing page or paid tiers
- Live chat widget, intercom, customer support tools
- A/B testing infrastructure (use Plausible goals if needed later)
- Cookie banner — Plausible is cookieless, no consent needed if that's the only tracking
- Newsletter platform integration beyond simple waitlist storage

---

## Non-negotiables

- **The page must look like a product, not a landing page template.** If it could be mistaken for a Webflow template, start over.
- **Email confirmation must feel personal.** Plain text, signed, sent from a real-looking address (`marc@fitbash.com` not `noreply@`).
- **No dark patterns.** No pre-ticked consent boxes, no exit-intent popups, no scroll-jacking, no sticky CTAs that follow the user.
- **GDPR must be correct, not just present.** Consent checkbox unticked, consent stored, Impressum and Datenschutz reachable from every page.
- **Mobile is the primary target.** Most traffic comes from Instagram on a phone. If it looks great on desktop but cramped on mobile, that's a failure.
