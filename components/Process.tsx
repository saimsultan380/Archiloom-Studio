import { processSteps } from "@/data/site";
import { Container } from "@/components/Container";
import { GreenBar, SectionLabel } from "@/components/SectionLabel";

const notes: Record<(typeof processSteps)[number], string> = {
  Discovery: "The site, the brief and the limits, written down before a line is drawn.",
  Concept: "A spatial idea you can judge: massing, a plan and the first elevations.",
  Development: "The idea made precise. Materials, plans and the decisions that hold.",
  Documentation: "Drawings coordinated for review, permit and the people on site.",
  Delivery: "Issued sets, and a studio that stays to answer what the drawings raise.",
};

export function Process() {
  return (
    <section className="border-y border-n-300 bg-white py-16 text-charcoal md:py-24 lg:py-28" aria-labelledby="process-heading">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionLabel label="Process" />
            <h2 id="process-heading" className="mt-4 font-display text-[clamp(32px,4vw,44px)] font-bold leading-[1.1] tracking-[-0.03em]">
              How we <span className="title-accent">work</span>
            </h2>
            <GreenBar />
          </div>
          <p className="max-w-md font-display text-[clamp(22px,2.4vw,28px)] leading-[1.25] font-medium tracking-[-0.03em] text-charcoal lg:col-span-5">
            Designing a better <span className="title-accent">tomorrow</span>, space by space.
          </p>
        </div>
        <ol className="mt-12 grid border-t border-n-300 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <li
              key={step}
              className="group border-b border-n-300 py-8 transition-colors duration-300 hover:bg-n-100/70 sm:[&:nth-child(odd)]:pr-8 sm:[&:nth-child(even)]:pl-8 lg:border-b-0 lg:border-r lg:px-6 lg:py-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-500 transition-colors duration-300 group-hover:text-signal">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 font-display text-[22px] font-semibold tracking-[-0.02em]">{step}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-n-700">{notes[step]}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
