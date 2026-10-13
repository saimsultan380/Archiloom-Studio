"use client";

import Image from "next/image";
import { Container } from "@/components/Container";
import { GreenBar, SectionLabel } from "@/components/SectionLabel";
import { QuoteForm } from "@/components/QuoteForm";

export function Contact({ formOnly = false }: { formOnly?: boolean }) {
  return (
    <section id="contact" className="bg-white py-16 text-charcoal md:py-24 lg:py-32">
      <Container>
        <div className={formOnly ? "" : "grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10"}>
          {formOnly ? null : (
            <div className="flex flex-col lg:col-span-5">
              <SectionLabel label="Contact" />
              <h2 className="mt-4 font-display text-[clamp(36px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.035em]">
                We would love to <span className="title-accent">hear from you.</span>
              </h2>
              <GreenBar />
              <p className="mt-6 max-w-md text-[17px] leading-[1.6] text-n-700">
                Share the site, the service and how you want to work. We come back with a clear next step.
              </p>
              <div className="relative mt-8 aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[280px] lg:flex-1">
                <Image
                  src="/images/outdoor-terrace.jpg"
                  alt="Contemporary terrace beside a residence"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
          )}
          <div id="quote-form" className={`border border-n-300 bg-n-100 p-6 md:p-8 lg:p-10 ${formOnly ? "" : "lg:col-span-7"}`}>
            <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-700 uppercase">Request a quote</p>
            <h3 className="mt-3 font-display text-[28px] font-semibold tracking-[-0.03em]">Start with the scope.</h3>
            <QuoteForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
