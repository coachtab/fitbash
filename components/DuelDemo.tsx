"use client";

import { useEffect, useState } from "react";

type Pick = "a" | "b" | null;

type CardData = {
  id: "a" | "b";
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

function DuelCard({
  card,
  picked,
  onVote,
  onPlay,
}: {
  card: CardData;
  picked: boolean;
  onVote: () => void;
  onPlay: (videoId: string, name: string) => void;
}) {
  const wrapperBorder = picked
    ? "border-accent [box-shadow:0_0_0_3px_var(--color-accent-soft)]"
    : "border-line";
  return (
    <div
      className={`group relative overflow-hidden rounded-[20px] border bg-surface transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:border-ink ${wrapperBorder}`}
    >
      <button
        type="button"
        onClick={() => onPlay(card.videoId, card.name)}
        aria-label={`Watch ${card.name} video`}
        className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-ink">
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
        </div>
      </button>
      <button
        type="button"
        onClick={onVote}
        aria-pressed={picked}
        className="block w-full p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      >
        <div className="text-base font-semibold tracking-[-0.01em]">{card.name}</div>
        <div className="mt-1 text-[13px] text-ink-mute">{card.meta}</div>
        <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
          {picked ? "Picked ✓" : "Pick this"}
        </div>
      </button>
    </div>
  );
}

function VideoModal({
  videoId,
  videoTitle,
  onClose,
}: {
  videoId: string;
  videoTitle: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fb-fade-up fixed inset-0 z-50 grid place-items-center bg-ink/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${videoTitle} video`}
    >
      <div
        className="relative aspect-[9/16] w-full max-w-[420px] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
          title={`${videoTitle} demonstration`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full rounded-2xl border-0 bg-ink"
        />
      </div>
    </div>
  );
}

export function DuelDemo() {
  const [pick, setPick] = useState<Pick>(null);
  const [openVideo, setOpenVideo] = useState<{ id: string; title: string } | null>(null);

  function vote(choice: "a" | "b") {
    if (pick) return;
    setPick(choice);
  }

  const showResult = pick !== null;

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
          picked={pick === "a"}
          onVote={() => vote("a")}
          onPlay={(id, title) => setOpenVideo({ id, title })}
        />
        <div className="text-center text-[22px] font-medium italic text-ink-mute">vs</div>
        <DuelCard
          card={cards[1]}
          picked={pick === "b"}
          onVote={() => vote("b")}
          onPlay={(id, title) => setOpenVideo({ id, title })}
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
          <span className="text-ink font-semibold">63%</span>
        </div>
        <div className="mb-3.5 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className={`h-full rounded-full bg-accent transition-[width] duration-[800ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] ${showResult ? "w-[63%]" : "w-0"}`}
          />
        </div>
        <div className="mb-1.5 flex justify-between text-[13px] text-ink-soft">
          <span>Goblet squat</span>
          <span>37%</span>
        </div>
        <div className="mb-3.5 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className={`h-full rounded-full bg-ink-mute transition-[width] duration-[800ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] ${showResult ? "w-[37%]" : "w-0"}`}
          />
        </div>
      </div>

      <p className="mt-8 text-center text-[13px] text-ink-mute">
        {showResult ? "Demo only — real votes update live." : "Tap the thumbnail to watch, or “Pick this” to vote."}
      </p>

      {openVideo ? (
        <VideoModal
          videoId={openVideo.id}
          videoTitle={openVideo.title}
          onClose={() => setOpenVideo(null)}
        />
      ) : null}
    </div>
  );
}
