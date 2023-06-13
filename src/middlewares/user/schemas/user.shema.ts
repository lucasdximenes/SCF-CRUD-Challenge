import { z } from "zod";

export const newUserSchema = z.object({
  name: z
    .string({
      required_error: "'name' is required",
      invalid_type_error: "'name' must be a string",
    })
    .min(3, {
      message: "'name' must have at least 3 characters",
    })
    .max(255, {
      message: "'name' must have a maximum of 255 characters",
    }),
  job: z
    .string({
      required_error: "'job' is required",
      invalid_type_error: "'job' must be a string",
    })
    .min(3, {
      message: "'job' must have at least 3 characters",
    })
    .max(255, {
      message: "'job' must have a maximum of 255 characters",
    }),
});
