import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionLabel({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "font-display text-[12.5px] font-semibold uppercase tracking-[0.12em]",
        tone === "dark" ? "text-white/65" : "text-n-700",
      )}
    >
      {label}
    </p>
  );
}

export function GreenBar() {
  return <span className="mt-4 block h-[3px] w-10 bg-signal" aria-hidden />;
}

export function SectionHeading({
  label,
  title,
  description,
  tone = "light",
  titleClassName,
}: {
  label: string;
  title: ReactNode;
  description?: string;
  tone?: "light" | "dark";
  titleClassName?: string;
}) {
  return (
    <div>
      <SectionLabel label={label} tone={tone} />
      <h2
        className={cn(
          "mt-4 font-display text-[clamp(32px,4vw,40px)] font-bold leading-[1.15] tracking-[-0.03em]",
          tone === "dark" ? "text-white" : "text-charcoal",
          titleClassName,
        )}
      >
        {title}
      </h2>
      <GreenBar />
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-[17px] leading-[1.6]",
            tone === "dark" ? "text-white/75" : "text-n-700",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
