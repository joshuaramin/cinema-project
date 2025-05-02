import { z } from "zod";

export const Movieschema = z.object({
  file: z
    .instanceof(File, {
      message: "File upload is required",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size must beless than 10MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    }),
  genre_id: z.array(z.string()).min(1, "Please select at least one (1) genre"),
  description: z.string().min(1, "Description is required"),
  name: z.string().min(1, "Movie name is required"),
  release_date: z.string().min(1, "Release Date is required"),
  year: z
    .string({
      message: "Please enter a number",
      description: "Please enter a number",
    })
    .min(1, "Year is required"),
  duration: z.string().min(1, "Duration is required"),
});
