"use server";

import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import {
  cartItemTable,
  cartTable,
  couponTable,
  orderItemTable,
  orderTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";

import { findValidCoupon } from "../validate-coupon/find-valid-coupon";

type FinishOrderInput = { couponCode?: string | null } | undefined;

export const finishOrder = async (input?: FinishOrderInput) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: true,
        },
      },
    },
  });
  if (!cart) {
    throw new Error("Cart not found");
  }
  if (!cart.shippingAddress) {
    throw new Error("Shipping address not found");
  }
  const subtotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  // Re-validate the coupon server-side (never trust the client total).
  const coupon = input?.couponCode
    ? await findValidCoupon(input.couponCode, subtotalInCents)
    : null;
  const discountInCents = coupon?.discountInCents ?? 0;
  const totalPriceInCents = subtotalInCents - discountInCents;

  let orderId: string | undefined;
  await db.transaction(async (tx) => {
    if (!cart.shippingAddress) {
      throw new Error("Shipping address not found");
    }
    const [order] = await tx
      .insert(orderTable)
      .values({
        email: cart.shippingAddress.email,
        zipCode: cart.shippingAddress.zipCode,
        country: cart.shippingAddress.country,
        phone: cart.shippingAddress.phone,
        cpfOrCnpj: cart.shippingAddress.cpfOrCnpj,
        city: cart.shippingAddress.city,
        complement: cart.shippingAddress.complement,
        neighborhood: cart.shippingAddress.neighborhood,
        number: cart.shippingAddress.number,
        recipientName: cart.shippingAddress.recipientName,
        state: cart.shippingAddress.state,
        street: cart.shippingAddress.street,
        userId: session.user.id,
        totalPriceInCents,
        couponCode: coupon?.code ?? null,
        discountInCents,
        shippingAddressId: cart.shippingAddress!.id,
      })
      .returning();
    if (!order) {
      throw new Error("Failed to create order");
    }
    orderId = order.id;
    if (coupon) {
      await tx
        .update(couponTable)
        .set({ timesRedeemed: sql`${couponTable.timesRedeemed} + 1` })
        .where(eq(couponTable.code, coupon.code));
    }
    const orderItemsPayload: Array<typeof orderItemTable.$inferInsert> =
      cart.items.map((item) => ({
        orderId: order.id,
        productVariantId: item.productVariant.id,
        size: item.size,
        quantity: item.quantity,
        priceInCents: item.productVariant.priceInCents,
      }));
    await tx.insert(orderItemTable).values(orderItemsPayload);
    await tx.delete(cartTable).where(eq(cartTable.id, cart.id));
    await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
  });
  if (!orderId) {
    throw new Error("Failed to create order");
  }
  return { orderId };
};
