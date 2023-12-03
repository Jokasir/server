import { object, string, number, union, nullable } from "zod";

export const productSchema = object({
  name: string()
    .min(1)
    .refine((value) => !!value, { message: "Name is required" }),
  price: number().refine(
    (value) => value !== null && value !== undefined && value > 0,
    { message: "Price is required" }
  ),
  description: string()
    .min(1)
    .refine((value) => !!value, { message: "Description is required" }),
  categoryId: union([number(), nullable(number())]),
  photo: union([string(), nullable(string())]),
});

export const categorySchema = object({
  name: string()
    .min(1)
    .refine((value) => !!value, { message: "Name is required" }),
});

export const adminUserSchema = object({
  firstName: string()
    .min(1)
    .refine((value) => !!value, { message: "First name is required" }),
  lastName: string()
    .min(1)
    .refine((value) => !!value, { message: "Last Name is required" }),
  email: string().email(),
  phone: string()
    .min(1)
    .refine((value) => !!value, { message: "Phone is required" }),
    role: string()
    .min(1)
    .refine((value) => !!value, { message: "Role is required" }),
});

export const storeSchema = object({
  name:string()
  .min(1)
  .refine((value) => !!value, { message: "Name is required" }),
  province: string()
  .min(1)
  .refine((value) => !!value, { message: "Province is required" }),
  city: string()
  .min(1)
  .refine((value) => !!value, { message: "City is required" }),
  address: string()
  .min(1)
  .refine((value) => !!value, { message: "Address is required" }),
  phone: string()
  .min(1)
  .refine((value) => !!value, { message: "Phone is required" }),
})
