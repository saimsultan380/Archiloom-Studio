"use client";

import Link from "next/link";
import { useState } from "react";
import { packages, type Package } from "@/data/packages";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Icon } from "@/components/Icon";
import { Modal } from "@/components/Modal";
import { MapBackdrop } from "@/components/MapBackdrop";
import { SectionHeading } from "@/components/SectionLabel";

export function Pricing() {
  const [active, setActive] = useState<Package | null>(null);

  return (
    <section id="packages" className="bg-n-100">
      <div className="relative overflow-hidden bg-charcoal">
        <MapBackdrop place="center" />
        <div className="relative bg-grid">
          <Container className="pt-16 pb-28 md:pt-24 md:pb-36 lg:pt-32">
            <SectionHeading
              label="Packages"
              title={<>Our <span className="title-accent">Packages</span></>}
              description="Flexible engagement models. Custom offers available on request."
              tone="dark"
            />
          </Container>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-n-100" />
      </div>
      <Container className="relative z-10 -mt-16 pb-16 md:-mt-20 md:pb-24 lg:pb-32">
        {/* PLACEHOLDER — feature lists to be defined by client */}
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`relative flex h-full flex-col rounded-[8px] border bg-white p-7 transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_16px_40px_rgba(29,29,29,0.08)] md:p-8 ${
                pkg.featured
                  ? "border-charcoal shadow-[0_12px_32px_rgba(29,29,29,0.08)] lg:-translate-y-3 lg:hover:-translate-y-4"
                  : "border-n-300 hover:-translate-y-1"
              }`}
            >
              {pkg.featured ? (
                <p className="absolute -top-3 left-7 bg-signal px-2.5 py-1 font-display text-[11px] font-semibold tracking-[0.12em] text-charcoal uppercase">
                  Most popular
                </p>
              ) : null}
              <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
              <p className="mt-6 flex items-end gap-1">
                <span className="font-display text-[40px] leading-none font-bold tracking-[-0.03em]">{pkg.price}</span>
                <span className="mb-1 text-sm text-n-700">{pkg.cadence}</span>
              </p>
              <p className="mt-4 text-[15px] text-charcoal">{pkg.hours}</p>
              <p className="mt-1 text-sm text-n-700">Effective rate {pkg.rate}</p>
              <ul className="mt-6 space-y-3 border-t border-n-300 pt-6">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[15px] leading-snug text-n-700">
                    <Icon name="check" size={18} className="mt-0.5 shrink-0 text-signal" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button
                  href={`/contact/?plan=${pkg.id}`}
                  variant={pkg.featured ? "primary" : "secondary"}
                  className="w-full"
                >
                  Start a Project
                </Button>
                <button type="button" onClick={() => setActive(pkg)} className="text-link mt-4 font-display text-sm font-semibold">
                  How it works
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-[15px] text-n-700 md:text-left">
          Feature lists are draft placeholders, to be confirmed.{" "}
          <span className="mt-2 block text-charcoal md:mt-3 md:text-[17px]">
            Need something different?{" "}
            <Link href="/contact/?plan=custom" className="text-link font-display font-semibold">
              Discuss Your Scope →
            </Link>
          </span>
        </p>
      </Container>
      <Modal open={Boolean(active)} title={active ? `How ${active.name} works` : "How it works"} onClose={() => setActive(null)}>
        {active ? (
          <>
            <p className="text-sm text-n-700">Process notes are placeholders, to be defined by the client.</p>
            <ol className="mt-5 space-y-4">
              {active.howItWorks.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="font-display text-sm font-semibold text-n-500">0{index + 1}</span>
                  <p className="text-[16px] leading-[1.6]">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Button href={`/contact/?plan=${active.id}`} onClick={() => setActive(null)}>
                Start a Project
              </Button>
            </div>
          </>
        ) : null}
      </Modal>
    </section>
  );
}
