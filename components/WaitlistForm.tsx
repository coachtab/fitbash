"use client";

import { useState, useId, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  source?: string;
  submitLabel?: string;
  /** Title shown on a fresh signup */
  successTitle?: string;
  /** Body shown on a fresh signup */
  successBody?: string;
  /** Title shown when the email was already on the waitlist */
  duplicateTitle?: string;
  /** Body shown when the email was already on the waitlist */
  duplicateBody?: string;
  className?: string;
};

const checkIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const infoIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9.5" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="12" y1="7.5" x2="12.01" y2="7.5" />
  </svg>
);

export function WaitlistForm({
  source = "direct",
  submitLabel = "Get early access",
  successTitle = "You're on the list.",
  successBody = "We'll let you know when FitBash opens.",
  duplicateTitle = "Already on the list.",
  duplicateBody = "We have your email — we'll be in touch when FitBash opens.",
  className = "",
}: Props) {
  const emailId = useId();
  const consentId = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [wasDuplicate, setWasDuplicate] = useState(false);

  function triggerShake() {
    setShake(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setShake(true)));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      triggerShake();
      return;
    }
    if (!consent) {
      setError("Please tick the box so we know it's okay to email you.");
      triggerShake();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, consent: true, source }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        alreadySubscribed?: boolean;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again in a moment.");
        setStatus("error");
        triggerShake();
        return;
      }
      setWasDuplicate(Boolean(data.alreadySubscribed));
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
      triggerShake();
    }
  }

  if (status === "success") {
    const title = wasDuplicate ? duplicateTitle : successTitle;
    const body = wasDuplicate ? duplicateBody : successBody;
    const borderColor = wasDuplicate ? "border-line-strong" : "border-accent";
    const iconBg = wasDuplicate ? "bg-ink" : "bg-accent";
    const icon = wasDuplicate ? infoIcon : checkIcon;
    return (
      <div
        className={`fb-slide-up flex max-w-[480px] items-center gap-3.5 rounded-2xl border ${borderColor} bg-surface px-[22px] py-[18px] ${className}`}
        role="status"
        aria-live="polite"
      >
        <div
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${iconBg} text-bg`}
        >
          {icon}
        </div>
        <div>
          <strong className="block font-semibold">{title}</strong>
          <span className="text-sm text-ink-soft">{body}</span>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <div className={className}>
      <form
        onSubmit={onSubmit}
        noValidate
        className={`flex max-w-[480px] gap-2 rounded-full border border-line-strong bg-surface p-1.5 transition-all focus-within:border-accent focus-within:[box-shadow:0_0_0_4px_var(--color-accent-soft)] ${shake ? "fb-shake" : ""}`}
        aria-label="Join the FitBash waitlist"
      >
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          className="min-w-0 flex-1 border-none bg-transparent px-4 py-3 text-[15px] text-ink outline-none placeholder:text-ink-mute"
        />
        <button
          type="submit"
          disabled={submitting}
          className="whitespace-nowrap rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent active:scale-[0.97] disabled:opacity-60"
        >
          {submitting ? "Adding…" : submitLabel}
        </button>
      </form>

      <label
        htmlFor={consentId}
        className="mt-3 flex max-w-[480px] cursor-pointer select-none items-start gap-2.5 text-[13px] text-ink-mute"
      >
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-3.5 w-3.5 accent-accent"
        />
        <span>It&rsquo;s okay to email me when the app launches.</span>
      </label>

      {error ? (
        <p role="alert" className="mt-2 max-w-[480px] text-[13px] text-accent-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
