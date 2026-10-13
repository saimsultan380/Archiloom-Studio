import type { IconName } from "@/components/Icon";

export const serviceIds = [
  "architecture-design",
  "revit-drafting",
  "permit-sets",
  "modeling-rendering",
  "architectural-animation",
  "interior-design",
] as const;

export type ServiceId = (typeof serviceIds)[number];

export type Service = {
  id: ServiceId;
  number: string;
  title: string;
  summary: string;
  tags: [string, string, string];
  deliverables: [string, string, string];
  icon: IconName;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "architecture-design",
    number: "01",
    title: "Architecture Design Services",
    summary:
      "Concept, plans and elevations carried through design development, with a spatial idea your team can actually build.",
    tags: ["Concept design", "Plans & elevations", "Design development"],
    deliverables: ["Massing options", "Floor plans and elevations", "Design development set"],
    icon: "architecture",
    image: "/images/courtyard-house.jpg",
    imageAlt: "Courtyard house study in pale concrete and timber",
  },
  {
    id: "revit-drafting",
    number: "02",
    title: "Revit Drafting Outsourcing Services",
    summary:
      "2D documentation, redraws and renovation drawings produced to your templates, sheet standards and deadlines.",
    tags: ["2D documentation", "Redraws", "Renovation drawings"],
    deliverables: ["Modelled plans", "Redlines turned around", "Renovation drawing sets"],
    icon: "drafting",
    image: "/images/commercial-edge.jpg",
    imageAlt: "Precise commercial elevation with charcoal metal and glass",
  },
  {
    id: "permit-sets",
    number: "03",
    title: "Construction & Permit Sets Services",
    summary:
      "Permit and construction drawing sets coordinated for submission, consultant review and the site team.",
    tags: ["Permit sets", "Construction drawings", "Coordination"],
    deliverables: ["Submission sheets", "Consultant coordination", "Issued-for-construction updates"],
    icon: "permits",
    image: "/images/cedar-court.jpg",
    imageAlt: "Low housing block ready for coordinated construction drawings",
  },
  {
    id: "modeling-rendering",
    number: "04",
    title: "3D Modeling and Rendering Services",
    summary:
      "Accurate models and daylight-true renders that explain proportion, material and atmosphere before anything is built.",
    tags: ["3D modeling", "Photoreal renders", "Material studies"],
    deliverables: ["Coordinated model", "Still renders", "Material and light studies"],
    icon: "visualization",
    image: "/images/hero-model.jpg",
    imageAlt: "Photoreal render of a courtyard pavilion at dusk",
  },
  {
    id: "architectural-animation",
    number: "05",
    title: "3D Architectural Animation Services",
    summary:
      "Walkthroughs and flythroughs that move a client through the space with the same restraint as the drawings.",
    tags: ["Walkthroughs", "Flythroughs", "Animated visuals"],
    deliverables: ["Camera path", "Edited walkthrough", "Short flythrough cut"],
    icon: "animation",
    image: "/images/glassline-street.jpg",
    imageAlt: "Dusk camera path looking up a slender glass tower",
  },
  {
    id: "interior-design",
    number: "06",
    title: "Interior Design Services",
    summary:
      "Space planning, concept, materials and detailing that make the architecture livable and specific.",
    tags: ["Space planning", "Materials", "Detailing"],
    deliverables: ["Planning options", "Material palette", "Interior detail drawings"],
    icon: "interior",
    image: "/images/interior-living.jpg",
    imageAlt: "Oak and plaster living room with a long garden window",
  },
];

export const serviceBar: Array<{
  label: string;
  href: string;
  icon: IconName;
}> = [
  { label: "Architecture Design", href: "/services#architecture-design", icon: "architecture" },
  { label: "Interior Design", href: "/services#interior-design", icon: "interior" },
  {
    label: "Building Permits & Drafting Services",
    href: "/services#permit-sets",
    icon: "drafting",
  },
  {
    label: "Visualization / Animation",
    href: "/services#modeling-rendering",
    icon: "visualization",
  },
];
