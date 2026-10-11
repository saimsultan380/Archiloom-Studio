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
    name: "Basic",
    price: "$1,895",
    cadence: "/mo",
    hours: "160 hours (≈ 40 hrs/week)",
    rate: "≈ $11.84/hr",
    features: [
      "Unlimited design requests",
      "Unlimited revisions",
      "40 hours a week",
      "Cancel anytime",
      "Pause anytime",
      "Weekly meeting",
      "One active task at a time",
      "1 dedicated team member",
    ],
    howItWorks: [
      "Share a brief, drawings, or a redline set.",
      "One dedicated person picks up a single active task.",
      "You review the work in a weekly meeting and can pause or cancel.",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "$2,500",
    cadence: "/mo",
    hours: "240 hours (≈ 60 hrs/week)",
    rate: "≈ $10.42/hr",
    featured: true,
    features: [
      "Everything in Basic",
      "60 hours a week",
      "Multiple active tasks",
      "Dedicated project manager",
      "Time tracking",
      "2 dedicated team members",
    ],
    howItWorks: [
      "Everything in Basic, with room for more than one live task.",
      "A project manager keeps the queue and the time record.",
      "Two people stay on the work so documentation can move in parallel.",
    ],
  },
  {
    id: "hourly",
    name: "Hourly",
    price: "$28",
    cadence: "/hr",
    hours: "Pay as you go",
    rate: "—",
    features: [
      "1-day free trial",
      "Unlimited design requests and revisions",
      "Unlimited hours a week",
      "Cancel/pause anytime",
      "Weekly meeting",
      "Dedicated project manager",
      "Time tracking",
    ],
    howItWorks: [
      "Start with a one-day trial and a scoped first task.",
      "Hours are tracked and reviewed with you each week.",
      "Pause or stop when the drawing set is where you need it.",
    ],
  },
];

export const planOptions: Array<{ value: PlanId; label: string }> = [
  { value: "undecided", label: "Not sure yet" },
  { value: "basic", label: "Basic — $1,895 /mo" },
  { value: "standard", label: "Standard — $2,500 /mo" },
  { value: "hourly", label: "Hourly — $28 /hr" },
  { value: "custom", label: "Custom scope" },
];
