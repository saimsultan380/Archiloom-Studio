import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, withTrailingSlash, type Crumb } from "@/lib/seo";

type PageBreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

export function PageBreadcrumbs({ items, className }: PageBreadcrumbsProps) {
  const trail = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[11px] font-semibold tracking-[0.12em] text-n-500 uppercase">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={`${item.name}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden className="text-n-300">/</span> : null}
                {isLast || !item.path ? (
                  <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-charcoal" : undefined}>
                    {item.name}
                  </span>
                ) : (
                  <Link href={withTrailingSlash(item.path)} className="transition-colors hover:text-charcoal">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
