/** Placeholder claim from the client brief. Edit this constant only. */
export const PROJECT_CLAIM = "More than 1,000 projects across 4 continents.";

export const navLinks = [
  { label: "Work", href: "/projects/" },
  { label: "Services", href: "/services/" },
  { label: "About Us", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const sitemapLinks = [
  { label: "Work", href: "/projects/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const socialLinks = ["Instagram", "LinkedIn", "Behance", "Dribbble"] as const;

export const commitment = "Your Vision. Our Commitment.";

export const processJourney = [
  {
    id: "01",
    label: "Your idea",
    lead: "If you imagine,",
    accent: "we help you envision.",
    body: "We help you explore possibilities and turn early ideas into a clear design direction.",
  },
  {
    id: "02",
    label: "Your sketch",
    lead: "If you sketch,",
    accent: "we help you plan.",
    body: "We develop your sketches into thoughtful layouts, spatial plans, and architectural concepts.",
  },
  {
    id: "03",
    label: "Your design",
    lead: "If you design,",
    accent: "we help you visualize.",
    body: "We bring your design to life through detailed 3D models, realistic renders, and animations.",
  },
  {
    id: "04",
    label: "Your drawings",
    lead: "If you draft,",
    accent: "we help you build.",
    body: "We support your drawings with coordinated documentation and technical production for the next stage.",
  },
  {
    id: "05",
    label: "From vision to reality",
    lead: "Whatever your starting point,",
    accent: "we help you move forward.",
    body: "We bring design thinking, technical expertise, and visualization together to help you take your project from its current stage to its next milestone.",
    wide: true,
  },
] as const;

export const about = {
  paragraphs: [
    "Archiloom Studio brings together architectural thinking, interior design, technical documentation, and visualization to support projects from early design development through coordinated deliverables.",
    "We work with property owners, developers, contractors, and design practices, adapting our involvement to each project's scope, requirements, and stage of development.",
    "Our approach combines thoughtful design decisions with clear communication, structured workflows, and attention to technical detail. Whether you need support developing a space or additional capacity for an established design team, we aim to make the process clear and collaborative.",
  ],
  mission:
    "To create meaningful, high-quality spaces through innovative design, precise drafting and immersive visualizations, delivering lasting value for our clients worldwide.",
  vision:
    "To be a trusted global design studio known for creativity, quality and client-focused solutions.",
  quote: commitment,
} as const;

export const studio = {
  name: "Archiloom Studio",
  email: "hello@archiloom.studio",
  website: "archiloomstudio.com",
  websiteUrl: "https://archiloomstudio.com",
  tagline: "Your Vision. Our Design Expertise. Reliable Project Delivery.",
  title: "Archiloom Studio — Global Architecture & Design Studio",
  description:
    "Archiloom Studio partners with clients and design professionals worldwide to deliver thoughtful architectural design, refined interiors, coordinated technical documentation, and compelling 3D visualizations.",
} as const;
