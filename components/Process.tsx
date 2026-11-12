import { processJourney } from "@/data/site";
import { Container } from "@/components/Container";
import { GreenBar, SectionLabel } from "@/components/SectionLabel";

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
            Your Vision. <span className="title-accent">Our Commitment.</span>
          </p>
        </div>
        <p className="mt-8 max-w-3xl text-[16px] leading-[1.7] text-n-700">
          Wherever you are in the journey — from a vague idea to a construction-ready project — we help you take the next step.
        </p>
        <ol className="mt-12 grid border-t border-n-300 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {processJourney.map((step) => (
            <li
              key={step.id}
              className="group border-b border-n-300 py-8 transition-colors duration-300 hover:bg-n-100/70 sm:[&:nth-child(odd)]:pr-6 sm:[&:nth-child(even)]:pl-6 lg:border-b-0 lg:border-r lg:px-5 lg:py-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-500 uppercase transition-colors duration-300 group-hover:text-signal">
                {step.id}
              </p>
              <h3 className="mt-6 font-display text-[20px] leading-[1.25] font-semibold tracking-[-0.02em]">
                {step.lead} {step.accent}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-n-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
