import { eq } from "drizzle-orm";
import { ChevronRightIcon, HeartIcon, PackageIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import AddressBook from "@/components/common/address-book";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import SignOutButton from "@/components/common/sign-out-button";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const QUICK_LINKS = [
  { href: "/my-orders", label: "My orders", Icon: PackageIcon },
  { href: "/wishlist", label: "Wishlist", Icon: HeartIcon },
];

const AccountPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  const addresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
    orderBy: (address, { desc }) => [desc(address.createdAt)],
  });

  const firstName = session.user.name?.split(" ")?.[0] ?? "there";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="container-bw flex-1 space-y-10 py-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-eyebrow-brand">Account</p>
            <h1 className="section-title">Hi, {firstName}</h1>
            <p className="text-muted-foreground text-sm">
              {session.user.email}
            </p>
          </div>
          <SignOutButton />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {QUICK_LINKS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="hover:bg-accent flex items-center justify-between rounded-xl border p-4 transition-colors"
            >
              <span className="flex items-center gap-3 font-medium">
                <Icon className="h-5 w-5" />
                {label}
              </span>
              <ChevronRightIcon className="text-muted-foreground h-4 w-4" />
            </Link>
          ))}
        </div>

        <AddressBook initialAddresses={addresses} />
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
