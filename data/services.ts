import type { IconName } from "@/components/Icon";

export const serviceIds = [
  "architecture-design",
  "revit-drafting",
  "permit-sets",
  "modeling-rendering",
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
    title: "3D Modeling, Rendering and Animation Services",
    summary:
      "Accurate models, daylight-true renders and walkthroughs that explain proportion, material and atmosphere before anything is built.",
    tags: ["3D modeling", "Photoreal renders", "Walkthroughs"],
    deliverables: ["Coordinated model", "Still renders", "Edited walkthrough"],
    icon: "visualization",
    image: "/images/hero-model.jpg",
    imageAlt: "Photoreal render of a courtyard pavilion at dusk",
  },
  {
    id: "interior-design",
    number: "05",
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
  { label: "Architecture Design", href: "/services/#architecture-design", icon: "architecture" },
  { label: "Interior Design", href: "/services/#interior-design", icon: "interior" },
  {
    label: "Building Permits & Drafting Services",
    href: "/services/#permit-sets",
    icon: "drafting",
  },
  {
    label: "Visualization / Animation",
    href: "/services/#modeling-rendering",
    icon: "visualization",
  },
];
