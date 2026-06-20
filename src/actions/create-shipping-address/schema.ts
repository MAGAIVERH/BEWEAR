import { z } from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email("Invalid email."),
  fullName: z.string().min(1, "Full name is required."),
  phone: z.string().min(14, "Invalid phone number."),
  zipCode: z.string().min(5, "Invalid ZIP code."),
  street: z.string().min(1, "Address is required."),
  complement: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(2, "State is required."),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
