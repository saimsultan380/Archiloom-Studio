export type ClientMark = {
  id: string;
  name: string;
  /** Optional optimized logo under /public/clients. Falls back to wordmark. */
  logo?: string;
};

/** Client roster for Our Clients + hero marquee. */
export const clients: ClientMark[] = [
  { id: "tonino-lamborghini", name: "Tonino Lamborghini", logo: "/clients/tonino-lamborghini.webp" },
  { id: "barrett-jackson", name: "Barrett-Jackson", logo: "/clients/barrett-jackson.webp" },
  { id: "masala-pizza", name: "Masala Pizza", logo: "/clients/masala-pizza.webp" },
  { id: "cinnabon", name: "Cinnabon", logo: "/clients/cinnabon.webp" },
  { id: "seven-leaves", name: "7 Leaves Cafe", logo: "/clients/seven-leaves.webp" },
  { id: "chaos-karts", name: "Chaos Karts", logo: "/clients/chaos-karts.webp" },
  { id: "hardrock", name: "Hard Rock", logo: "/clients/hardrock.webp" },
  { id: "bin-yaber", name: "Bin Yaber", logo: "/clients/bin-yaber.webp" },
  { id: "logipoint", name: "Logipoint", logo: "/clients/logipoint.webp" },
  { id: "pressed-juicery", name: "Pressed Juicery", logo: "/clients/pressed-juicery.webp" },
  { id: "jenjudan", name: "Jenjudan Bubble Tea", logo: "/clients/jenjudan.webp" },
  { id: "finish-line-wide", name: "Finish Line", logo: "/clients/finish-line-wide.webp" },
  { id: "rosatis", name: "Rosati's Chicago Pizza", logo: "/clients/rosatis.webp" },
  { id: "bologna", name: "Bologna Fresh Pasta", logo: "/clients/bologna.webp" },
  { id: "edgewater", name: "Edgewater Ice Cream", logo: "/clients/edgewater.webp" },
  { id: "take-burger", name: "Take Burger", logo: "/clients/take-burger.webp" },
  { id: "maryland-chicken", name: "Maryland Chicken", logo: "/clients/maryland-chicken.webp" },
  { id: "baby-cafe", name: "Baby Café", logo: "/clients/baby-cafe.webp" },
  { id: "dei-coltelli", name: "dei Coltelli", logo: "/clients/dei-coltelli.webp" },
  { id: "z-outdoors", name: "Z Outdoors", logo: "/clients/z-outdoors.webp" },
  { id: "recovapro", name: "Recova Pro", logo: "/clients/recovapro.webp" },
  { id: "yuri-essence", name: "Yuri Essence", logo: "/clients/yuri-essence.webp" },
  { id: "violet-and-ivvy-wordmark", name: "Violet and Ivvy", logo: "/clients/violet-and-ivvy-wordmark.webp" },
  { id: "kinetic-design", name: "Kinetic Design", logo: "/clients/kinetic-design.webp" },
  { id: "intelligent-horizon", name: "Intelligent Horizon", logo: "/clients/intelligent-horizon.webp" },
  { id: "efreez", name: "Efreez", logo: "/clients/efreez.webp" },
  { id: "merchant-architecture", name: "Merchant Architecture", logo: "/clients/merchant-architecture.webp" },
  { id: "knoll-miller", name: "Knoll Miller Architects", logo: "/clients/knoll-miller.webp" },
  { id: "boardwalk-billys", name: "Boardwalk Billys", logo: "/clients/boardwalk-billys.webp" },
  { id: "tech-station", name: "Tech Station", logo: "/clients/tech-station.webp" },
];

export const marqueeClients = clients.filter((client) => client.logo);
