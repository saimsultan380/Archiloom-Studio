"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/site";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { SteppedBlocks } from "@/components/SteppedBlocks";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  function current(href: string) {
    const path = href.split("#")[0];
    if (href.includes("#")) return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  }

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const root = document.documentElement;
    const previous = document.body.style.overflow;
    root.classList.add("menu-open");
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("menu-open");
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        open
          ? "bg-charcoal"
          : !home || solid
            ? "border-b border-white/10 bg-charcoal/65 backdrop-blur-xl transition-[background-color,border-color,backdrop-filter] duration-300"
            : "bg-transparent transition-[background-color,border-color,backdrop-filter] duration-300",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-6 px-6">
        <Link href="/" className="shrink-0">
          <Logo animate={home} />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = current(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative font-display text-[13px] font-medium tracking-[0.03em] text-white/75 transition-colors duration-300 hover:text-white",
                  isActive && "text-white",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-signal transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <Button href="/contact">Get a Quote</Button>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X strokeWidth={1.75} /> : <Menu strokeWidth={1.75} />}
        </button>
      </div>
      {open ? (
        <div id="mobile-menu" className="mobile-menu bg-grid fixed inset-x-0 top-[72px] bottom-0 z-[80] flex flex-col overflow-y-auto overscroll-contain bg-charcoal px-6 py-8 text-white lg:hidden">
          <nav className="flex flex-1 flex-col items-start justify-center gap-7 text-left" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group inline-flex items-start gap-2 font-display text-[clamp(32px,8vw,44px)] font-medium leading-none tracking-[-0.03em]"
              >
                {link.label}
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-signal" strokeWidth={1.75} aria-hidden />
              </Link>
            ))}
          </nav>
          <div className="flex flex-col items-start pt-8 pb-2">
            <SteppedBlocks on="dark" />
            <div className="mt-6 w-full max-w-sm">
              <Button href="/contact" className="w-full" onClick={() => setOpen(false)}>
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
