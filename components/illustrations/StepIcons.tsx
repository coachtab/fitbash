type Props = { className?: string };

export function StepVote({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 96 96" role="img" aria-label="Vote" className={className}>
      <rect x="10" y="20" width="32" height="56" rx="6" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      <rect x="54" y="20" width="32" height="56" rx="6" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      <path
        d="M62 46 L70 54 L80 40"
        fill="none"
        stroke="#E2613D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StepReveal({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 96 96" role="img" aria-label="Reveal" className={className}>
      <rect x="14" y="58" width="14" height="22" fill="#0F0F0E" />
      <rect x="34" y="38" width="14" height="42" fill="#0F0F0E" />
      <rect x="54" y="48" width="14" height="32" fill="#0F0F0E" />
      <rect x="74" y="28" width="14" height="52" fill="#E2613D" />
    </svg>
  );
}

export function StepBuild({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 96 96" role="img" aria-label="Build" className={className}>
      <rect x="14" y="20" width="68" height="14" rx="3" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      <rect x="14" y="40" width="68" height="14" rx="3" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      <rect x="14" y="60" width="68" height="14" rx="3" fill="#E2613D" />
    </svg>
  );
}
