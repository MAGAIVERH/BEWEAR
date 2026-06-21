import { z } from "zod";

export const subscribeNewsletterSchema = z.object({
  email: z.email("Invalid email."),
});

export type SubscribeNewsletterSchema = z.infer<typeof subscribeNewsletterSchema>;
