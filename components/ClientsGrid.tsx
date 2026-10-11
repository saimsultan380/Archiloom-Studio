import { clients } from "@/data/clients";
import { ClientLogo } from "@/components/ClientLogo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionLabel";

export function ClientsGrid() {
  return (
    <section className="bg-white pt-4 pb-16 md:pb-24 lg:pb-32">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading label="Clients" title={<>Our <span className="title-accent">Clients</span></>} />
            <p className="mt-6 text-[17px] leading-[1.6] text-n-700">
              Marks shown are placeholders for practices and developers.
            </p>
          </div>
          <ul className="grid grid-cols-2 border-t border-l border-n-300 sm:grid-cols-3 lg:col-span-8">
            {clients.map((client) => (
              <li
                key={client.id}
                aria-label={client.name}
                className="group flex h-24 items-center justify-center border-r border-b border-n-300 px-4 sm:h-28"
              >
                <ClientLogo
                  id={client.id}
                  className="h-8 w-auto max-w-[168px] text-n-500 transition-colors duration-300 group-hover:text-charcoal"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
