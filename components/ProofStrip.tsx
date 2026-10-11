import { marqueeClients } from "@/data/clients";
import { PROJECT_CLAIM } from "@/data/site";
import { ClientLogo } from "@/components/ClientLogo";
import { Container } from "@/components/Container";
import { SteppedBlocks } from "@/components/SteppedBlocks";

export function ProofStrip() {
  const marks = [...marqueeClients, ...marqueeClients];

  return (
    <section className="bg-white py-16 md:py-20" aria-label="Studio reach">
      <Container>
        <SteppedBlocks on="light" animate />
        <p className="mx-auto mt-8 max-w-3xl text-center font-display text-[clamp(26px,3.2vw,40px)] font-medium leading-[1.25] tracking-[-0.03em] text-charcoal">
          {PROJECT_CLAIM}
        </p>
      </Container>
      <div className="marquee mt-10 overflow-hidden border-y border-n-300">
        <div className="marquee-track flex w-max items-center py-6">
          <ul className="flex items-center">
            {marks.slice(0, marqueeClients.length).map((client) => (
              <li key={client.id} aria-label={client.name}>
                <ClientLogo id={client.id} className="mx-8 h-7 w-auto text-n-500 transition-colors duration-300 hover:text-charcoal" />
              </li>
            ))}
          </ul>
          <ul className="flex items-center" aria-hidden>
            {marks.slice(marqueeClients.length).map((client) => (
              <li key={`${client.id}-copy`}>
                <ClientLogo id={client.id} className="mx-8 h-7 w-auto text-n-500" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
