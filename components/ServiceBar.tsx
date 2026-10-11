import { ArrowRight } from "lucide-react";
import { serviceBar } from "@/data/services";
import { Icon } from "@/components/Icon";

export function ServiceBar() {
  return (
    <nav aria-label="Services" className="border-y border-n-300 bg-white">
      <ul className="mx-auto grid w-full max-w-[1280px] grid-cols-2 lg:grid-cols-4">
        {serviceBar.map((item) => (
          <li
            key={item.href}
            className="border-r border-b border-n-300 [&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
          >
            <a
              href={item.href}
              className="group flex h-full min-h-[88px] items-center gap-3 px-4 py-4 transition-colors duration-300 hover:bg-n-100 sm:gap-4 sm:px-6"
            >
              <Icon name={item.icon} className="shrink-0 text-charcoal transition-colors duration-300 group-hover:text-signal" />
              <span className="font-display text-[12px] font-semibold leading-snug tracking-[0.01em] text-charcoal sm:text-[13px]">
                {item.label}
              </span>
              <ArrowRight
                className="ml-auto h-4 w-4 shrink-0 text-charcoal transition-transform duration-500 ease-out group-hover:translate-x-1"
                strokeWidth={1.75}
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
