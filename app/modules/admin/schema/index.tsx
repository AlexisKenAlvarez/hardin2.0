import { z } from "zod";

export const categorySchema = z.object({
  label: z.string(),
  id: z.number(),
});

export const EditFormSchema = z.object({
  product_name: z
    .string()
    .min(2, { message: "Product name must have at least 2 characters" })
    .max(70, { message: "Product name must not exceed 70 characters" }),
  category: categorySchema,
  sub_category: categorySchema.nullish(),
  bestSeller: z.boolean().optional(),
});