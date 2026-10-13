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

export type Project = {
  id: string;
  name: string;
  category: Exclude<ProjectCategory, "All">;
  summary: string;
  image: string;
  imageAlt: string;
  imageLabel: string;
  tone: string;
  frames: [ProjectFrame, ProjectFrame, ProjectFrame];
  /** PLACEHOLDER — replace with a real project photograph or render. */
  placeholder: true;
};

/** PLACEHOLDER studies for layout approval. Not a record of completed commissions. */
export const projects: Project[] = [
  {
    id: "northline-residence",
    name: "Northline Residence",
    category: "Architecture",
    summary: "A courtyard house study: long elevations, a quiet plan, and daylight held between two wings.",
    image: "/images/courtyard-house.jpg",
    imageAlt: "Low courtyard house in pale concrete and timber",
    imageLabel: "Render — Residential, 16:10",
    tone: "#2a2a2a",
    frames: [
      { src: "/images/courtyard-house.jpg", alt: "Low courtyard house in pale concrete and timber" },
      { src: "/images/northline-court.jpg", alt: "Courtyard looking toward a long glazed wing" },
      { src: "/images/outdoor-terrace.jpg", alt: "Terrace and pool beside the house" },
    ],
    placeholder: true,
  },
  {
    id: "harbor-exchange",
    name: "Harbor Exchange",
    category: "Commercial",
    summary: "A workplace study for a waterfront floor plate, with a clear core and a public edge.",
    image: "/images/commercial-edge.jpg",
    imageAlt: "Waterfront workplace with charcoal metal and floor-to-ceiling glass",
    imageLabel: "Render — Commercial, 16:10",
    tone: "#333333",
    frames: [
      { src: "/images/commercial-edge.jpg", alt: "Waterfront workplace with charcoal metal and floor-to-ceiling glass" },
      { src: "/images/harbor-interior.jpg", alt: "Harbor workplace interior with a long oak table" },
      { src: "/images/glass-tower.jpg", alt: "Glass volume at dusk" },
    ],
    placeholder: true,
  },
  {
    id: "atelier-house",
    name: "Atelier House",
    category: "Interior",
    summary: "An interior study in timber, plaster and a single run of joinery.",
    image: "/images/interior-living.jpg",
    imageAlt: "Living room in oak and plaster with a long garden window",
    imageLabel: "Render — Interior, 16:10",
    tone: "#242424",
    frames: [
      { src: "/images/interior-living.jpg", alt: "Living room in oak and plaster with a long garden window" },
      { src: "/images/atelier-joinery.jpg", alt: "Oak joinery and linen seating in daylight" },
      { src: "/images/stone-lobby.jpg", alt: "Stone and timber interior" },
    ],
    placeholder: true,
  },
  {
    id: "cedar-court",
    name: "Cedar Court",
    category: "Architecture",
    summary: "A low housing study organised around a shared court and a simple repeated bay.",
    image: "/images/hero-residence.jpg",
    imageAlt: "Contemporary residence with warm interior light at dusk",
    imageLabel: "Render — Courtyard housing, 16:10",
    tone: "#2e2e2e",
    frames: [
      { src: "/images/hero-residence.jpg", alt: "Contemporary residence with warm interior light at dusk" },
      { src: "/images/cedar-court.jpg", alt: "Low courtyard housing with repeated bays" },
      { src: "/images/courtyard-house.jpg", alt: "Shared court between pale wings" },
    ],
    placeholder: true,
  },
  {
    id: "meridian-lobby",
    name: "Meridian Lobby",
    category: "Interior",
    summary: "A lobby study: stone, a long bench, and light brought down to standing height.",
    image: "/images/stone-lobby.jpg",
    imageAlt: "Stone lobby with a long timber bench",
    imageLabel: "Render — Lobby, 16:10",
    tone: "#383838",
    frames: [
      { src: "/images/stone-lobby.jpg", alt: "Stone lobby with a long timber bench" },
      { src: "/images/meridian-bench.jpg", alt: "Pale stone wall and a long timber bench" },
      { src: "/images/interior-living.jpg", alt: "Quiet seating in warm daylight" },
    ],
    placeholder: true,
  },
  {
    id: "glassline-tower",
    name: "Glassline Tower",
    category: "Visualization",
    summary: "A tower study used to test massing, glass tone and a dusk camera path.",
    image: "/images/glass-tower.jpg",
    imageAlt: "Slender glass tower at dusk",
    imageLabel: "Render — Tower study, 16:10",
    tone: "#262626",
    frames: [
      { src: "/images/glass-tower.jpg", alt: "Slender glass tower at dusk" },
      { src: "/images/glassline-street.jpg", alt: "Looking up the glass tower at dusk" },
      { src: "/images/commercial-edge.jpg", alt: "Glass and charcoal metal at the street" },
    ],
    placeholder: true,
  },
];
