export const enquiryServices = [
  { id: "architectural-design", label: "Architectural design" },
  { id: "interior-design", label: "Interior design" },
  { id: "cad-revit", label: "CAD drafting / Revit BIM support" },
  { id: "visualization-animation", label: "3D rendering / architectural animation" },
  { id: "outsourcing", label: "Ongoing outsourcing / dedicated production support" },
  { id: "multiple", label: "Multiple services / complete project support" },
] as const;

export const enquiryRoles = [
  { id: "owner", label: "Property owner / developer" },
  { id: "practice", label: "Architecture firm / contractor" },
  { id: "interior-studio", label: "Interior design studio" },
  { id: "other", label: "Other business" },
] as const;

export const enquiryProjectTypes = [
  { id: "residential", label: "Residential / villa / apartment" },
  { id: "commercial", label: "Commercial / office" },
  { id: "hospitality", label: "Hospitality / restaurant / retail" },
  { id: "mixed", label: "Mixed-use / other" },
] as const;

export const enquiryStages = [
  { id: "concept", label: "Concept / initial planning" },
  { id: "development", label: "Design development" },
  { id: "documentation", label: "Technical drawings / documentation" },
  { id: "revisions", label: "Existing project requiring revisions" },
  { id: "unsure", label: "Not sure yet" },
] as const;

export const enquiryDeliverables = [
  { id: "concept", label: "Concept design and space planning" },
  { id: "drawings", label: "Floor plans, elevations and sections" },
  { id: "development", label: "Design development" },
  { id: "visualization", label: "3D visualizations" },
  { id: "animation", label: "Animation / walkthrough" },
  { id: "documentation", label: "CAD, Revit or permit documentation" },
] as const;

export const enquiryBudgets = [
  { id: "under-1000", label: "Under $1,000" },
  { id: "1000-5000", label: "$1,000–$5,000" },
  { id: "5000-15000", label: "$5,000–$15,000" },
  { id: "15000-plus", label: "$15,000+" },
  { id: "unsure", label: "Not sure yet / need guidance" },
] as const;

export const enquiryTimelines = [
  { id: "asap", label: "As soon as possible" },
  { id: "2-4-weeks", label: "Within 2–4 weeks" },
  { id: "1-3-months", label: "Within 1–3 months" },
  { id: "flexible", label: "Flexible / still planning" },
] as const;

export type EnquiryService = (typeof enquiryServices)[number]["id"];
export type EnquiryRole = (typeof enquiryRoles)[number]["id"];
export type EnquiryProjectType = (typeof enquiryProjectTypes)[number]["id"];
export type EnquiryStage = (typeof enquiryStages)[number]["id"];
export type EnquiryDeliverable = (typeof enquiryDeliverables)[number]["id"];
export type EnquiryBudget = (typeof enquiryBudgets)[number]["id"];
export type EnquiryTimeline = (typeof enquiryTimelines)[number]["id"];

const serviceIds = enquiryServices.map((item) => item.id);
const roleIds = enquiryRoles.map((item) => item.id);
const projectTypeIds = enquiryProjectTypes.map((item) => item.id);
const stageIds = enquiryStages.map((item) => item.id);
const deliverableIds = enquiryDeliverables.map((item) => item.id);
const budgetIds = enquiryBudgets.map((item) => item.id);
const timelineIds = enquiryTimelines.map((item) => item.id);

export const enquiryServiceValues = serviceIds as unknown as readonly [EnquiryService, ...EnquiryService[]];
export const enquiryRoleValues = roleIds as unknown as readonly [EnquiryRole, ...EnquiryRole[]];
export const enquiryProjectTypeValues = projectTypeIds as unknown as readonly [EnquiryProjectType, ...EnquiryProjectType[]];
export const enquiryStageValues = stageIds as unknown as readonly [EnquiryStage, ...EnquiryStage[]];
export const enquiryDeliverableValues = deliverableIds as unknown as readonly [EnquiryDeliverable, ...EnquiryDeliverable[]];
export const enquiryBudgetValues = budgetIds as unknown as readonly [EnquiryBudget, ...EnquiryBudget[]];
export const enquiryTimelineValues = timelineIds as unknown as readonly [EnquiryTimeline, ...EnquiryTimeline[]];

/** Maps a services-page id onto the enquiry choices. */
export const serviceQueryMap: Record<string, EnquiryService> = {
  "architecture-design": "architectural-design",
  "interior-design": "interior-design",
  "revit-drafting": "cad-revit",
  "permit-sets": "cad-revit",
  "modeling-rendering": "visualization-animation",
};
