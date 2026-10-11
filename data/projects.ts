export const projectFilters = [
  "All",
  "Architecture",
  "Interior",
  "Visualization",
  "Commercial",
] as const;

export type ProjectCategory = (typeof projectFilters)[number];

export type Project = {
  id: string;
  name: string;
  category: Exclude<ProjectCategory, "All">;
  summary: string;
  image: string;
  imageAlt: string;
  imageLabel: string;
  tone: string;
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
    placeholder: true,
  },
];
