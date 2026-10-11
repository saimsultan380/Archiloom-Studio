"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Icon, type IconName } from "@/components/Icon";
import { WorldMap } from "@/components/WorldMap";

const pillars: Array<{ title: string; body: string; icon: IconName }> = [
  {
    title: "Clarity",
    body: "Clear drawings, clear communication.",
    icon: "consulting",
  },
  {
    title: "Craft",
    body: "Design thinking backed by technical execution.",
    icon: "drafting",
  },
  {
    title: "Global",
    body: "A digital-first studio built for international collaboration.",
    icon: "global",
  },
];

export function Hero() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function onMove(event: MouseEvent<HTMLElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 24);
    y.set(py * 24);
  }

  function onLeave() {
    const tween = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };
    animate(x, 0, tween);
    animate(y, 0, tween);
  }

  return (
    <section
      className="relative overflow-hidden bg-charcoal text-white"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div className="pointer-events-none absolute -inset-4" style={{ x, y }} aria-hidden>
        <div className="grid-draw bg-grid absolute inset-0" />
      </motion.div>
      <motion.div className="hero-map absolute inset-0 lg:left-[28%]" style={{ x, y }}>
        <WorldMap />
      </motion.div>
      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex flex-1 items-center pt-[88px]">
          <Container className="pointer-events-none py-10 lg:py-8">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(260px,0.88fr)] lg:gap-x-16">
              <div className="pointer-events-auto max-w-[640px] lg:col-start-1">
                <p className="flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.16em] text-white/80">
                  <span className="h-[3px] w-10 shrink-0 bg-signal" aria-hidden />
                  GLOBAL ARCHITECTURE & DESIGN STUDIO
                </p>
                <h1 className="mt-6 font-display text-[clamp(40px,5.2vw,64px)] font-bold leading-[1.05] tracking-[-0.035em]">
                  Designing <span className="title-accent">Exceptional</span>{" "}
                  <span className="md:block">
                    <span className="title-accent">Spaces</span> Worldwide
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-white/75">
                  Architecture, interiors, permit drafting, visualization and outdoor construction — delivered with technical precision and honest, budget-friendly pricing.
                </p>
              </div>
              <div className="pointer-events-none relative aspect-[16/10] w-full overflow-hidden border border-white/15 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <Image
                  src="/images/hero-residence.jpg"
                  alt="Contemporary residence with a long glazed elevation at dusk"
                  fill
                  priority
                  className="object-cover object-[center_42%]"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
              <div className="pointer-events-auto max-w-[640px] lg:col-start-1">
                <div className="flex flex-nowrap gap-2 sm:gap-3">
                  <Button href="#contact" className="min-w-0 flex-1 whitespace-nowrap px-3 text-[12px] sm:flex-none sm:px-5 sm:text-[13px]">
                    Start a Project
                  </Button>
                  <Button href="#work" variant="secondary" tone="dark" className="min-w-0 flex-1 whitespace-nowrap px-3 text-[12px] sm:flex-none sm:px-5 sm:text-[13px]">
                    View Projects
                  </Button>
                </div>
                <ul className="mt-10 grid grid-cols-3 gap-3 border-t border-white/15 pt-8 sm:gap-6">
                  {pillars.map((pillar) => (
                    <li key={pillar.title} className="min-w-0 text-center sm:text-left">
                      <Icon name={pillar.icon} className="mx-auto text-white sm:mx-0" />
                      <p className="mt-3 font-display text-[11px] font-semibold uppercase tracking-[0.08em] sm:text-[13px] sm:tracking-[0.12em]">
                        {pillar.title}
                      </p>
                      <p className="mt-2 hidden text-sm leading-relaxed text-white/70 sm:block">{pillar.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
