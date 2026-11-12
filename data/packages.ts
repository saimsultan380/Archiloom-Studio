/**
 * PLACEHOLDER — feature lists are to be defined by the client.
 * Prices and hour bands below are the figures from the design brief.
 */

export const planValues = ["undecided", "basic", "standard", "hourly", "custom"] as const;

export type PlanId = (typeof planValues)[number];

export type PackageId = "basic" | "standard" | "hourly";

export type Package = {
  id: PackageId;
  name: string;
  price: string;
  cadence: string;
  hours: string;
  rate: string;
  featured?: boolean;
  features: string[];
  /** PLACEHOLDER — how-it-works copy to be defined by the client. */
  howItWorks: string[];
};

export const packages: Package[] = [
  {
    id: "basic",
    name: "Essential",
    price: "$1,750",
    cadence: "/mo",
    hours: "160 hours (≈ 40 hrs/week)",
    rate: "Effective rate ≈ $10.94/hr",
    features: [
      "Unlimited design requests",
      "Unlimited design refinements",
      "40 dedicated hours per week",
      "Flexible pause or cancellation",
      "Flexible task scheduling",
      "Weekly progress reviews",
      "One active task at a time",
      "One dedicated team member",
    ],
    howItWorks: [
      "Share the brief and the first task.",
      "One dedicated person works a single active task, about 40 hours a week.",
      "Review progress weekly, then pause or cancel when you need to.",
    ],
  },
  {
    id: "standard",
    name: "Professional",
    price: "$2,250",
    cadence: "/mo",
    hours: "240 hours (≈ 60 hrs/week)",
    rate: "Effective rate ≈ $9.38/hr",
    featured: true,
    features: [
      "All Essential plan benefits",
      "60 dedicated hours per week",
      "Multiple projects handled in parallel",
      "Dedicated project manager",
      "Transparent time tracking & reporting",
      "Two dedicated team members",
    ],
    howItWorks: [
      "Everything in Essential, with two people on the work.",
      "A project manager keeps parallel tasks, time tracking and reporting in order.",
      "Use the extra hours when more than one project needs to move at once.",
    ],
  },
  {
    id: "hourly",
    name: "On-Demand",
    price: "$25",
    cadence: "/hr",
    hours: "Pay as you go",
    rate: "No long-term commitment",
    features: [
      "1-day complimentary trial",
      "Unlimited design requests & revisions",
      "Flexible, usage-based working hours",
      "Pause or cancel anytime",
      "Weekly progress meetings",
      "Dedicated project manager",
      "Transparent time tracking",
    ],
    howItWorks: [
      "Start with a one-day complimentary trial.",
      "Hours are tracked and reviewed with you each week.",
      "Pause or stop whenever the work is where you need it.",
    ],
  },
];

export const planOptions: Array<{ value: PlanId; label: string }> = [
  { value: "undecided", label: "Not sure yet" },
  { value: "basic", label: "Essential — $1,750 /mo" },
  { value: "standard", label: "Professional — $2,250 /mo" },
  { value: "hourly", label: "On-Demand — $25 /hr" },
  { value: "custom", label: "Custom scope" },
];
