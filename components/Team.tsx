import Image from "next/image";
import { team } from "@/data/team";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { GreenBar, SectionLabel } from "@/components/SectionLabel";
import { SteppedBlocks } from "@/components/SteppedBlocks";

export function Team() {
  return (
    <section className="bg-white py-16 md:py-24 lg:py-32" aria-labelledby="team-heading">
      <Container>
        <SteppedBlocks on="light" animate />
        <div className="mt-8 flex items-end justify-between gap-6">
          <div>
            <SectionLabel label="Team" />
            <h2 id="team-heading" className="mt-4 font-display text-[clamp(32px,4vw,40px)] font-bold tracking-[-0.03em]">
              Our <span className="title-accent">Team</span>
            </h2>
            <GreenBar />
          </div>
          <p className="max-w-[10rem] pb-1 text-right text-sm text-n-700 sm:max-w-none">Meet the creative minds.</p>
        </div>
        <p className="mt-4 text-sm text-n-700">Stand-in portraits until studio photography arrives.</p>
        <div className="mt-12 grid grid-cols-2 items-end gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {team.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.06}>
              <article className="group" tabIndex={0} aria-label={`${member.name}, ${member.role}`}>
                <div className="relative aspect-[3/5] w-full">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    className="object-contain object-bottom grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 group-focus-within:grayscale-0"
                    sizes="(min-width: 1024px) 22vw, 46vw"
                  />
                </div>
                <div className="mt-4 flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
                  <div>
                    <p className="font-display text-sm font-semibold">{member.name}</p>
                    <p className="text-[13px] text-n-700">{member.role}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
