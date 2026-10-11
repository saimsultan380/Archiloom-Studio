"use client";

import { useEffect, useId, useRef } from "react";

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center" role="presentation">
      <button type="button" className="absolute inset-0 bg-charcoal/70" aria-label="Close dialog" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[min(720px,calc(100vh-2rem))] w-full max-w-2xl overflow-y-auto rounded-[8px] border border-n-300 bg-white p-6 text-charcoal shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <h3 id={titleId} className="font-display text-2xl font-semibold tracking-[-0.03em]">
            {title}
          </h3>
          <button ref={closeRef} type="button" onClick={onClose} className="text-link font-display text-sm font-semibold">
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
