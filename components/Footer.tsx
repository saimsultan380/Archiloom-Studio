"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { sitemapLinks, socialLinks, studio } from "@/data/site";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { MapBackdrop } from "@/components/MapBackdrop";
import { Logo } from "@/components/Logo";
import { Modal } from "@/components/Modal";
import { SocialLogo } from "@/components/SocialLogo";
import type { MouseEvent, ReactNode } from "react";

function FooterLink({
  href,
  children,
  mark,
  className,
  onClick,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: ReactNode;
  mark?: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
}) {
  return (
    <a href={href} onClick={onClick} aria-label={ariaLabel} className={`footer-item ${className ?? ""}`}>
      {mark}
      <span className="footer-link-label">{children}</span>
    </a>
  );
}

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-charcoal text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <MapBackdrop place="left" />
      <div className="relative mx-auto w-full max-w-[1280px] px-6 pt-16 md:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.16em] text-white/65 uppercase">
              <span className="hidden h-[3px] w-10 bg-signal sm:block" aria-hidden />
              Archiloom Studio
            </p>
            <p className="mt-5 font-display text-[clamp(36px,5vw,64px)] font-bold leading-[0.95] tracking-[-0.04em]">
              Designing a better <span className="title-accent">tomorrow</span>, space by space.
            </p>
          </div>
          <Button href="#contact">Start a Project</Button>
        </div>
        <div className="grid gap-12 py-12 lg:grid-cols-12">
          <div className="text-left lg:col-span-3">
            <h3 className="footer-heading">Studio</h3>
            <div className="mt-5 flex flex-nowrap items-center gap-x-3 lg:flex-col lg:items-start lg:gap-4">
              <FooterLink
                href={`mailto:${studio.email}`}
                className="whitespace-nowrap text-[clamp(11px,2.85vw,15px)] lg:text-[15px]"
                mark={<Icon name="consulting" size={16} className="shrink-0 text-signal" />}
              >
                {studio.email}
              </FooterLink>
              <FooterLink
                href={studio.websiteUrl}
                className="whitespace-nowrap text-[clamp(11px,2.85vw,15px)] lg:text-[15px]"
                mark={<Icon name="global" size={16} className="shrink-0 text-signal" />}
              >
                {studio.website}
              </FooterLink>
            </div>
            <p className="mt-8 font-display text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase">
              Registered address
            </p>
            <p className="mt-3 text-[15px] text-white/75">Forthcoming</p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:contents">
            <div className="lg:col-span-2">
              <h3 className="footer-heading">Explore</h3>
              <ul className="mt-4 space-y-2">
                {sitemapLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h3 className="footer-heading">Follow</h3>
              <ul className="mt-4 space-y-2">
                {socialLinks.map((label) => (
                  <li key={label}>
                    <FooterLink
                      href={`#social-${label.toLowerCase()}`}
                      onClick={(event) => event.preventDefault()}
                      aria-label={`${label}, link forthcoming`}
                      mark={<SocialLogo name={label} />}
                    >
                      {label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5">
            <h3 className="footer-heading">Services</h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.id}>
                  <FooterLink href={`#${service.id}`} className="text-[14px] leading-snug">
                    {service.title}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <Logo />
          <p className="text-sm text-white/70">
            © 2026 Archiloom Studio
            <span className="mt-1 block md:ml-3 md:mt-0 md:inline">{studio.tagline}</span>
          </p>
          <button
            type="button"
            onClick={() => setPrivacyOpen(true)}
            className="footer-item self-start font-display text-sm font-semibold md:self-auto"
          >
            <span className="footer-link-label">Privacy</span>
          </button>
        </div>
      </div>
      <p
        aria-hidden
        className="footer-name pointer-events-none relative -mb-[0.18em] w-full max-w-full px-1 text-center font-display text-[14.2vw] leading-[0.85] font-bold tracking-[-0.075em] select-none sm:px-3 sm:text-[clamp(72px,17.5vw,228px)] sm:tracking-[-0.08em]"
      >
        ARCHILOOM
      </p>
      <Modal open={privacyOpen} title="Privacy" onClose={() => setPrivacyOpen(false)}>
        <p className="text-[16px] leading-[1.6]">
          This design draft does not publish a legal privacy policy. Notes typed into the contact form are validated in the browser and are not stored or emailed.
        </p>
      </Modal>
    </footer>
  );
}
