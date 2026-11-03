import Image from "next/image";
import { cn } from "@/lib/cn";

type ClientLogoProps = {
  id: string;
  name: string;
  logo?: string;
  mono?: boolean;
  className?: string;
};

export function ClientLogo({ name, logo, mono = false, className }: ClientLogoProps) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={name}
        width={200}
        height={64}
        className={cn(
          "h-9 w-auto max-w-[150px] object-contain transition-[filter,opacity] duration-300 sm:h-10 sm:max-w-[168px]",
          mono
            ? "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-focus-within:grayscale-0 group-focus-within:opacity-100"
            : "opacity-85 group-hover:opacity-100",
          className,
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "block max-w-[168px] text-center font-display text-[11px] leading-tight font-semibold tracking-[0.12em] text-n-500 uppercase transition-colors duration-300 group-hover:text-charcoal sm:text-[12px]",
        className,
      )}
    >
      {name}
    </span>
  );
}
