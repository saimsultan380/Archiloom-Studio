"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/data/services";
import { Container } from "@/components/Container";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionLabel";

export function ServicesGrid({ showHeading = true }: { showHeading?: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="services" className="bg-n-100 py-16 md:py-24 lg:py-32">
      <Container>
        {showHeading ? (
          <SectionHeading
            label="Services"
            title={<>Services we offer <span className="title-accent">in detail</span></>}
            description="Design and documentation for homeowners, developers, contractors and AEC firms."
          />
        ) : null}
        <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
          <defs>
            <linearGradient id="service-icon-gradient" x1="-100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#7ED957" />
              <stop offset="50%" stopColor="#FFC857" />
              <stop offset="100%" stopColor="#7ED957" />
              <animate attributeName="x1" values="-100%;100%" dur="5s" repeatCount="indefinite" />
              <animate attributeName="x2" values="0%;200%" dur="5s" repeatCount="indefinite" />
            </linearGradient>
          </defs>
        </svg>
        <div className={`${showHeading ? "mt-14" : ""} grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3`}>
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06} className="h-full">
              <article
                id={service.id}
                data-open={openId === service.id ? "true" : undefined}
                onClick={() => setOpenId((current) => (current === service.id ? null : service.id))}
                className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[8px] border border-n-300 bg-white transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(29,29,29,0.06)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-n-100">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="service-icon inline-flex">
                    <Icon name={service.icon} />
                  </span>
                  <h3 className="mt-4 font-display text-[22px] font-semibold leading-snug tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-n-700">{service.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li key={tag} className="border border-n-300 px-2.5 py-1 font-display text-[11px] font-medium tracking-[0.06em] text-n-700 uppercase">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] group-data-[open=true]:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="space-y-1.5 pt-4 text-sm leading-relaxed text-n-700">
                        {service.deliverables.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link
                    href={`/contact?service=${service.id}`}
                    onClick={(event) => event.stopPropagation()}
                    className="group/link mt-6 inline-flex items-center gap-1.5 self-start font-display text-sm font-semibold text-charcoal"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 text-signal transition-transform duration-300 ease-out group-hover/link:translate-x-1" strokeWidth={1.75} aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
