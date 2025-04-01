import * as z from "zod";

export const CountrySchema = z.object({
  country: z
    .string({
      required_error: "Country is required",
      invalid_type_error: "Country must be a string",
    })
    .min(1, { message: "Country is required" })
    .trim(),
  code: z
    .string({
      required_error: "Code is required",
      invalid_type_error: "Code must be a string",
    })
    .min(1, { message: "Code is required" })
    .max(3, { message: "Country code must be a maximum of 3 letters." })
    .trim(),
});

export const UpdateCountrySchema = z.object({
  country_id: z.string().min(1, { message: "Country ID is required" }),
  country: z
    .string({
      required_error: "Country is required",
      invalid_type_error: "Country must be a string",
    })
    .min(1, { message: "Country is required" })
    .trim(),
  code: z
    .string({
      required_error: "Code is required",
      invalid_type_error: "Code must be a string",
    })
    .min(1, { message: "Code is required" })
    .max(3, { message: "Country code must be a maximum of 3 letters." })
    .trim(),
});
