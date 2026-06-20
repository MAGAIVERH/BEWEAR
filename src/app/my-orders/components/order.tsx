"use client";

import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderTable } from "@/db/schema";
import { formatCentsToUSD } from "@/helpers/money";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      size: string | null;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion type="single" collapsible key={order.id}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-col gap-1">
                    {order.status === "paid" && <Badge>Paid</Badge>}
                    {order.status === "pending" && (
                      <Badge variant="outline">Payment pending</Badge>
                    )}
                    {order.status === "canceled" && (
                      <Badge variant="destructive">Canceled</Badge>
                    )}
                    <p>
                      Order placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US")} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {order.items.map((product) => (
                    <div
                      className="flex items-center justify-between"
                      key={product.id}
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-muted relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={product.imageUrl}
                            alt={product.productName}
                            fill
                            sizes="78px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-semibold">
                            {product.productName}
                          </p>
                          <p className="text-muted-foreground text-xs font-medium">
                            {product.productVariantName}
                            {product.size ? ` · Size ${product.size}` : ""} x{" "}
                            {product.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center gap-2">
                        <p className="text-sm font-bold">
                          {formatCentsToUSD(
                            product.priceInCents * product.quantity,
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="py-5">
                    <Separator />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm">Subtotal</p>
                      <p className="text-muted-foreground text-sm font-medium">
                        {formatCentsToUSD(order.totalPriceInCents)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Shipping</p>
                      <p className="text-muted-foreground text-sm font-medium">
                        FREE
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Total</p>
                      <p className="text-sm font-semibold">
                        {formatCentsToUSD(order.totalPriceInCents)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
