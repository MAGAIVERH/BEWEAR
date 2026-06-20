"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { reviewTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { CreateReviewSchema, createReviewSchema } from "./schema";

export const createReview = async (data: CreateReviewSchema) => {
  createReviewSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const existing = await db.query.reviewTable.findFirst({
    where: (review, { and, eq }) =>
      and(
        eq(review.userId, session.user.id),
        eq(review.productId, data.productId),
      ),
  });

  if (existing) {
    await db
      .update(reviewTable)
      .set({ rating: data.rating, comment: data.comment ?? null })
      .where(eq(reviewTable.id, existing.id));
    return;
  }

  await db.insert(reviewTable).values({
    userId: session.user.id,
    productId: data.productId,
    rating: data.rating,
    comment: data.comment ?? null,
  });
};
