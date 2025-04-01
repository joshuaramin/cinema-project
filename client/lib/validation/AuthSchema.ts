import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(1, { message: "Email Address is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
