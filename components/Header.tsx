"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/site";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { SteppedBlocks } from "@/components/SteppedBlocks";
import { cn } from "@/lib/cn";

const sectionIds = ["work", "services", "consultations", "about", "contact"];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        solid || open ? "border-b border-white/10 bg-charcoal/65 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-6 px-6">
        <a href="#main" className="shrink-0">
          <Logo animate />
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative font-display text-[13px] font-medium tracking-[0.03em] text-white/75 transition-colors duration-300 hover:text-white",
                  isActive && "text-white",
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-signal transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <Button href="#contact">Get a Quote</Button>
        </div>
        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center text-white lg:hidden",
            open && "invisible",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <Menu strokeWidth={1.75} />
        </button>
      </div>
      {open ? (
        <div id="mobile-menu" className="fixed inset-0 z-[60] flex flex-col bg-charcoal px-6 py-6 text-white lg:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X strokeWidth={1.75} />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-5" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-[clamp(32px,8vw,44px)] font-medium leading-none tracking-[-0.03em]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pb-6">
            <SteppedBlocks on="dark" />
            <div className="mt-8">
              <Button href="#contact" className="w-full" onClick={() => setOpen(false)}>
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
