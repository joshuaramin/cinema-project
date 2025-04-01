import * as z from "zod";

export const UserSchema = z.object({
  email: z.string().email().min(1, "Email address is required"),
  password: z.string().min(1, "Password is required"),
  contact_no: z.string().min(1, "Contact no. is required"),
  first_name: z.string().min(1, "First name is required").max(50),
  last_name: z.string().min(1, "Last name is required").max(50),
  address_line_1: z.string().min(1, "Address line one (1) is required"),
  address_line_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  zipcode: z
    .string()
    .min(1, "Zipcode is required")
    .max(4, "The max characters is 4"),
});
