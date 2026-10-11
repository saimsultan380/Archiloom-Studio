type ClientLogoProps = {
  id: string;
  className?: string;
};

const word = {
  fill: "currentColor",
  fontFamily: "var(--font-display), Montserrat, sans-serif",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.14em",
} as const;

function Mark({ id }: { id: string }) {
  switch (id) {
    case "northline":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M4 22 L12 8 L20 22" />
          <path d="M2 26 H22" />
        </g>
      );
    case "harbor":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 12c3 0 3 6 6 6s3-6 6-6 3 6 6 6" />
          <path d="M2 20c3 0 3 6 6 6s3-6 6-6 3 6 6 6" />
        </g>
      );
    case "fieldwork":
      return (
        <g fill="currentColor">
          <rect x="3" y="6" width="8" height="8" />
          <rect x="13" y="6" width="8" height="8" />
          <rect x="3" y="16" width="8" height="8" />
          <rect x="13" y="16" width="8" height="8" />
        </g>
      );
    case "meridian":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="15" r="9" />
          <path d="M12 4 V26" />
        </g>
      );
    case "cedar":
      return (
        <g fill="currentColor">
          <path d="M12 4 L20 16 H15.5 L21 26 H3 L8.5 16 H4 Z" />
        </g>
      );
    case "atelier":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="22" />
          <path d="M7 22 L12 9 L17 22" />
        </g>
      );
    case "glassline":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="5" width="18" height="20" />
          <path d="M3 12 H21 M3 18 H21 M12 5 V25" />
        </g>
      );
    case "westform":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M2 8 L7 24 L12 12 L17 24 L22 8" />
        </g>
      );
    case "halden":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M6 5 V26 M18 5 V26 M6 15 H18" />
        </g>
      );
    case "orbit":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="15" r="8" />
          <ellipse cx="12" cy="15" rx="11" ry="4.5" />
        </g>
      );
    case "sable":
      return (
        <g fill="currentColor">
          <path d="M12 3 L22 15 L12 27 L2 15 Z" />
        </g>
      );
    case "kinship":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="9" cy="15" r="6" />
          <circle cx="16" cy="15" r="6" />
        </g>
      );
    default:
      return null;
  }
}

const labels: Record<string, string> = {
  northline: "NORTHLINE",
  harbor: "HARBOR & CO",
  fieldwork: "FIELDWORK",
  meridian: "MERIDIAN",
  cedar: "CEDAR GROUP",
  atelier: "ATELIER NO.",
  glassline: "GLASSLINE",
  westform: "WESTFORM",
  halden: "HALDEN",
  orbit: "ORBIT AEC",
  sable: "SABLE",
  kinship: "KINSHIP",
};

export function ClientLogo({ id, className }: ClientLogoProps) {
  const label = labels[id] ?? id;

  return (
    <svg viewBox="0 0 196 36" className={className} aria-hidden>
      <Mark id={id} />
      <text x="32" y="23" {...word}>
        {label}
      </text>
    </svg>
  );
}
