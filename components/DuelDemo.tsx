"use client";

import { useEffect, useState } from "react";
import { EXERCISES } from "@/lib/exercises";

type Choice = "a" | "b";
type Playing = Choice | null;

type DuelState = {
  hasVoted: boolean;
  choice: Choice | null;
  totalA: number;
  totalB: number;
};

type CardData = {
  id: Choice;
  name: string;
  meta: string;
  videoId: string;
};

const cards: CardData[] = [
  { id: "a", ...EXERCISES["bulgarian-split-squat"] },
  { id: "b", ...EXERCISES["romanian-deadlift"] },
];

const playIcon = (
  <svg viewBox="0 0 24 24" fill="#0F1A24" className="ml-0.5 h-[18px] w-[18px]">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const closeIcon = (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function HeartIcon({ filled, animate }: { filled: boolean; animate: boolean }) {
  return (
    <svg
      key={animate ? "liked" : "neutral"}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={animate ? "fb-like-pop" : ""}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function VotedStamp() {
  return (
    <div
      className="fb-slide-up pointer-events-none absolute inset-0 grid place-items-center"
      aria-hidden
    >
      <span className="-rotate-12 rounded-md border-[3px] border-white/95 bg-accent/90 px-4 py-1 text-[20px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_rgba(15,26,36,0.35)]">
        Voted
      </span>
    </div>
  );
}

/**
 * Designed placeholder shown if /thumbs/{videoId}.jpg fails to load.
 * Better than rendering broken-image alt text; the build-time sync script
 * normally prevents this from ever showing in production.
 */
function ExerciseFallback({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_22%,rgba(217,74,43,0.55),rgba(15,26,36,1)_72%)] p-5 text-center">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/55">
          Exercise preview
        </p>
        <p className="mx-auto mt-2 max-w-[14ch] text-[18px] font-semibold leading-tight text-white">
          {name}
        </p>
      </div>
    </div>
  );
}

/** Tailwind classes for the resting tilt of each Polaroid.
 * Both cards keep the same small bend in every state — the picked one is
 * distinguished by scale + z-index, not by straightening. */
function tiltClasses(side: Choice, picked: boolean): string {
  const tilt = side === "a" ? "md:-rotate-[5deg]" : "md:rotate-[5deg]";
  if (picked) return `${tilt} md:scale-[1.04] z-30`;
  return `${tilt} md:hover:scale-[1.03]`;
}

function Polaroid({
  card,
  side,
  picked,
  hasVoted,
  isLoser,
  isPlaying,
  isSubmitting,
  onVote,
  onPlay,
  onStop,
}: {
  card: CardData;
  side: Choice;
  picked: boolean;
  hasVoted: boolean;
  isLoser: boolean;
  isPlaying: boolean;
  isSubmitting: boolean;
  onVote: () => void;
  onPlay: () => void;
  onStop: () => void;
}) {
  const tilt = tiltClasses(side, picked);
  const dim = isLoser ? "opacity-50 grayscale-[0.5]" : "";
  const [thumbOk, setThumbOk] = useState(true);
  return (
    <div
      className={`relative w-[260px] sm:w-[280px] md:w-[300px] shrink-0 bg-white p-3 pb-16 shadow-[0_18px_36px_-12px_rgba(15,26,36,0.32),0_4px_10px_-2px_rgba(15,26,36,0.12)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] ${tilt} ${dim} ${
        picked ? "" : "hover:z-20"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        {isPlaying ? (
          <>
            <iframe
              key={card.videoId}
              src={`https://www.youtube.com/embed/${card.videoId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
              title={`${card.name} demonstration`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 bg-ink"
            />
            <button
              type="button"
              onClick={onStop}
              aria-label={`Stop ${card.name} video`}
              className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink/80 text-bg backdrop-blur-sm transition-colors hover:bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {closeIcon}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Watch ${card.name} video`}
            className="group/play block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
          >
            {thumbOk ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`/thumbs/${card.videoId}.jpg`}
                alt={`${card.name} demonstration`}
                loading="lazy"
                onError={() => setThumbOk(false)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <ExerciseFallback name={card.name} />
            )}
            <div className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors group-hover/play:bg-ink/15">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 transition-transform group-hover/play:scale-[1.08]">
                {playIcon}
              </span>
            </div>
          </button>
        )}
        {picked && !isPlaying ? <VotedStamp /> : null}
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">
            {card.name}
          </div>
          <div className="mt-0.5 truncate text-[11px] italic text-ink-mute">{card.meta}</div>
        </div>
        <button
          type="button"
          onClick={onVote}
          disabled={hasVoted || isSubmitting}
          aria-label={
            picked
              ? `Liked: ${card.name}`
              : hasVoted
                ? `Voting closed for ${card.name}`
                : `Like ${card.name}`
          }
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-90 disabled:cursor-not-allowed ${
            picked
              ? "border-accent bg-accent text-white scale-110"
              : hasVoted
                ? "border-line bg-white text-ink-mute"
                : "border-line-strong bg-white text-ink-soft hover:border-ink hover:text-ink"
          }`}
        >
          <HeartIcon filled={picked} animate={picked} />
        </button>
      </div>
    </div>
  );
}

function pct(part: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((part / total) * 100);
}

export function DuelDemo({ initialState }: { initialState: DuelState }) {
  const [state, setState] = useState<DuelState>(initialState);
  const [submitting, setSubmitting] = useState<Choice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState<Playing>(null);

  // ESC stops the active video — same key users already expect for "exit"
  useEffect(() => {
    if (!playing) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPlaying(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [playing]);

  async function vote(choice: Choice) {
    if (state.hasVoted || submitting) return;
    setError(null);
    setSubmitting(choice);
    try {
      const res = await fetch("/api/duel/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice }),
      });
      const data = (await res.json().catch(() => ({}))) as Partial<DuelState> & {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Couldn't record your vote. Try again.");
        return;
      }
      setState({
        hasVoted: true,
        choice: (data.choice as Choice | null) ?? choice,
        totalA: data.totalA ?? state.totalA,
        totalB: data.totalB ?? state.totalB,
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(null);
    }
  }

  const total = state.totalA + state.totalB;
  const showResult = state.hasVoted && total > 0;
  const aPct = pct(state.totalA, total);
  const bPct = pct(state.totalB, total);

  return (
    <div className="relative mt-24 rounded-[32px] border border-line bg-bg-elevated p-9 md:px-10 md:pb-16 md:pt-14 overflow-hidden">
      <p className="mb-2 text-center text-[12px] uppercase tracking-[0.18em] text-ink-mute font-medium">
        A quick taste
      </p>
      <h2 className="mb-14 text-center text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.025em]">
        Which would you actually do?
      </h2>

      <div className="relative mx-auto flex flex-col items-center justify-center gap-12 md:flex-row md:gap-12 lg:gap-16">
        <Polaroid
          card={cards[0]}
          side="a"
          picked={state.choice === "a"}
          hasVoted={state.hasVoted}
          isLoser={state.hasVoted && state.choice !== "a"}
          isPlaying={playing === "a"}
          isSubmitting={submitting === "a"}
          onVote={() => vote("a")}
          onPlay={() => setPlaying("a")}
          onStop={() => setPlaying(null)}
        />
        <Polaroid
          card={cards[1]}
          side="b"
          picked={state.choice === "b"}
          hasVoted={state.hasVoted}
          isLoser={state.hasVoted && state.choice !== "b"}
          isPlaying={playing === "b"}
          isSubmitting={submitting === "b"}
          onVote={() => vote("b")}
          onPlay={() => setPlaying("b")}
          onStop={() => setPlaying(null)}
        />
      </div>

      <div
        className={`mx-auto mt-16 max-w-[480px] transition-opacity duration-[400ms] ${
          showResult ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        <div className="mb-1.5 flex justify-between text-[13px] text-ink-soft">
          <span className="text-ink font-semibold">Bulgarian split squat</span>
          <span className="text-ink font-semibold tabular-nums">{aPct}%</span>
        </div>
        <div className="mb-3.5 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-[800ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ width: showResult ? `${aPct}%` : "0%" }}
          />
        </div>
        <div className="mb-1.5 flex justify-between text-[13px] text-ink-soft">
          <span>Romanian deadlift</span>
          <span className="tabular-nums">{bPct}%</span>
        </div>
        <div className="mb-3.5 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-ink-mute transition-[width] duration-[800ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ width: showResult ? `${bPct}%` : "0%" }}
          />
        </div>
        <p className="mt-3 text-center text-[12px] text-ink-mute tabular-nums">
          {total === 1 ? "1 vote so far" : `${total.toLocaleString("en-US")} votes so far`}
        </p>
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-center text-[13px] text-accent-deep">
          {error}
        </p>
      ) : null}

      <p className="mt-8 text-center text-[13px] text-ink-mute">
        {state.hasVoted
          ? "Thanks. Your vote is locked in."
          : "Tap a photo to watch, or the heart to vote. One vote per visitor."}
      </p>
    </div>
  );
}
