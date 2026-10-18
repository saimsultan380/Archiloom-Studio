"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectFrame } from "@/data/projects";
import { cn } from "@/lib/cn";

function chunkFrames(frames: ProjectFrame[]) {
  const rows: ProjectFrame[][] = [];
  for (let i = 0; i < frames.length; i += 2) {
    rows.push(frames.slice(i, i + 2));
  }
  return rows;
}

export function ProjectGallery({
  items,
  projectName,
  children,
}: {
  /** Full lightbox set (cover, frames, optional gif). */
  items: ProjectFrame[];
  projectName: string;
  /** Page content that can call open via context — we expose render props instead. */
  children: (api: {
    openAt: (index: number) => void;
    onEnter: (event: React.MouseEvent) => void;
    onMove: (event: React.MouseEvent) => void;
    onLeave: () => void;
  }) => React.ReactNode;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((current) => (current === null ? current : (current + 1) % items.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null ? current : (current - 1 + items.length) % items.length,
        );
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, items.length]);

  function openAt(index: number) {
    setCursor((c) => ({ ...c, visible: false }));
    setActive(index);
  }

  function onEnter(event: React.MouseEvent) {
    setCursor({ x: event.clientX, y: event.clientY, visible: true });
  }

  function onMove(event: React.MouseEvent) {
    setCursor({ x: event.clientX, y: event.clientY, visible: true });
  }

  function onLeave() {
    setCursor((c) => ({ ...c, visible: false }));
  }

  return (
    <>
      {children({ openAt, onEnter, onMove, onLeave })}

      <div
        className="pointer-events-none fixed z-[60] hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
          opacity: cursor.visible && active === null ? 1 : 0,
        }}
        aria-hidden
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-charcoal text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
          <ZoomIn className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>

      {active !== null ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/92 p-4 md:p-8"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            aria-label="Close gallery"
            onClick={() => setActive(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${projectName} gallery`}
            className="relative z-10 flex h-full w-full max-w-[1400px] flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4 text-white">
              <p className="font-display text-[12px] font-semibold tracking-[0.14em] uppercase text-white/70">
                {projectName} · {active + 1} / {items.length}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <div className="relative h-full w-full overflow-hidden bg-black/40">
                <Image
                  src={items[active].src}
                  alt={items[active].alt}
                  fill
                  priority
                  className="object-contain"
                  sizes="100vw"
                  unoptimized={
                    items[active].src.endsWith(".gif") ||
                    items[active].src.includes("-completion.")
                  }
                />
              </div>

              {items.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActive((current) =>
                        current === null ? 0 : (current - 1 + items.length) % items.length,
                      )
                    }
                    className="absolute top-1/2 left-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-charcoal/50 text-white backdrop-blur-sm transition-colors hover:bg-charcoal/80 md:left-4"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActive((current) => (current === null ? 0 : (current + 1) % items.length))
                    }
                    className="absolute top-1/2 right-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-charcoal/50 text-white backdrop-blur-sm transition-colors hover:bg-charcoal/80 md:right-4"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              ) : null}
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {items.map((item, index) => (
                <button
                  key={`${item.src}-thumb`}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden border transition-opacity",
                    index === active
                      ? "border-white opacity-100"
                      : "border-white/20 opacity-55 hover:opacity-90",
                  )}
                  aria-label={`View image ${index + 1}`}
                  aria-current={index === active}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                    unoptimized={
                      item.src.endsWith(".gif") || item.src.includes("-completion.")
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function ProjectGalleryTile({
  frame,
  paired,
  tall,
  fill,
  priority,
  onOpen,
  onEnter,
  onMove,
  onLeave,
}: {
  frame: ProjectFrame;
  paired?: boolean;
  tall?: boolean;
  /** Stretch to fill a sized parent (e.g. project hero). */
  fill?: boolean;
  priority?: boolean;
  onOpen: () => void;
  onEnter: (event: React.MouseEvent) => void;
  onMove: (event: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative block w-full overflow-hidden bg-n-100 text-left",
        fill
          ? "absolute inset-0 h-full"
          : paired
            ? "h-[38vh] min-h-[240px] md:h-[44vh]"
            : "h-[52vh] min-h-[320px] md:h-[62vh]",
        "cursor-none max-md:cursor-zoom-in",
      )}
      aria-label={`Open gallery — ${frame.alt}`}
    >
      <Image
        src={frame.src}
        alt={frame.alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        sizes={
          paired
            ? "(min-width: 1440px) 680px, (min-width: 768px) 50vw, 100vw"
            : "(min-width: 1440px) 1360px, 100vw"
        }
        unoptimized={frame.src.endsWith(".gif") || frame.src.includes("-completion.")}
      />
      <span className="pointer-events-none absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/10" />
      <span className="pointer-events-none absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-charcoal opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 md:hidden">
        <ZoomIn className="h-4 w-4" strokeWidth={1.75} />
      </span>
    </button>
  );
}

export function ProjectFrameGrid({
  frames,
  openAt,
  onEnter,
  onMove,
  onLeave,
  indexOffset = 0,
}: {
  frames: ProjectFrame[];
  openAt: (index: number) => void;
  onEnter: (event: React.MouseEvent) => void;
  onMove: (event: React.MouseEvent) => void;
  onLeave: () => void;
  /** Index of frames[0] inside the full lightbox items array. */
  indexOffset?: number;
}) {
  /**
   * Large sets (7+ gallery images): every row is two-up.
   * Smaller sets: first frame full width, then pairs.
   */
  const useAllPairs = frames.length >= 7;
  const lead = useAllPairs ? null : frames[0];
  const rest = useAllPairs ? frames : frames.slice(1);
  const pairs = chunkFrames(rest);
  const pairIndexOffset = useAllPairs ? 0 : 1;

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-6 md:gap-4 md:px-10">
      {lead ? (
        <ProjectGalleryTile
          frame={lead}
          tall
          priority
          onOpen={() => openAt(indexOffset)}
          onEnter={onEnter}
          onMove={onMove}
          onLeave={onLeave}
        />
      ) : null}
      {pairs.map((pair, pairIndex) => (
        <div
          key={`pair-${pairIndex}`}
          className={
            pair.length === 2
              ? "grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4"
              : "grid grid-cols-1"
          }
        >
          {pair.map((frame, i) => (
            <ProjectGalleryTile
              key={frame.src}
              frame={frame}
              paired={pair.length === 2}
              tall={pair.length === 1}
              priority={pairIndex === 0 && i === 0}
              onOpen={() => openAt(indexOffset + pairIndexOffset + pairIndex * 2 + i)}
              onEnter={onEnter}
              onMove={onMove}
              onLeave={onLeave}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
