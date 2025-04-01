import * as z from "zod";

export const UserRoleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .union(
      [
        z.string().length(250, {
          message: "The maximum number of characters that allowed is 250",
        }),
        z
          .string({ message: "Description must be a string" })
          .max(250, "The maximum number of characters that allowed is 250"),
      ],
      { description: "The maximum number of characters that allowed is 250" }
    )
    .optional(),
});
