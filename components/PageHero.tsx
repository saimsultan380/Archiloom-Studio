import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/Container";
import { MapBackdrop } from "@/components/MapBackdrop";

export function PageHero({
  label,
  title,
  description,
  image,
  imageAlt,
}: {
  label: string;
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <MapBackdrop place={image ? "left" : "right"} />
      <Container className="relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-white/65 uppercase">{label}</p>
          <h1 className="mt-4 font-display text-[clamp(40px,5vw,68px)] font-bold leading-[1.02] tracking-[-0.04em]">{title}</h1>
          <span className="mt-5 block h-[3px] w-10 bg-signal" aria-hidden />
          <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-white/75">{description}</p>
        </div>
        {image ? (
          <div className="relative aspect-[16/10] overflow-hidden border border-white/15">
            <Image src={image} alt={imageAlt ?? ""} fill priority className="object-cover" sizes="(min-width: 1024px) 46vw, 100vw" />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
