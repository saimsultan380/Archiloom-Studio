export const projectFilters = [
  "All",
  "Architecture",
  "Interior",
  "Visualization",
  "Commercial",
] as const;

export type ProjectCategory = (typeof projectFilters)[number];

export type ProjectFrame = {
  src: string;
  alt: string;
};

export type ProjectVideo = {
  /** Video URL, or a .gif completion loop. Empty until the client sends media. */
  src: string;
  poster: string;
  label: string;
  /** Use "gif" for animated completion loops (rendered as an image, not a video tag). */
  kind?: "video" | "gif";
};

export type Project = {
  id: string;
  name: string;
  category: Exclude<ProjectCategory, "All">;
  location: string;
  timeline: string;
  summary: string;
  brief: string;
  image: string;
  imageAlt: string;
  frames: ProjectFrame[];
  video: ProjectVideo;
  sourceNote: string;
  placeholder: boolean;
};

function numberedFrames(prefix: string, from: number, to: number, label: string): ProjectFrame[] {
  const frames: ProjectFrame[] = [];
  for (let n = from; n <= to; n += 1) {
    const id = String(n).padStart(2, "0");
    frames.push({
      src: `/images/${prefix}-${id}.webp`,
      alt: `${label} — view ${n - from + 1}`,
    });
  }
  return frames;
}

/**
 * Live client projects only. Cover is hero/index; gallery frames never repeat the cover.
 * Completion GIF is separate from the gallery scroll.
 */
export const projects: Project[] = [
  {
    id: "masala-pizza-schaumburg",
    name: "Masala Pizza",
    category: "Commercial",
    location: "Schaumburg, IL, USA",
    timeline: "2024 — 2025",
    summary:
      "A fast-casual Indian pizza restaurant fit-out for Schaumburg — warm, open and built for speed of service.",
    brief:
      "A compact commercial interior that carries South Asian flavour into a clear pizza concept: open prep, easy seating and a room that feels welcoming from the entrance.",
    image: "/images/masala-01.webp",
    imageAlt: "Masala Pizza — project cover",
    frames: numberedFrames("masala", 2, 7, "Masala Pizza"),
    video: {
      src: "/images/masala-completion.webp",
      poster: "/images/masala-01.webp",
      label: "Completion loop",
      kind: "gif",
    },
    sourceNote: "",
    placeholder: false,
  },
  {
    id: "finish-line-haircuts",
    name: "Finish Line Haircuts",
    category: "Interior",
    location: "Los Angeles, USA",
    timeline: "2023 — 2024",
    summary:
      "A high-energy haircut shop inspired by car racing — an immersive interior that borrows the thrill and speed of motorsports.",
    brief:
      "The concept turns a neighborhood cut shop into a race-day pit stop: dark shell, red accents, mirrored stations and lighting that feels fast without shouting.",
    image: "/images/finish-line-01.webp",
    imageAlt: "Finish Line Haircuts — project cover",
    frames: numberedFrames("finish-line", 2, 7, "Finish Line Haircuts"),
    video: {
      src: "/images/finish-line-completion.webp",
      poster: "/images/finish-line-01.webp",
      label: "Completion loop",
      kind: "gif",
    },
    sourceNote: "",
    placeholder: false,
  },
  {
    id: "odoe-desserts",
    name: "Odoe Desserts",
    category: "Commercial",
    location: "USA",
    timeline: "2024 — 2025",
    summary:
      "A dessert café fit-out with a clear service counter, soft seating and a bright, inviting room for quick visits.",
    brief:
      "The design keeps the counter as the focus, with warm finishes and open sightlines so the space reads cleanly from entry through seating.",
    image: "/images/odoe-01.webp",
    imageAlt: "Odoe Desserts — project cover",
    frames: numberedFrames("odoe", 2, 14, "Odoe Desserts"),
    video: {
      src: "",
      poster: "/images/odoe-02.webp",
      label: "Completion video — forthcoming",
    },
    sourceNote: "",
    placeholder: false,
  },
  {
    id: "cinnabon",
    name: "Cinnabon",
    category: "Commercial",
    location: "USA",
    timeline: "2024 — 2025",
    summary:
      "A Cinnabon retail interior organised around the bake counter, display and a compact guest area.",
    brief:
      "Material and lighting support the brand moment at the counter while keeping circulation clear for queue service.",
    image: "/images/cinnabon-01.webp",
    imageAlt: "Cinnabon — project cover",
    frames: numberedFrames("cinnabon", 2, 11, "Cinnabon"),
    video: {
      src: "",
      poster: "/images/cinnabon-02.webp",
      label: "Completion video — forthcoming",
    },
    sourceNote: "",
    placeholder: false,
  },
  {
    id: "take-burger",
    name: "Take Burger",
    category: "Commercial",
    location: "USA",
    timeline: "2024 — 2025",
    summary:
      "A burger restaurant interior built for speed of service — bold finishes, clear queueing and an open kitchen edge.",
    brief:
      "The room balances high-energy brand cues with a practical plan for orders, pickup and short-stay dining.",
    image: "/images/take-burger-01.webp",
    imageAlt: "Take Burger — project cover",
    frames: numberedFrames("take-burger", 2, 10, "Take Burger"),
    video: {
      src: "/images/take-burger-completion.webp",
      poster: "/images/take-burger-01.webp",
      label: "Completion loop",
      kind: "gif",
    },
    sourceNote: "",
    placeholder: false,
  },
  {
    id: "bin-yaber",
    name: "Bin Yaber",
    category: "Commercial",
    location: "USA",
    timeline: "2024 — 2025",
    summary:
      "A restaurant fit-out with a strong dining atmosphere — layered lighting, defined seating and a clear service path.",
    brief:
      "The interior focuses on guest comfort and brand presence through finish, lighting and a plan that supports both dining and service flow.",
    image: "/images/bin-yaber-01.webp",
    imageAlt: "Bin Yaber — project cover",
    frames: numberedFrames("bin-yaber", 2, 7, "Bin Yaber"),
    video: {
      src: "",
      poster: "/images/bin-yaber-02.webp",
      label: "Completion video — forthcoming",
    },
    sourceNote: "",
    placeholder: false,
  },
];
