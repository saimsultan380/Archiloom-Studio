import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Process } from "@/components/Process";
import { Team } from "@/components/Team";
import { about } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About us — Archiloom Studio",
  description: about.story,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <main id="main" className="pt-[72px]">
      <PageBreadcrumbs items={[{ name: "About", path: "/about/" }]} />
      <PageHero
        label="About"
        title={
          <>
            About <span className="title-accent">us</span>
          </>
        }
        description={about.story}
        image="/images/interior-living.jpg"
        imageAlt="Calm living room with oak, plaster and a long garden window"
      />
      <section className="bg-white py-16 text-charcoal md:py-24">
        <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-700 uppercase">
              Mission
            </p>
            <h2 className="mt-4 font-display text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.03em]">
              Meaningful, high-quality spaces.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-n-700">{about.mission}</p>
          </div>
          <div>
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-700 uppercase">
              Vision
            </p>
            <h2 className="mt-4 font-display text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.03em]">
              A trusted studio, worldwide.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-n-700">{about.vision}</p>
          </div>
        </Container>
      </section>
      <Process />
      <Team />
      <section className="bg-n-100 py-16 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-700 uppercase">
              Next
            </p>
            <h2 className="mt-4 font-display text-[clamp(32px,4vw,48px)] font-bold leading-[1.05] tracking-[-0.03em]">
              Tell us about the <span className="title-accent">site</span>.
            </h2>
          </div>
          <Button href="/contact/">Get a Quote</Button>
        </Container>
      </section>
    </main>
  );
}
