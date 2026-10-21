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
  /** Video URL, or a .gif/.webp completion loop. Empty until the client sends media. */
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

function project(input: {
  id: string;
  name: string;
  category: Exclude<ProjectCategory, "All">;
  location: string;
  timeline?: string;
  summary: string;
  brief: string;
  prefix: string;
  cover: number;
  frameFrom: number;
  frameTo: number;
  video?: Partial<ProjectVideo>;
  sourceNote?: string;
}): Project {
  const cover = String(input.cover).padStart(2, "0");
  const image = `/images/${input.prefix}-${cover}.webp`;
  return {
    id: input.id,
    name: input.name,
    category: input.category,
    location: input.location,
    timeline: input.timeline ?? "2023 — 2025",
    summary: input.summary,
    brief: input.brief,
    image,
    imageAlt: `${input.name} — project cover`,
    frames: numberedFrames(input.prefix, input.frameFrom, input.frameTo, input.name),
    video: {
      src: "",
      poster: image,
      label: "Completion video — forthcoming",
      ...input.video,
    },
    sourceNote: input.sourceNote ?? "",
    placeholder: false,
  };
}

/**
 * Live client projects from attached packs in /public.
 * Cover is hero/index; gallery frames never repeat the cover.
 */
export const projects: Project[] = [
  project({
    id: "masala-pizza-schaumburg",
    name: "Masala Pizza",
    category: "Commercial",
    location: "Schaumburg, IL, USA",
    timeline: "2024 — 2025",
    summary:
      "A fast-casual Indian pizza restaurant fit-out for Schaumburg — warm, open and built for speed of service.",
    brief:
      "A compact commercial interior that carries South Asian flavour into a clear pizza concept: open prep, easy seating and a room that feels welcoming from the entrance.",
    prefix: "masala",
    cover: 1,
    frameFrom: 2,
    frameTo: 10,
    video: {
      src: "/images/masala-completion.webp",
      poster: "/images/masala-01.webp",
      label: "Completion loop",
      kind: "gif",
    },
  }),
  project({
    id: "masala-pizza-chicago",
    name: "Masala Pizza Chicago",
    category: "Commercial",
    location: "Chicago, USA",
    timeline: "2024 — 2025",
    summary:
      "A second Masala Pizza location in Chicago — the same brand energy with a plan tuned to a denser urban footprint.",
    brief:
      "Counter, dining and kitchen zones are organised for peak service while keeping the room warm and clearly branded from the entrance.",
    prefix: "masala-chicago",
    cover: 1,
    frameFrom: 2,
    frameTo: 8,
  }),
  project({
    id: "finish-line-haircuts",
    name: "Finish Line Haircuts",
    category: "Interior",
    location: "USA",
    timeline: "2023 — 2024",
    summary:
      "A high-energy haircut shop inspired by car racing — an immersive interior that borrows the thrill and speed of motorsports.",
    brief:
      "The concept turns a neighborhood cut shop into a race-day pit stop: dark shell, red accents, mirrored stations and lighting that feels fast without shouting.",
    prefix: "finish-line",
    cover: 1,
    frameFrom: 2,
    frameTo: 7,
    video: {
      src: "/images/finish-line-completion.webp",
      poster: "/images/finish-line-01.webp",
      label: "Completion loop",
      kind: "gif",
    },
  }),
  project({
    id: "cinnabon",
    name: "Cinnabon",
    category: "Commercial",
    location: "Lahore, Pakistan",
    timeline: "2024 — 2025",
    summary:
      "A Cinnabon retail interior organised around the bake counter, display and a compact guest area.",
    brief:
      "Material and lighting support the brand moment at the counter while keeping circulation clear for queue service.",
    prefix: "cinnabon",
    cover: 1,
    frameFrom: 2,
    frameTo: 11,
  }),
  project({
    id: "seven-leaves-cafe",
    name: "7 Leaves Cafe",
    category: "Commercial",
    location: "San Francisco, CA, USA",
    timeline: "2021 — 2022",
    summary:
      "A 7 Leaves Cafe interior for San Francisco — calm seating, clear service flow and a light, open room.",
    brief:
      "The fit-out balances brand warmth with a practical queue-to-pickup path suited to a busy urban café.",
    prefix: "seven-leaves",
    cover: 1,
    frameFrom: 2,
    frameTo: 6,
  }),
  project({
    id: "nouveau-bar",
    name: "Nouveau Restaurant & Bar",
    category: "Commercial",
    location: "Texas, USA",
    timeline: "2023 — 2024",
    summary:
      "A restaurant and bar interior with layered lighting, defined dining zones and a strong evening atmosphere.",
    brief:
      "Seating, bar and service paths are planned for both daytime dining and night energy without losing clarity.",
    prefix: "nouveau",
    cover: 1,
    frameFrom: 2,
    frameTo: 12,
    video: {
      src: "/images/nouveau-completion.webp",
      poster: "/images/nouveau-01.webp",
      label: "Completion loop",
      kind: "gif",
    },
  }),
  project({
    id: "pressed-juicery",
    name: "Pressed Juicery",
    category: "Commercial",
    location: "USA",
    timeline: "2023 — 2024",
    summary:
      "A clean, bright Pressed Juicery interior focused on the juice bar, display and quick guest turnover.",
    brief:
      "Finishes stay light and fresh so the brand product stays the hero from entrance through pickup.",
    prefix: "pressed",
    cover: 1,
    frameFrom: 2,
    frameTo: 5,
  }),
  project({
    id: "tacotarian",
    name: "Tacotarian",
    category: "Commercial",
    location: "USA",
    timeline: "2024 — 2025",
    summary:
      "A plant-forward taco café interior with bold colour, clear ordering and a lively dining edge.",
    brief:
      "The room is built for speed of service while keeping enough presence for guests who stay to eat.",
    prefix: "tacotarian",
    cover: 1,
    frameFrom: 2,
    frameTo: 7,
  }),
  project({
    id: "take-burger",
    name: "Take Burger",
    category: "Commercial",
    location: "USA",
    timeline: "2024 — 2025",
    summary:
      "A burger restaurant interior built for speed of service — bold finishes, clear queueing and an open kitchen edge.",
    brief:
      "The room balances high-energy brand cues with a practical plan for orders, pickup and short-stay dining.",
    prefix: "take-burger",
    cover: 1,
    frameFrom: 2,
    frameTo: 10,
    video: {
      src: "/images/take-burger-completion.webp",
      poster: "/images/take-burger-01.webp",
      label: "Completion loop",
      kind: "gif",
    },
  }),
  project({
    id: "odoe-desserts",
    name: "Odoe Desserts",
    category: "Commercial",
    location: "USA",
    timeline: "2024 — 2025",
    summary:
      "A dessert café fit-out with a clear service counter, soft seating and a bright, inviting room for quick visits.",
    brief:
      "The design keeps the counter as the focus, with warm finishes and open sightlines so the space reads cleanly from entry through seating.",
    prefix: "odoe",
    cover: 1,
    frameFrom: 2,
    frameTo: 14,
  }),
  project({
    id: "barrett-jackson",
    name: "Barrett-Jackson",
    category: "Commercial",
    location: "USA",
    timeline: "2022 — 2023",
    summary:
      "A Barrett-Jackson retail store interior that carries auction-house energy into product display and brand storytelling.",
    brief:
      "Circulation, merchandising and feature walls are organised so the brand feels collectible without crowding the floor.",
    prefix: "barrett-jackson",
    cover: 1,
    frameFrom: 2,
    frameTo: 9,
  }),
  project({
    id: "tonino-lamborghini",
    name: "Tonino Lamborghini",
    category: "Commercial",
    location: "Tokyo, Japan",
    timeline: "2023 — 2024",
    summary:
      "A Tonino Lamborghini shop interior in Tokyo — precise, premium and tuned for product focus.",
    brief:
      "Dark, high-contrast finishes and controlled lighting put the merchandise first while keeping the room elegant and clear.",
    prefix: "lamborghini",
    cover: 1,
    frameFrom: 2,
    frameTo: 7,
  }),
  project({
    id: "chaos-karts",
    name: "Chaos Karts",
    category: "Commercial",
    location: "Dubai, UAE",
    timeline: "2023 — 2024",
    summary:
      "An entertainment interior for Chaos Karts in Dubai — high-energy zones for play, waiting and brand immersion.",
    brief:
      "The renovation layers bold graphics, durable finishes and clear guest flow for a fast, social venue.",
    prefix: "chaos-karts",
    cover: 1,
    frameFrom: 2,
    frameTo: 12,
  }),
  project({
    id: "e-outdoors",
    name: "E-Outdoors",
    category: "Commercial",
    location: "Canada",
    timeline: "2023 — 2024",
    summary:
      "An outdoor retail store interior in Canada — rugged product stories with clear aisles and feature display.",
    brief:
      "Fixtures and lighting support seasonal merchandising while keeping the brand atmosphere outdoorsy and practical.",
    prefix: "e-outdoors",
    cover: 1,
    frameFrom: 2,
    frameTo: 8,
    video: {
      src: "/images/e-outdoors-completion.webp",
      poster: "/images/e-outdoors-01.webp",
      label: "Completion loop",
      kind: "gif",
    },
  }),
  project({
    id: "tech-station",
    name: "Tech Station",
    category: "Commercial",
    location: "Riyadh, KSA",
    timeline: "2023 — 2024",
    summary:
      "A Tech Station retail interior in Riyadh — crisp product walls, demo zones and a modern service counter.",
    brief:
      "The plan supports browsing and assisted selling with clean sightlines and a strong opening-day brand presence.",
    prefix: "tech-station",
    cover: 1,
    frameFrom: 2,
    frameTo: 6,
    video: {
      src: "/images/tech-station-video.mp4",
      poster: "/images/tech-station-01.webp",
      label: "Opening day film",
      kind: "video",
    },
  }),
  project({
    id: "cutbox",
    name: "Cutbox",
    category: "Interior",
    location: "London, UK",
    timeline: "2023 — 2024",
    summary:
      "A Cutbox store interior in London — a focused beauty-retail room with strong brand graphics and clear circulation.",
    brief:
      "Display, service and fitting zones are kept efficient so the brand moment stays sharp in a compact footprint.",
    prefix: "cutbox",
    cover: 1,
    frameFrom: 2,
    frameTo: 6,
  }),
  project({
    id: "ramsar-salon",
    name: "Ramsar Salon",
    category: "Interior",
    location: "Hong Kong",
    timeline: "2023 — 2024",
    summary:
      "A Ramsar salon interior in Hong Kong — calm stations, refined materials and a soft, polished guest journey.",
    brief:
      "Lighting and finishes support cut, colour and wait zones while keeping the room quiet and premium.",
    prefix: "ramsar",
    cover: 1,
    frameFrom: 2,
    frameTo: 11,
  }),
  project({
    id: "logipoint",
    name: "Logipoint Office",
    category: "Interior",
    location: "KSA",
    timeline: "2023 — 2024",
    summary:
      "A Logipoint office interior — open work areas, meeting rooms and a clear corporate identity throughout.",
    brief:
      "The workplace plan balances collaboration and focus with durable finishes suited to daily operations.",
    prefix: "logipoint",
    cover: 1,
    frameFrom: 2,
    frameTo: 12,
  }),
  project({
    id: "bin-yaber",
    name: "Bin Yaber Driving",
    category: "Interior",
    location: "UAE",
    timeline: "2024 — 2025",
    summary:
      "A Bin Yaber driving-school interior in the UAE — reception, training and waiting spaces with a clear brand path.",
    brief:
      "The fit-out supports student flow and staff operations while keeping the room welcoming and organised.",
    prefix: "bin-yaber",
    cover: 1,
    frameFrom: 2,
    frameTo: 7,
  }),
  project({
    id: "bin-yaber-02",
    name: "Bin Yaber Driving 02",
    category: "Interior",
    location: "UAE",
    timeline: "2024 — 2025",
    summary:
      "A second Bin Yaber driving interior — updated planning for reception, briefing and student waiting.",
    brief:
      "Layouts and finishes stay consistent with the brand while refining circulation for a busier site.",
    prefix: "bin-yaber-02",
    cover: 1,
    frameFrom: 2,
    frameTo: 8,
  }),
  project({
    id: "flavoursrest",
    name: "Flavoursrest Building",
    category: "Architecture",
    location: "Canada",
    timeline: "2023 — 2024",
    summary:
      "An exterior and site concept for Flavoursrest — restaurant architecture with a strong street presence.",
    brief:
      "Massing, facade and approach are composed so the building reads clearly as a destination from the street.",
    prefix: "flavoursrest",
    cover: 1,
    frameFrom: 2,
    frameTo: 7,
  }),
  project({
    id: "naache-commons",
    name: "Naache Commons",
    category: "Architecture",
    location: "Canada",
    timeline: "2023 — 2024",
    summary:
      "A multipurpose site concept for Naache Commons — exterior massing and context views for a commercial site.",
    brief:
      "The studies explore approach, facade rhythm and site presence for a mixed commercial location.",
    prefix: "naache",
    cover: 1,
    frameFrom: 2,
    frameTo: 8,
  }),
];
