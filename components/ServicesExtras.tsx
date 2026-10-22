import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { MapBackdrop } from "@/components/MapBackdrop";
import { GreenBar, SectionLabel } from "@/components/SectionLabel";

const audiences = [
  {
    title: "Homeowners",
    body: "A clear house idea, drawings you can read, and a path from first sketch to permit.",
  },
  {
    title: "Developers",
    body: "Massing, feasibility and sets that hold under review, financing and the market.",
  },
  {
    title: "Contractors & AEC",
    body: "Drafting, coordination and visuals that sit cleanly inside your templates and deadlines.",
  },
] as const;

const capabilities = [
  { label: "01", title: "Spatial design", body: "Plans, elevations and interiors with a single idea held through." },
  { label: "02", title: "Technical sets", body: "Permit and construction drawings coordinated for review and site." },
  { label: "03", title: "Immersive visuals", body: "Renders and walkthroughs that explain light, material and scale." },
] as const;

export function ServicesExtras() {
  return (
    <>
      <section className="bg-white py-16 text-charcoal md:py-24">
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionLabel label="Approach" />
              <h2 className="mt-4 font-display text-[clamp(32px,4vw,44px)] font-bold leading-[1.1] tracking-[-0.03em]">
                What every engagement <span className="title-accent">covers</span>
              </h2>
              <GreenBar />
            </div>
            <p className="max-w-md text-[17px] leading-[1.6] text-n-700 lg:col-span-6">
              Scope, drawings and delivery stay in one studio conversation — so the idea is never lost between concept and construction.
            </p>
          </div>
          <div className="mt-12 grid gap-8 border-t border-n-300 md:grid-cols-3 md:gap-0">
            {capabilities.map((item) => (
              <article key={item.title} className="border-b border-n-300 py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-signal">{item.label}</p>
                <h3 className="mt-5 font-display text-[22px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-n-700">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-charcoal py-16 text-white md:py-24">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <MapBackdrop place="right" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel label="Clients" tone="dark" />
              <h2 className="mt-4 font-display text-[clamp(32px,4vw,44px)] font-bold leading-[1.1] tracking-[-0.03em]">
                Built for the people who <span className="title-accent">make</span> buildings
              </h2>
              <GreenBar />
              <ul className="mt-10 space-y-8">
                {audiences.map((item) => (
                  <li key={item.title}>
                    <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-2 max-w-md text-[16px] leading-[1.6] text-white/75">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden border border-white/15 sm:aspect-[16/10] lg:aspect-[4/5]">
              <Image
                src="/images/harbor-interior.jpg"
                alt="Quiet workplace interior with daylight and timber"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-n-100 py-16 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <SectionLabel label="Next" />
            <h2 className="mt-4 font-display text-[clamp(32px,4vw,48px)] font-bold leading-[1.05] tracking-[-0.03em]">
              Tell us the <span className="title-accent">service</span> and the site.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-n-700">
              Start with a quote. We come back with a clear next step, not a generic pitch.
            </p>
          </div>
          <Button href="/contact/">Request a Quote</Button>
        </Container>
      </section>
    </>
  );
}
