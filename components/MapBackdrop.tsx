import { WorldMap } from "@/components/WorldMap";
import { cn } from "@/lib/cn";

export function MapBackdrop({ place }: { place: "left" | "center" | "right" }) {
  return (
    <div className={cn("section-map pointer-events-none absolute inset-0 overflow-hidden", `section-map--${place}`)} aria-hidden>
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          place === "left" && "left-[-8%] w-[min(760px,78%)]",
          place === "right" && "right-[-6%] w-[min(820px,72%)]",
          place === "center" && "left-1/2 w-[min(980px,92%)] -translate-x-1/2",
        )}
      >
        <WorldMap decorative />
      </div>
    </div>
  );
}
