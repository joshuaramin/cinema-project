import * as z from "zod";

export const AddJobPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(250, "The max characters allowed is 250"),
  description: z.string().min(2, "Description is required"),
  location: z.string().min(1, "Location is required"),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(200, "The max characters allowed is 200"),
  positionId: z.string().min(1, "Job position is required"),
  jobType: z.array(z.string()).min(1, "Select Job Type at least one (1)"),
  shiftId: z.string().min(1, "Shift is required"),
});

export const UpdateJobPostSchema = z.object({
  job_post_id: z.string(),
  title: z
    .string()
    .min(1, "Title is rqeuired")
    .max(250, "The max characters allowed is 250"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(200, "The max characters allowed is 200"),
  positionId: z.string().min(1, "Position is required"),
  jobType: z.array(z.string()).min(1, "Select Job Type at least one (1)"),
  shiftId: z.string().min(1, "Shift is required"),
});
