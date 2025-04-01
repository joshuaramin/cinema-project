import * as z from "zod";

export const AddBlogPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "The maximum characters allowed is 50"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(300, "The maximum characters allowed is 300"),
  tags: z.array(z.string()).min(1, "At least one is required"),
  category: z.string().refine((value) => value !== "-", {
    message: "Please select a category",
  }),
  description: z.string().min(1, "Description is required"),
});
