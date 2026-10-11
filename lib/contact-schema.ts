import { z } from "zod";
import { planValues } from "@/data/packages";
import { serviceIds } from "@/data/services";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  service: z
    .string()
    .min(1, "Select a service.")
    .refine((value) => (serviceIds as readonly string[]).includes(value), "Select a service."),
  location: z.string().trim().min(2, "Enter the project country."),
  plan: z.enum(planValues),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about the project."),
});

export type ContactInput = z.infer<typeof contactSchema>;
