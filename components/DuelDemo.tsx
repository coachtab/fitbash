"use client";

import { useEffect, useState } from "react";

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
  { id: "a", name: "Bulgarian split squat", meta: "Legs · dumbbell · 0:08", videoId: "uBSoEWZu07k" },
  { id: "b", name: "Goblet squat", meta: "Legs · dumbbell · 0:08", videoId: "lRYBbchqxtI" },
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
      width="20"
      height="20"
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
      <span className="-rotate-12 rounded-md border-[3px] border-white/95 bg-accent/90 px-5 py-1.5 text-[26px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_rgba(15,26,36,0.35)]">
        Voted
      </span>
    </div>
  );
}

function DuelCard({
  card,
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
  picked: boolean;
  hasVoted: boolean;
  isLoser: boolean;
  isPlaying: boolean;
  isSubmitting: boolean;
  onVote: () => void;
  onPlay: () => void;
  onStop: () => void;
}) {
  const wrapperBorder = picked
    ? "border-accent [box-shadow:0_0_0_3px_var(--color-accent-soft)]"
    : "border-line";
  const dimmed = isLoser
    ? "opacity-40 grayscale-[0.4]"
    : "";
  const lockHover = hasVoted || isPlaying;
  return (
    <div
      className={`group relative overflow-hidden rounded-[20px] border bg-surface transition-all duration-[300ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] ${
        lockHover ? "" : "hover:-translate-y-0.5 hover:border-ink"
      } ${wrapperBorder} ${dimmed}`}
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
            className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${card.videoId}/hqdefault.jpg`}
              alt={`${card.name} demonstration`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors group-hover:bg-ink/15">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 transition-transform group-hover:scale-[1.08]">
                {playIcon}
              </span>
            </div>
          </button>
        )}
        {picked && !isPlaying ? <VotedStamp /> : null}
      </div>

      <div className="flex items-center justify-between gap-4 p-6">
        <div className="min-w-0">
          <div className="truncate text-base font-semibold tracking-[-0.01em]">{card.name}</div>
          <div className="mt-1 text-[13px] text-ink-mute">{card.meta}</div>
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
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-90 disabled:cursor-not-allowed ${
            picked
              ? "border-accent bg-accent text-bg scale-105"
              : hasVoted
                ? "border-line bg-surface text-ink-mute"
                : "border-line-strong bg-surface text-ink-soft hover:border-ink hover:text-ink"
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
    <div className="relative mt-24 rounded-[32px] border border-line bg-bg-elevated p-9 md:p-15 md:px-10 md:py-15">
      <p className="mb-2 text-center text-[12px] uppercase tracking-[0.18em] text-ink-mute font-medium">
        A quick taste
      </p>
      <h2 className="mb-12 text-center text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.025em]">
        Which would you actually do?
      </h2>

      <div className="mx-auto grid max-w-[720px] grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <DuelCard
          card={cards[0]}
          picked={state.choice === "a"}
          hasVoted={state.hasVoted}
          isLoser={state.hasVoted && state.choice !== "a"}
          isPlaying={playing === "a"}
          isSubmitting={submitting === "a"}
          onVote={() => vote("a")}
          onPlay={() => setPlaying("a")}
          onStop={() => setPlaying(null)}
        />
        <div className="text-center text-[22px] font-medium italic text-ink-mute">vs</div>
        <DuelCard
          card={cards[1]}
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
        className={`mx-auto mt-6 max-w-[480px] transition-opacity duration-[400ms] ${
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
          <span>Goblet squat</span>
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
          ? "Thanks — your vote is locked in."
          : "Tap the thumbnail to watch, or the heart to vote. One vote per visitor."}
      </p>
    </div>
  );
}
