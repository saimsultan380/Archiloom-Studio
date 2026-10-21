import Image from "next/image";
import { cn } from "@/lib/cn";

type ClientLogoProps = {
  id: string;
  name: string;
  logo?: string;
  className?: string;
};

export function ClientLogo({ name, logo, className }: ClientLogoProps) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={name}
        width={200}
        height={64}
        className={cn(
          "h-9 w-auto max-w-[150px] object-contain opacity-85 transition-opacity duration-300 group-hover:opacity-100 sm:h-10 sm:max-w-[168px]",
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
