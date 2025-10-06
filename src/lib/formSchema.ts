import * as z from "zod";

export const ScholarshipFormSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  preferredUniversities: z.array(z.string()).min(1, "At least one university must be selected"),
  desiredCourse: z.string().min(1, "Select a course"),
  justification: z.string().min(10, "Please explain why you deserve the scholarship"),
  benefit: z.string().min(10, "Please explain how this scholarship will benefit you"),
});

export type ScholarshipFormValues = z.infer<typeof ScholarshipFormSchema>;