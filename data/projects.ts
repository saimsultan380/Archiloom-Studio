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
  /** YouTube / Vimeo / hosted URL. Empty until the client sends the completion video. */
  src: string;
  poster: string;
  label: string;
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
  /** Draft content until client photography and videos arrive. */
  placeholder: true;
};

/**
 * Cover is only used for the index card + page hero (not repeated in the gallery).
 * Gallery frames are unique per project and never reuse another project’s images.
 * Video poster uses a dedicated frame that is also not in the gallery scroll.
 * Finish Line + Masala seeded from Behance: https://www.behance.net/zahidnaveed
 */
export const projects: Project[] = [
  {
    id: "finish-line-haircuts",
    name: "Finish Line Haircuts",
    category: "Interior",
    location: "Los Angeles, USA",
    timeline: "2023 — 2024",
    summary:
      "A high-energy haircut shop inspired by car racing — an immersive interior that borrows the thrill and speed of motorsports.",
    brief:
      "The concept turns a neighborhood cut shop into a race-day pit stop: dark shell, red accents, mirrored stations and lighting that feels fast without shouting. Layout, material and brand cues stay coordinated so the room reads as one idea from the street through to the chair.",
    image: "/images/finish-line-exterior.jpg",
    imageAlt: "Racing-inspired haircut shop storefront at dusk",
    frames: [
      { src: "/images/finish-line-salon.jpg", alt: "Salon floor with racing stripe lighting and barber stations" },
      { src: "/images/finish-line-detail.jpg", alt: "Detail of a barber station with chrome and red accents" },
    ],
    video: {
      src: "",
      poster: "/images/finish-line-waiting.jpg",
      label: "Completion video — forthcoming",
    },
    sourceNote: "Draft from Behance: Finish Line Haircuts — LA, USA. Replace images and video when the client sends the raw set.",
    placeholder: true,
  },
  {
    id: "masala-pizza-schaumburg",
    name: "Masala Pizza",
    category: "Commercial",
    location: "Schaumburg, IL, USA",
    timeline: "2024 — 2025",
    summary:
      "A fast-casual Indian pizza restaurant fit-out for Schaumburg — warm, open and built for speed of service.",
    brief:
      "The brief is a compact commercial interior that carries South Asian flavour into a clear pizza concept: open prep, easy seating and a room that feels welcoming from the entrance. Draft layout notes hold until the client sends drawings, finishes and the completion film.",
    image: "/images/masala-exterior.jpg",
    imageAlt: "Masala Pizza restaurant exterior at golden hour",
    frames: [
      { src: "/images/masala-dining.jpg", alt: "Dining room with booth seating and soft pendants" },
      { src: "/images/masala-counter.jpg", alt: "Service counter and pizza prep area" },
    ],
    video: {
      src: "",
      poster: "/images/masala-prep.jpg",
      label: "Completion video — forthcoming",
    },
    sourceNote: "Draft from Behance profile listing: Masala Pizza — Schaumburg, IL, USA. Replace assets when the client sends the raw project.",
    placeholder: true,
  },
  {
    id: "northline-residence",
    name: "Northline Residence",
    category: "Architecture",
    location: "Islamabad, Pakistan",
    timeline: "2022 — 2023",
    summary:
      "A courtyard house study: long elevations, a quiet plan, and daylight held between two wings.",
    brief:
      "Two pale wings frame a shared court so living spaces look inward to light and planting. Simple massing, deep reveals and a calm material palette keep the house readable from the street and private inside.",
    image: "/images/courtyard-house.jpg",
    imageAlt: "Low courtyard house in pale concrete and timber",
    frames: [{ src: "/images/northline-court.jpg", alt: "Courtyard looking toward a long glazed wing" }],
    video: {
      src: "",
      poster: "/images/outdoor-terrace.jpg",
      label: "Completion video — forthcoming",
    },
    sourceNote: "Draft study for layout. Replace when the client sends the raw project.",
    placeholder: true,
  },
  {
    id: "harbor-exchange",
    name: "Harbor Exchange",
    category: "Commercial",
    location: "Karachi, Pakistan",
    timeline: "2023 — 2024",
    summary:
      "A workplace study for a waterfront floor plate, with a clear core and a public edge.",
    brief:
      "The plan keeps a clean core and pushes meeting and lounge space to the glazed edge so the waterfront is shared. Charcoal metal, oak and clear glass set a calm commercial tone.",
    image: "/images/commercial-edge.jpg",
    imageAlt: "Waterfront workplace with charcoal metal and floor-to-ceiling glass",
    frames: [{ src: "/images/harbor-interior.jpg", alt: "Harbor workplace interior with a long oak table" }],
    video: {
      src: "",
      poster: "/images/harbor-lounge.jpg",
      label: "Completion video — forthcoming",
    },
    sourceNote: "Draft study for layout. Replace when the client sends the raw project.",
    placeholder: true,
  },
  {
    id: "atelier-house",
    name: "Atelier House",
    category: "Interior",
    location: "Lahore, Pakistan",
    timeline: "2023 — 2024",
    summary:
      "An interior study in timber, plaster and a single run of joinery.",
    brief:
      "One material story carries the house: oak joinery, soft plaster and garden light. Furniture and openings stay quiet so the rooms feel continuous from living through dining.",
    image: "/images/interior-living.jpg",
    imageAlt: "Living room in oak and plaster with a long garden window",
    frames: [{ src: "/images/atelier-joinery.jpg", alt: "Oak joinery and linen seating in daylight" }],
    video: {
      src: "",
      poster: "/images/atelier-nook.jpg",
      label: "Completion video — forthcoming",
    },
    sourceNote: "Draft study for layout. Replace when the client sends the raw project.",
    placeholder: true,
  },
  {
    id: "cedar-court",
    name: "Cedar Court",
    category: "Architecture",
    location: "Islamabad, Pakistan",
    timeline: "2021 — 2023",
    summary:
      "A low housing study organised around a shared court and a simple repeated bay.",
    brief:
      "Repeated bays and a shared court give the block a clear rhythm. Cedar and pale brick keep elevations warm; the court holds arrival, planting and neighbourly outlook.",
    image: "/images/hero-residence.jpg",
    imageAlt: "Contemporary residence with warm interior light at dusk",
    frames: [{ src: "/images/cedar-court.jpg", alt: "Low courtyard housing with repeated bays" }],
    video: {
      src: "",
      poster: "/images/cedar-entry.jpg",
      label: "Completion video — forthcoming",
    },
    sourceNote: "Draft study for layout. Replace when the client sends the raw project.",
    placeholder: true,
  },
  {
    id: "meridian-lobby",
    name: "Meridian Lobby",
    category: "Interior",
    location: "Dubai, UAE",
    timeline: "2024 — 2025",
    summary:
      "A lobby study: stone, a long bench, and light brought down to standing height.",
    brief:
      "Pale stone and a long timber line set the arrival mood. Light sits at standing height so the lobby feels calm and measured before guests move into the tower.",
    image: "/images/stone-lobby.jpg",
    imageAlt: "Stone lobby with a long timber bench",
    frames: [{ src: "/images/meridian-bench.jpg", alt: "Pale stone wall and a long timber bench" }],
    video: {
      src: "",
      poster: "/images/meridian-desk.jpg",
      label: "Completion video — forthcoming",
    },
    sourceNote: "Draft study for layout. Replace when the client sends the raw project.",
    placeholder: true,
  },
  {
    id: "glassline-tower",
    name: "Glassline Tower",
    category: "Visualization",
    location: "Toronto, Canada",
    timeline: "2024",
    summary:
      "A tower study used to test massing, glass tone and a dusk camera path.",
    brief:
      "Massing, glass tone and dusk lighting were tested as a short visualization pass — street, plaza and upward views kept in one coherent sequence for client review.",
    image: "/images/glass-tower.jpg",
    imageAlt: "Slender glass tower at dusk",
    frames: [{ src: "/images/glassline-street.jpg", alt: "Looking up the glass tower at dusk" }],
    video: {
      src: "",
      poster: "/images/glassline-plaza.jpg",
      label: "Completion video — forthcoming",
    },
    sourceNote: "Draft study for layout. Replace when the client sends the raw project.",
    placeholder: true,
  },
];
