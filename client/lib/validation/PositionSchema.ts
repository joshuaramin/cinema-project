import * as z from "zod";

export const PositonSchema = z.object({
  position: z
    .string({
      required_error: "Position is required",
      invalid_type_error: "Position must be a string",
      message: "Position is required",
    })
    .min(1, { message: "Position is required" })
    .trim(),
});
