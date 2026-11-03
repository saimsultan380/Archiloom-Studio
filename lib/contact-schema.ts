import { z } from "zod";
import {
  enquiryBudgetValues,
  enquiryDeliverableValues,
  enquiryProjectTypeValues,
  enquiryRoleValues,
  enquiryServiceValues,
  enquiryStageValues,
  enquiryTimelineValues,
} from "@/data/enquiry";

export const contactSchema = z.object({
  service: z.enum(enquiryServiceValues, { message: "Select a service." }),
  role: z.enum(enquiryRoleValues, { message: "Select your role." }),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.enum(enquiryProjectTypeValues, { message: "Select a project type." }),
  location: z.string().trim().min(2, "Enter the city and country."),
  area: z.string().trim().max(80).optional().or(z.literal("")),
  stage: z.enum(enquiryStageValues, { message: "Select the project stage." }),
  deliverables: z.array(z.enum(enquiryDeliverableValues)).min(1, "Select at least one deliverable."),
  message: z.string().trim().min(10, "Tell us a little more about the project."),
  budget: z.enum(enquiryBudgetValues, { message: "Select a budget range." }),
  timeline: z.enum(enquiryTimelineValues, { message: "Select a timeline." }),
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  plan: z.string().trim().max(40).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
