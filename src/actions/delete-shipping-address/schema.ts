import { z } from "zod";

export const deleteShippingAddressSchema = z.object({
  id: z.uuid(),
});

export type DeleteShippingAddressSchema = z.infer<
  typeof deleteShippingAddressSchema
>;
