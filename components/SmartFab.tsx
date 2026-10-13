"use client";

import { MessageSquare } from "lucide-react";
import { Suspense, useState } from "react";
import { Modal } from "@/components/Modal";
import { QuoteForm } from "@/components/QuoteForm";

export function SmartFab() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-5 bottom-5 z-[65] inline-flex items-center gap-2 rounded-full bg-action px-4 py-3 font-display text-[13px] font-semibold tracking-[0.04em] text-charcoal shadow-[0_12px_28px_rgba(255,200,87,0.45)] transition-transform duration-300 hover:scale-[1.03] md:right-8 md:bottom-8"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <MessageSquare className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        smart
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
