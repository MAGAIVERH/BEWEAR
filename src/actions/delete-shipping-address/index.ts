"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  DeleteShippingAddressSchema,
  deleteShippingAddressSchema,
} from "./schema";

export const deleteShippingAddress = async (
  data: DeleteShippingAddressSchema,
) => {
  deleteShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    await db
      .delete(shippingAddressTable)
      .where(
        and(
          eq(shippingAddressTable.id, data.id),
          eq(shippingAddressTable.userId, session.user.id),
        ),
      );
  } catch (error) {
    console.error(error);
    // Address may be referenced by an existing order.
    throw new Error("This address can't be removed.");
  }

  revalidatePath("/account");
};
