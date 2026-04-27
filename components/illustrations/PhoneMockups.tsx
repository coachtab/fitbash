type Props = { className?: string };

const FRAME_W = 240;
const FRAME_H = 480;
const FRAME_R = 36;

function PhoneFrame({
  children,
  ariaLabel,
  className = "",
}: {
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <rect
        x="2"
        y="2"
        width={FRAME_W - 4}
        height={FRAME_H - 4}
        rx={FRAME_R}
        fill="#D8E1D0"
        stroke="#0F0F0E"
        strokeWidth="1.5"
      />
      {/* Notch */}
      <rect x="92" y="14" width="56" height="6" rx="3" fill="#0F0F0E" />
      {children}
    </svg>
  );
}

export function MockupDuel({ className = "" }: Props) {
  return (
    <PhoneFrame ariaLabel="Mockup of the duel screen" className={className}>
      <text x="24" y="60" fill="#6E6E6B" fontSize="11">
        Today&rsquo;s duel
      </text>
      <text x="24" y="84" fill="#0F0F0E" fontSize="16" fontWeight="500">
        Which would you do?
      </text>
      {/* Card A */}
      <rect x="20" y="106" width="200" height="110" rx="10" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      <circle cx="120" cy="148" r="20" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      <text x="32" y="200" fill="#0F0F0E" fontSize="12" fontWeight="500">
        Goblet squat
      </text>
      {/* Card B */}
      <rect x="20" y="232" width="200" height="110" rx="10" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      <circle cx="120" cy="274" r="20" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      <text x="32" y="326" fill="#0F0F0E" fontSize="12" fontWeight="500">
        Bulgarian split squat
      </text>
      {/* CTA */}
      <rect x="40" y="378" width="160" height="40" rx="8" fill="#E2613D" />
      <text x="120" y="403" fill="#FFFFFF" fontSize="13" fontWeight="500" textAnchor="middle">
        Pick A
      </text>
    </PhoneFrame>
  );
}

export function MockupReveal({ className = "" }: Props) {
  return (
    <PhoneFrame ariaLabel="Mockup of the crowd reveal screen" className={className}>
      <text x="24" y="60" fill="#6E6E6B" fontSize="11">
        Reveal
      </text>
      <text x="24" y="84" fill="#0F0F0E" fontSize="16" fontWeight="500">
        12,847 voted
      </text>
      {/* Bar A */}
      <text x="24" y="124" fill="#0F0F0E" fontSize="12">
        Goblet squat
      </text>
      <rect x="24" y="134" width="192" height="14" rx="7" fill="#E5E4DF" />
      <rect x="24" y="134" width="124" height="14" rx="7" fill="#E2613D" />
      <text x="216" y="144" fill="#0F0F0E" fontSize="11" fontWeight="500" textAnchor="end">
        64%
      </text>
      {/* Bar B */}
      <text x="24" y="186" fill="#0F0F0E" fontSize="12">
        Bulgarian split squat
      </text>
      <rect x="24" y="196" width="192" height="14" rx="7" fill="#E5E4DF" />
      <rect x="24" y="196" width="69" height="14" rx="7" fill="#0F0F0E" />
      <text x="216" y="206" fill="#0F0F0E" fontSize="11" fontWeight="500" textAnchor="end">
        36%
      </text>
      {/* Coach note */}
      <rect x="20" y="244" width="200" height="160" rx="10" fill="none" stroke="#E5E4DF" strokeWidth="1" />
      <text x="32" y="266" fill="#6E6E6B" fontSize="10">
        Coach&rsquo;s note
      </text>
      <text x="32" y="288" fill="#0F0F0E" fontSize="11">
        Most people picked the
      </text>
      <text x="32" y="304" fill="#0F0F0E" fontSize="11">
        squat — easier setup,
      </text>
      <text x="32" y="320" fill="#0F0F0E" fontSize="11">
        less mobility needed. The
      </text>
      <text x="32" y="336" fill="#0F0F0E" fontSize="11">
        split squat hits harder per
      </text>
      <text x="32" y="352" fill="#0F0F0E" fontSize="11">
        rep, but only if your hips
      </text>
      <text x="32" y="368" fill="#0F0F0E" fontSize="11">
        are happy with it.
      </text>
    </PhoneFrame>
  );
}

export function MockupCollection({ className = "" }: Props) {
  const items = [
    "Goblet squat",
    "Push-up, hands elevated",
    "Dead bug",
    "Single-leg RDL",
    "Farmer carry",
    "Hollow hold",
  ];
  return (
    <PhoneFrame ariaLabel="Mockup of the saved exercises collection" className={className}>
      <text x="24" y="60" fill="#6E6E6B" fontSize="11">
        Your collection
      </text>
      <text x="24" y="84" fill="#0F0F0E" fontSize="16" fontWeight="500">
        6 exercises you said yes to
      </text>
      {items.map((label, i) => {
        const y = 116 + i * 44;
        return (
          <g key={label}>
            <line x1="20" y1={y - 10} x2="220" y2={y - 10} stroke="#E5E4DF" strokeWidth="1" />
            <circle cx="36" cy={y + 8} r="6" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
            <path
              d={`M32 ${y + 8} L36 ${y + 12} L42 ${y + 4}`}
              fill="none"
              stroke="#E2613D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="56" y={y + 12} fill="#0F0F0E" fontSize="12">
              {label}
            </text>
          </g>
        );
      })}
    </PhoneFrame>
  );
}
