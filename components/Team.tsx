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
          <p className="max-w-[12rem] pb-1 text-right text-sm text-n-700 sm:max-w-none">Meet the creative minds.</p>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-n-700">
          Designation, education and experience will be added as each person&apos;s details are confirmed.
        </p>
        <div className="mt-12 grid grid-cols-2 items-end gap-x-4 gap-y-10 sm:grid-cols-3 lg:gap-x-8">
          {team.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.06}>
              <article className="group" tabIndex={0} aria-label={member.name}>
                <div className="relative aspect-[3/5] w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain object-bottom grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 group-focus-within:grayscale-0"
                    sizes="(min-width: 1024px) 28vw, 46vw"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-display text-sm font-semibold">{member.name}</p>
                  {member.designation ? <p className="mt-1 text-[13px] text-n-700">{member.designation}</p> : null}
                  {member.education ? <p className="mt-2 text-[13px] leading-snug text-n-700">{member.education}</p> : null}
                  {member.experience ? <p className="mt-1 text-[13px] leading-snug text-n-700">{member.experience}</p> : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
