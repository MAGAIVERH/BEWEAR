"use server";

import { db } from "@/db";
import { newsletterSubscriberTable } from "@/db/schema";

import { SubscribeNewsletterSchema, subscribeNewsletterSchema } from "./schema";

export const subscribeNewsletter = async (data: SubscribeNewsletterSchema) => {
  const { email } = subscribeNewsletterSchema.parse(data);
  const normalizedEmail = email.trim().toLowerCase();

  const [subscriber] = await db
    .insert(newsletterSubscriberTable)
    .values({ email: normalizedEmail })
    .onConflictDoNothing({ target: newsletterSubscriberTable.email })
    .returning();

  // No row returned means the email already existed (conflict skipped insert).
  return { alreadySubscribed: !subscriber };
};
