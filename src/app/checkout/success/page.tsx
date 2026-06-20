"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutSuccessPage = () => {
  return (
    <>
      <Header />
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Success"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Order placed!</DialogTitle>
          <DialogDescription className="font-medium">
            Your order has been placed successfully. You can track its status in
            the “My Orders” section.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounded-full" size="lg">
              <Link href="/my-orders">View my orders</Link>
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Back to store</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutSuccessPage;
