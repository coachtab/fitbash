type Props = { className?: string };

export function HeroDuel({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 480 280"
      role="img"
      aria-label="Two exercise cards being voted on, with a tally bar filling beneath"
      className={className}
    >
      {/* Card A */}
      <g className="fb-duel-cycle">
        <rect
          x="32"
          y="28"
          width="180"
          height="180"
          rx="16"
          fill="none"
          stroke="#0F0F0E"
          strokeWidth="1.5"
        />
        <circle cx="122" cy="98" r="34" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
        <path
          d="M104 138 L140 138 M104 152 L132 152"
          stroke="#0F0F0E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text x="56" y="186" fill="#0F0F0E" fontSize="13" fontWeight="500">
          Goblet squat
        </text>
        <text x="56" y="202" fill="#6E6E6B" fontSize="11">
          Legs · 4 min
        </text>
      </g>

      {/* Card B */}
      <g className="fb-duel-cycle-b">
        <rect
          x="268"
          y="28"
          width="180"
          height="180"
          rx="16"
          fill="none"
          stroke="#0F0F0E"
          strokeWidth="1.5"
        />
        <circle cx="358" cy="98" r="34" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
        <path
          d="M340 138 L376 138 M340 152 L368 152"
          stroke="#0F0F0E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text x="292" y="186" fill="#0F0F0E" fontSize="13" fontWeight="500">
          Bulgarian split
        </text>
        <text x="292" y="202" fill="#6E6E6B" fontSize="11">
          Legs · 5 min
        </text>
      </g>

      {/* Vote tally bar */}
      <rect x="32" y="240" width="416" height="6" rx="3" fill="#E5E4DF" />
      <rect
        x="32"
        y="240"
        width="416"
        height="6"
        rx="3"
        fill="#E2613D"
        className="fb-bar-fill"
      />
      <text x="32" y="266" fill="#6E6E6B" fontSize="11">
        A
      </text>
      <text x="438" y="266" fill="#6E6E6B" fontSize="11" textAnchor="end">
        B
      </text>
    </svg>
  );
}
