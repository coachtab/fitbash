export const SITE_URL = "https://fitbash.com";
export const SITE_NAME = "FitBash";
export const TAGLINE = "Discover the exercises you'll actually keep doing.";

export const INSTAGRAM_HANDLE = "thefitbash";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

// TODO: replace with real founder bio once provided
export const FOUNDER_NAME = "Marc";
export const FOUNDER_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "marc@fitbash.com";

// Below this signup count, hide the live counter and show "Be one of the first" instead
export const SIGNUP_COUNT_REVEAL_THRESHOLD = 50;

// Static fallback when the live count query fails — keeps the hero honest if DB is offline
export const SIGNUP_COUNT_FALLBACK = 0;
