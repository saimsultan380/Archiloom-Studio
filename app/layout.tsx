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
import { SmartFab } from "@/components/SmartFab";
import { studio } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(studio.websiteUrl),
  title: studio.title,
  description: studio.description,
  applicationName: studio.name,
  openGraph: {
    title: studio.title,
    description: studio.description,
    url: studio.websiteUrl,
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
};

export const viewport: Viewport = {
  themeColor: "#1D1D1D",
  width: "device-width",
  initialScale: 1,
  colorScheme: "only light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: studio.name,
  description: studio.description,
  url: studio.websiteUrl,
  email: studio.email,
  areaServed: "Worldwide",
  slogan: studio.tagline,
  serviceType: [
    "Architecture design",
    "Interior design",
    "Building permit drafting",
    "3D visualization",
    "Architectural animation",
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
