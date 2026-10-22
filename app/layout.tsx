import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { SmartFab } from "@/components/SmartFab";
import { studio } from "@/data/site";
import { SITE_ORIGIN, canonicalUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_ORIGIN}/`),
  title: {
    default: studio.title,
    template: "%s",
  },
  description: studio.description,
  applicationName: studio.name,
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: {
    title: studio.title,
    description: studio.description,
    url: canonicalUrl("/"),
    siteName: studio.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: studio.title,
    description: studio.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#1D1D1D",
  },
};

export const viewport: Viewport = {
  themeColor: "#1D1D1D",
  width: "device-width",
  initialScale: 1,
  colorScheme: "only light",
};

const organizationJsonLd = {
  "@type": "ProfessionalService",
  "@id": `${SITE_ORIGIN}/#organization`,
  name: studio.name,
  description: studio.description,
  url: canonicalUrl("/"),
  email: studio.email,
  areaServed: "Worldwide",
  slogan: studio.tagline,
  image: `${SITE_ORIGIN}/logo.png`,
  logo: `${SITE_ORIGIN}/icon-192.png`,
  serviceType: [
    "Architecture design",
    "Interior design",
    "Building permit drafting",
    "3D visualization",
    "Architectural animation",
  ],
};

const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_ORIGIN}/#website`,
  name: studio.name,
  url: canonicalUrl("/"),
  description: studio.description,
  publisher: { "@id": `${SITE_ORIGIN}/#organization` },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white font-sans text-charcoal antialiased">
        <a className="skip-link font-display text-sm" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <SmartFab />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [organizationJsonLd, websiteJsonLd],
          }}
        />
      </body>
    </html>
  );
}
