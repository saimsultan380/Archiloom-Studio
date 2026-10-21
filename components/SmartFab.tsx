"use client";

import { MessageSquare } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { QuoteForm } from "@/components/QuoteForm";
import { cn } from "@/lib/cn";

export function SmartFab() {
  const [open, setOpen] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      {
        // Hide once the footer enters the lower portion of the viewport on any device.
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "smart-fab fixed right-4 bottom-4 z-[65] inline-flex h-11 w-11 items-center justify-center rounded-full bg-action text-charcoal shadow-[0_8px_20px_rgba(255,200,87,0.4)] transition-[transform,opacity] duration-300 hover:scale-[1.05] md:right-6 md:bottom-6",
          nearFooter && "pointer-events-none translate-y-3 opacity-0",
        )}
        aria-label="Get a Quote"
        aria-haspopup="dialog"
        aria-expanded={open}
        tabIndex={nearFooter ? -1 : 0}
      >
        <MessageSquare className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </button>
      <Modal open={open} title="Request a quote" onClose={() => setOpen(false)}>
        <p className="mb-6 text-[15px] leading-[1.6] text-n-700">
          Share the site, the service and how you want to work. We come back with a clear next step.
        </p>
        <Suspense fallback={<div className="h-48 bg-n-100" aria-hidden />}>
          <QuoteForm compact />
        </Suspense>
      </Modal>
    </>
  );
}
