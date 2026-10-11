import Image from "next/image";

export function Logo({ animate = false }: { animate?: boolean }) {
  return (
    <span className="relative inline-flex h-10 w-[132px] shrink-0 items-center">
      <Image
        src="/brand/logo-white.png"
        alt="Archiloom Studio"
        width={405}
        height={123}
        priority={animate}
        className={animate ? "logo-reveal h-10 w-[132px]" : "h-10 w-[132px]"}
      />
    </span>
  );
}
