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
    title: "Design & Development",
    body: "Architecture, interiors, design development, and visual presentations.",
    icon: "architecture",
  },
  {
    title: "Technical & Outsourcing Support",
    body: "CAD, Revit/BIM, drawing production, rendering, and animation.",
    icon: "drafting",
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
      <motion.div
        className="hero-map pointer-events-none absolute inset-0 z-20 lg:left-[28%]"
        style={{ x, y }}
      >
        <WorldMap />
      </motion.div>
      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex flex-1 items-center pt-[88px]">
          <Container className="pointer-events-none py-10 lg:py-8">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(260px,0.88fr)] lg:gap-x-16">
              <div className="pointer-events-auto relative z-30 max-w-[640px] lg:col-start-1">
                <p className="font-display text-[13px] font-semibold tracking-[0.18em] text-white/90 sm:text-[15px]">
                  GLOBAL ARCHITECTURE & DESIGN STUDIO
                </p>
                <h1 className="mt-6 font-display text-[clamp(36px,4.6vw,60px)] font-bold leading-[1.08] tracking-[-0.035em]">
                  Your Vision.
                  <span className="mt-1 block title-accent">Our Design Expertise.</span>
                  <span className="mt-1 block">Reliable Project Delivery.</span>
                </h1>
                <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-white/75">
                  Archiloom Studio partners with clients and design professionals worldwide to deliver thoughtful architectural design, refined interiors, coordinated technical documentation, and compelling 3D visualizations.
                </p>
              </div>
              <div className="pointer-events-none relative z-0 aspect-[16/10] w-full overflow-hidden border border-white/15 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <Image
                  src="/images/hero-split.webp"
                  alt="Split view of a finished restaurant render and its technical elevation"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
              <div className="pointer-events-auto relative z-30 max-w-[640px] lg:col-start-1">
                <div className="flex flex-nowrap gap-2 sm:gap-3">
                  <Button href="#contact" className="min-w-0 flex-1 px-3 text-center text-[12px] leading-tight sm:flex-none sm:px-5 sm:text-[13px]">
                    Tell Us About Your Project
                  </Button>
                  <Button href="/projects/" variant="secondary" tone="dark" className="min-w-0 flex-1 whitespace-nowrap px-3 text-[12px] sm:flex-none sm:px-5 sm:text-[13px]">
                    View Projects
                  </Button>
                </div>
                <ul className="mt-10 grid grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 sm:gap-8">
                  {pillars.map((pillar) => (
                    <li key={pillar.title} className="min-w-0 text-left">
                      <Icon name={pillar.icon} className="text-white" />
                      <p className="mt-3 font-display text-[13px] font-semibold tracking-[-0.02em]">
                        {pillar.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{pillar.body}</p>
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
