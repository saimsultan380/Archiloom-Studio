import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  tone?: "light" | "dark";
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaExpanded?: boolean;
};

export function Button({
  children,
  variant = "primary",
  tone = "light",
  className,
  href,
  type = "button",
  onClick,
  disabled,
  ariaExpanded,
}: ButtonProps) {
  const classes = cn(
    "btn group/btn relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-[7px] px-5 py-2.5 font-display text-[13px] font-semibold tracking-[0.04em] transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
    variant === "primary" && "bg-action text-charcoal shadow-none hover:bg-[#ffd36e] hover:shadow-[0_12px_28px_rgba(255,200,87,0.38)]",
    variant === "secondary" &&
      tone === "light" &&
      "border border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-white hover:shadow-[0_10px_24px_rgba(29,29,29,0.12)]",
    variant === "secondary" &&
      tone === "dark" &&
      "border border-white bg-transparent text-white hover:bg-white hover:text-charcoal hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
    className,
  );
  const label = (
    <>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" strokeWidth={1.75} aria-hidden />
    </>
  );
  const aria = ariaExpanded === undefined ? {} : { "aria-expanded": ariaExpanded };

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...aria}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...aria}>
      {label}
    </button>
  );
}
