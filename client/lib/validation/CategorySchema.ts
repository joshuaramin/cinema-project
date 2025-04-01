import * as z from "zod";

export const AddCategorySchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
});

export const UpdateCategorySchema = z.object({
  category_id: z.string().min(1, { message: "Category ID is required" }),
  category: z.string().min(1, { message: "Category is required" }),
});
