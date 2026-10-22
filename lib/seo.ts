import type { Metadata } from "next";

/** Production origin: non-www, HTTPS, no trailing slash on the origin itself. */
export const SITE_ORIGIN = "https://archiloomstudio.com";

export type Crumb = {
  name: string;
  /** Path with leading slash; trailing slash optional (normalized). */
  path?: string;
};

/** Normalize a path to a site-relative trailing-slash URL (root stays `/`). */
export function withTrailingSlash(path = "/"): string {
  if (!path || path === "/") return "/";
  const clean = path.split("?")[0].split("#")[0];
  const prefixed = clean.startsWith("/") ? clean : `/${clean}`;
  return prefixed.endsWith("/") ? prefixed : `${prefixed}/`;
}

/** Absolute canonical URL for a path (always non-www + trailing slash). */
export function canonicalUrl(path = "/"): string {
  const normalized = withTrailingSlash(path);
  return normalized === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${normalized}`;
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  ogType?: "website" | "article";
}): Metadata {
  const url = canonicalUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Archiloom Studio",
      type: ogType,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  };
}

/** schema.org BreadcrumbList JSON-LD for the given trail (Home is prepended). */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: canonicalUrl("/"),
    },
    ...crumbs.map((crumb, index) => {
      const entry: Record<string, string | number> = {
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
      };
      if (crumb.path) entry.item = canonicalUrl(crumb.path);
      return entry;
    }),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}
