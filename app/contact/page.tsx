import type { Metadata } from "next";
import { Suspense } from "react";
import { Contact } from "@/components/Contact";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Archiloom Studio",
  description:
    "Request a quote from Archiloom Studio. Share your site, service needs and timeline — we reply with a clear next step.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <main id="main" className="pt-[72px]">
      <PageBreadcrumbs items={[{ name: "Contact", path: "/contact/" }]} />
      <PageHero
        label="Contact"
        title={
          <>
            We would love to <span className="title-accent">hear from you.</span>
          </>
        }
        description="Share the site, the service and how you want to work. We come back with a clear next step."
        image="/images/outdoor-terrace.jpg"
        imageAlt="Contemporary terrace beside a residence"
      />
      <Suspense fallback={<div className="h-96 bg-white" aria-hidden />}>
        <Contact formOnly />
      </Suspense>
    </main>
  );
}
