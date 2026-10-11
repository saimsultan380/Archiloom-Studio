const hair = [
  "M70 58c2-24 16-36 40-36s38 12 40 34c-8-10-22-14-40-14s-32 6-40 16z",
  "M64 64c2-30 18-46 46-46 24 0 42 14 46 40-8 6-14 22-18 34-8-18-18-24-28-24s-18 6-28 24c-6-12-14-28-18-28z",
  "M72 60c2-26 16-38 38-38 20 0 36 12 38 34-10-10-22-14-38-14s-28 4-38 18z M118 36c10 2 16 12 14 20-6-2-10-8-10-14 0-4-2-6-4-6z",
  "M68 62c6-24 20-36 40-38 18-2 34 8 40 26-12-6-24-8-38-6-14 2-26 8-42 18z",
];

export function Portrait({ variant, colored = false }: { variant: 0 | 1 | 2 | 3; colored?: boolean }) {
  const skin = colored ? "#C6A484" : "#C8C8C8";
  const hairFill = colored ? "#2C2622" : "#8A8A8A";
  const cloth = colored ? "#3C3C3C" : "#A6A6A6";
  const deep = colored ? "#2A2A2A" : "#8E8E8E";
  const shoe = colored ? "#1A1A1A" : "#666666";
  const arm = [10, -14, 16, -8][variant];

  return (
    <svg viewBox="0 0 200 460" className="h-[94%] w-auto" aria-hidden>
      <ellipse cx="100" cy="68" rx="26" ry="30" fill={skin} />
      <path d={hair[variant]} fill={hairFill} />
      <rect x="90" y="94" width="20" height="18" rx="4" fill={skin} />
      <path d="M70 120h60l18 84-12 70H62l-10-70z" fill={cloth} />
      <path d="M82 126h36l6 28H76z" fill={deep} />
      <g transform={`rotate(${arm} 54 150)`}>
        <rect x="46" y="124" width="14" height="112" rx="7" fill={deep} />
      </g>
      <g transform={`rotate(${-arm} 146 150)`}>
        <rect x="140" y="124" width="14" height="112" rx="7" fill={deep} />
      </g>
      <rect x="76" y="268" width="22" height="146" rx="8" fill={cloth} />
      <rect x="104" y="268" width="22" height="146" rx="8" fill={deep} />
      <rect x="72" y="406" width="30" height="12" rx="2" fill={shoe} />
      <rect x="102" y="406" width="30" height="12" rx="2" fill={shoe} />
    </svg>
  );
}
