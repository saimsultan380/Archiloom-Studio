export type ClientMark = {
  id: string;
  name: string;
  /** Optional optimized logo under /public/clients. Falls back to wordmark. */
  logo?: string;
};

/** Confirmed client roster. Logos added as provided; remaining use wordmarks. */
export const clients: ClientMark[] = [
  { id: "tonino-lamborghini", name: "Tonino Lamborghini", logo: "/clients/tonino-lamborghini.webp" },
  { id: "barrett-jackson", name: "Barrett-Jackson", logo: "/clients/barrett-jackson.webp" },
  { id: "masala-pizza", name: "Masala Pizza", logo: "/clients/masala-pizza.webp" },
  { id: "cinnabon", name: "Cinnabon", logo: "/clients/cinnabon.webp" },
  { id: "seven-leaves", name: "7 Leaves Cafe", logo: "/clients/seven-leaves.webp" },
  { id: "pressed-juicery", name: "Pressed Juicery" },
  { id: "pro-corner", name: "Pro Corner" },
  { id: "boardwalk-billys", name: "Boardwalk Billys", logo: "/clients/boardwalk-billys.webp" },
  { id: "korean-bbq", name: "Korean BBQ" },
  { id: "chaos-karts", name: "Chaos Karts", logo: "/clients/chaos-karts.webp" },
  { id: "hardrock", name: "Hard Rock", logo: "/clients/hardrock.webp" },
  { id: "jenjudan", name: "Jenjudan Bubble Tea" },
  { id: "finish-line", name: "Finish Line", logo: "/clients/finish-line.webp" },
  { id: "bin-yaber", name: "Bin Yaber", logo: "/clients/bin-yaber.webp" },
  { id: "logipoint", name: "Logipoint", logo: "/clients/logipoint.webp" },
];

export const marqueeClients = clients.filter((client) => client.logo).slice(0, 8);
