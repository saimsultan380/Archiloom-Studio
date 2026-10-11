import type { socialLinks } from "@/data/site";

type SocialName = (typeof socialLinks)[number];

export function SocialLogo({ name }: { name: SocialName }) {
  const common = "h-[18px] w-[18px] shrink-0";

  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <defs>
          <linearGradient id="ig" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#feda75" />
            <stop offset="0.3" stopColor="#fa7e1e" />
            <stop offset="0.6" stopColor="#d62976" />
            <stop offset="1" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig)" />
        <rect x="7" y="7" width="10" height="10" rx="5" fill="none" stroke="#fff" strokeWidth="1.7" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="#fff" />
      </svg>
    );
  }

  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <path
          fill="#0A66C2"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z"
        />
      </svg>
    );
  }

  if (name === "Behance") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <path
          fill="#1769ff"
          d="M8.1 11.3c.9-.4 1.5-1.2 1.5-2.2 0-1.9-1.5-3-3.7-3H1.2v12.2h4.9c2.4 0 4-1.2 4-3.4 0-1.5-.8-2.6-2-3.6zm-4.6-3.4h2.2c1 0 1.6.5 1.6 1.3s-.6 1.3-1.7 1.3H3.5V7.9zm2.5 7.6H3.5v-2.9h2.6c1.2 0 1.8.6 1.8 1.5s-.7 1.4-1.9 1.4zM15.2 6.4h5.2v1.5h-5.2V6.4zM19.8 13.4c-.3-1.5-1.5-2.5-3.2-2.5-2.2 0-3.7 1.6-3.7 4s1.5 4 3.8 4c1.6 0 2.8-.8 3.3-2.1h-1.8c-.3.5-.8.8-1.5.8-1 0-1.6-.5-1.8-1.4h5.1c.1-.3.1-.6.1-.8 0-.3 0-.5-.1-.8h-.2zm-5.1.6c.2-.9.9-1.4 1.8-1.4.9 0 1.5.5 1.7 1.4h-3.5z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden>
      <path
        fill="#ea4c89"
        d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.1 5.5a18.4 18.4 0 0 1-4.9 2.1 6.7 6.7 0 0 0-2.3-1.5 6.6 6.6 0 0 1 4.4 1.6 18.7 18.7 0 0 0 2.8-2.2zm-5.6 8.7a4.4 4.4 0 0 1-4.5 4.4 4.4 4.4 0 0 1-4.4-4.5c0-.2 0-.4.1-.6 1.3.3 2.6.4 3.9.2 1.2-.1 2.3-.5 3.3-1 .5.5 1.1.9 1.6 1.5zm-8.8-2.4c-.1.3-.2.6-.2.9a5.6 5.6 0 0 0 5.6 5.6c.7 0 1.4-.1 2-.4-1.2-1.1-2.1-2.5-2.6-4.1-1.6.1-3.2-.2-5-1.1l.2-.9zm1.2-6.3a5.6 5.6 0 0 0-2.5 4.6c1.7.8 3.4 1.1 5 .9A10.7 10.7 0 0 1 8.9 5.5zm6.4 2.6a8.6 8.6 0 0 1 2.3 1.5 16.6 16.6 0 0 1-5.4 2.4 9.4 9.4 0 0 0 1.6-4.2 5.5 5.5 0 0 0 1.5.3zm4.3 8.4a5.5 5.5 0 0 1-4.4 2.2c-.4 0-.8 0-1.2-.1 1.3-1 2.3-2.3 2.9-3.8a7.2 7.2 0 0 0 3.3-.2 5.6 5.6 0 0 1-.6 1.9z"
      />
    </svg>
  );
}
