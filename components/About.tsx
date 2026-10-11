import Image from "next/image";
import { about } from "@/data/site";
import { Container } from "@/components/Container";
import { MapBackdrop } from "@/components/MapBackdrop";
import { SectionHeading } from "@/components/SectionLabel";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-charcoal py-16 text-white md:py-24 lg:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <MapBackdrop place="right" />
      <Container className="relative">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-20">
          <SectionHeading label="About" title={<>About <span className="title-accent">us</span></>} tone="dark" />
          <p className="max-w-xl text-[17px] leading-[1.7] text-white/75">{about.story}</p>
        </div>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/images/interior-living.jpg"
              alt="Calm living room with oak, plaster and a long garden window"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em]">Mission</h3>
            <p className="mt-3 text-[17px] leading-[1.7] text-white/75">{about.mission}</p>
            <h3 className="mt-10 font-display text-[22px] font-semibold tracking-[-0.02em]">Vision</h3>
            <p className="mt-3 text-[17px] leading-[1.7] text-white/75">{about.vision}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
