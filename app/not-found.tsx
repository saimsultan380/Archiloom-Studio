import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { sitemapLinks } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Page not found — Archiloom Studio",
    description: "The page you requested could not be found on Archiloom Studio.",
    path: "/404/",
    index: false,
  }),
};

export default function NotFound() {
  return (
    <main id="main" className="bg-white pt-[72px] text-charcoal">
      <Container className="py-16 md:py-24">
        <PageBreadcrumbs items={[{ name: "Page not found" }]} />
        <p className="mt-10 font-display text-[12px] font-semibold tracking-[0.16em] text-n-500 uppercase">
          Error 404
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(40px,7vw,72px)] leading-[0.95] font-semibold tracking-[-0.04em]">
          This page is not on the drawing set.
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-n-700">
          The URL may have moved, or the link is out of date. Head home, browse the work, or get in
          touch and we will point you to the right place.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/projects/" variant="secondary">
            View projects
          </Button>
          <Button href="/contact/" variant="secondary">
            Contact
          </Button>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-n-300 pt-8">
          {sitemapLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-sm font-semibold tracking-[0.08em] uppercase transition-colors hover:text-n-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
