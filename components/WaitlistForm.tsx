"use client";

import { useState, useId, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  /** Source attribution from the page's ?ref= query param, or "direct" */
  source?: string;
  /** Submit button label — differentiated between hero and final CTA so the page doesn't read as a copy-paste */
  submitLabel?: string;
  /** Confirmation message shown in place of the form on success */
  successMessage?: string;
  /** Visual: stack input/button on small screens; align inline on larger screens */
  className?: string;
};

export function WaitlistForm({
  source = "direct",
  submitLabel = "Get early access",
  successMessage = "You're in. We'll email you when FitBash is ready.",
  className = "",
}: Props) {
  const emailId = useId();
  const consentId = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError("Please tick the box so we know it's okay to email you.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true, source }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Something went wrong. Try again in a moment.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`fb-fade-in text-ink ${className}`}
        role="status"
        aria-live="polite"
      >
        <p className="text-lg">{successMessage}</p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`flex flex-col gap-4 ${className}`}
      aria-label="Join the FitBash waitlist"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3">
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            className="w-full bg-transparent border-0 border-b border-ink/30 py-3 text-lg outline-none transition-colors placeholder:text-muted focus:border-coral focus:[box-shadow:0_2px_0_-1px_var(--color-coral)]"
          />
        </div>
        <button
          type="submit"
          disabled={submitting || !email}
          className="inline-flex items-center justify-center rounded-lg bg-coral px-6 py-3.5 text-white font-medium transition-colors hover:bg-coral-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Adding…" : submitLabel}
        </button>
      </div>

      <label
        htmlFor={consentId}
        className="flex items-start gap-3 text-sm text-muted leading-snug cursor-pointer select-none"
      >
        <input
          id={consentId}
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-ink/40 accent-coral"
        />
        <span>It&rsquo;s okay to email me when the app launches.</span>
      </label>

      {error ? (
        <p role="alert" className="text-sm text-coral">
          {error}
        </p>
      ) : null}
    </form>
  );
}
