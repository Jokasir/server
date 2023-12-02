import { object, string, number, union, nullable } from "zod";

export const productSchema = object({
  name: string()
    .min(1)
    .refine((value) => !!value, { message: "Name is required" }),
  price: number().refine(
    (value) => value !== null && value !== undefined && value > 0,
    { message: "Price must be a number greater than 0" }
  ),
  description: string()
    .min(1)
    .refine((value) => !!value, { message: "Description is required" }),
  categoryId: union([number(), nullable(number())]),
  photo: union([string(), nullable(string())]),
});
