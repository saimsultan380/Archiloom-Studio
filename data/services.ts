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
    image: "/images/service-architecture.webp",
    imageAlt: "Architectural design presentation of a contemporary residence",
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
    image: "/images/service-revit.webp",
    imageAlt: "Revit drafting view of a coordinated architectural model",
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
    image: "/images/service-permits.webp",
    imageAlt: "Construction and permit drawing set for a residence",
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
    image: "/images/service-rendering-2.webp",
    imageAlt: "Photoreal architectural rendering and visualization",
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
    image: "/images/service-interior-2.webp",
    imageAlt: "Interior design of a furnished living space",
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
