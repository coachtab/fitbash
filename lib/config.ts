export const SITE_URL = "https://fitbash.de";
export const SITE_NAME = "FitBash";
export const TAGLINE = "Discover the exercises you'll actually keep doing.";

export const INSTAGRAM_HANDLE = "thefitbash";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export const FOUNDER_NAME = "Damian";
export const FOUNDER_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "damian@fitbash.com";

// Public-facing contact email — shown in the site footer and on Impressum / Datenschutz.
// Distinct from FOUNDER_FROM_EMAIL (the Resend sender), which goes out from a verified .com mailbox.
export const PUBLIC_CONTACT_EMAIL = "info@fitbash.de";

// Below this signup count, hide the live counter and show "Be one of the first" instead
export const SIGNUP_COUNT_REVEAL_THRESHOLD = 50;

// Static fallback when the live count query fails — keeps the hero honest if DB is offline
export const SIGNUP_COUNT_FALLBACK = 0;
