import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Montserrat, Poppins } from "next/font/google";
import { studio } from "@/data/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

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
    "Outdoor construction",
    "Outdoor kitchens",
    "Concrete work",
    "Cabanas",
    "Artificial turf installation",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="bg-white font-sans text-charcoal antialiased">
        <a className="skip-link font-display text-sm" href="#main">
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
