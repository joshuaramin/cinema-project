import * as z from "zod";

export const AddShift = z.object({
  type: z
    .string({
      required_error: "Shift Type is required",
      invalid_type_error: "Shift Type must be a string",
      message: "Shift Type is required",
    })
    .min(1, "Shift type is required")
    .max(30, "The maximum characters is 30")
    .trim(),
});
