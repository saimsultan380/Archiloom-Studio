import {
  Armchair,
  Box,
  Building2,
  Check,
  Clapperboard,
  ClipboardCheck,
  Globe,
  Hammer,
  LayoutGrid,
  MessagesSquare,
  PencilRuler,
  type LucideIcon,
} from "lucide-react";

const icons = {
  architecture: Building2,
  interior: Armchair,
  drafting: PencilRuler,
  visualization: Box,
  renovation: Hammer,
  planning: LayoutGrid,
  consulting: MessagesSquare,
  global: Globe,
  animation: Clapperboard,
  permits: ClipboardCheck,
  check: Check,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
  size = 24,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} size={size} strokeWidth={1.75} aria-hidden />;
}
