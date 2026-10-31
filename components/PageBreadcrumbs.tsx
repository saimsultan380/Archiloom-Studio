import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

type PageBreadcrumbsProps = {
  items: Crumb[];
};

/** Emits BreadcrumbList JSON-LD only — no visible trail in the hero. */
export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  return <JsonLd data={breadcrumbJsonLd(items)} />;
}
