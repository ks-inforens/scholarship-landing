import * as z from "zod";

export const ScholarshipFormSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),

  email: z.string()
    .email("Enter a valid email address")
    .min(1, "Email is required"),

  phone: z.string()
    .min(7, "Enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(/^\+?[0-9\s\-()]{7,15}$/, "Enter a valid phone number"),

  qualification: z.string().min(1, "Please select your highest level of qualification"),
  grade: z.string().min(1, "Please enter your grade"),
  preferredUniversities: z.array(z.string()).min(1, "At least one university must be selected"),
  desiredCourse: z.string().min(1, "Select a course"),

  justification: z.string().min(10, "Please explain why you deserve the scholarship"),
  benefit: z.string().min(10, "Please explain how this scholarship will benefit you"),
});

export type ScholarshipFormValues = z.infer<typeof ScholarshipFormSchema>;
