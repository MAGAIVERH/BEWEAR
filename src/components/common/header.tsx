"use client";

import {
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCategories } from "@/hooks/queries/use-categories";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";

const Header = () => {
  const { data: session } = authClient.useSession();
  const { data: categories } = useCategories();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initials = `${session?.user?.name?.split(" ")?.[0]?.[0] ?? ""}${
    session?.user?.name?.split(" ")?.[1]?.[0] ?? ""
  }`;

  return (
    <header
      className={cn(
        "bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="flex items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 px-5">
                {session?.user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-semibold">
                          {session.user.name}
                        </h3>
                        <span className="text-muted-foreground block text-xs">
                          {session.user.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold">
                      Hi! Sign in to your account.
                    </h2>
                    <Button size="icon" asChild variant="outline">
                      <Link href="/authentication">
                        <LogInIcon />
                      </Link>
                    </Button>
                  </div>
                )}

                <Separator />

                <nav className="flex flex-col gap-1">
                  <Link
                    href="/"
                    className="hover:bg-accent rounded-lg px-2 py-2 text-sm font-medium"
                  >
                    Home
                  </Link>
                  {categories?.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="hover:bg-accent rounded-lg px-2 py-2 text-sm font-medium"
                    >
                      {category.name}
                    </Link>
                  ))}
                  {session?.user && (
                    <Link
                      href="/my-orders"
                      className="hover:bg-accent rounded-lg px-2 py-2 text-sm font-medium"
                    >
                      My orders
                    </Link>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/">
            <Image src="/logo.svg" alt="BEWEAR" width={100} height={26} priority />
          </Link>
        </div>

        {/* Center: desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="text-foreground/70 hover:text-foreground text-sm font-medium tracking-wide transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Right: account + cart */}
        <div className="flex items-center gap-1">
          {session?.user ? (
            <div className="hidden items-center gap-1 md:flex">
              <Link href="/my-orders" aria-label="My orders">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.user?.image as string | undefined}
                  />
                  <AvatarFallback className="text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Sign out"
                onClick={() => authClient.signOut()}
              >
                <LogOutIcon />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:inline-flex"
              aria-label="Sign in"
            >
              <Link href="/authentication">
                <UserIcon />
              </Link>
            </Button>
          )}
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Header;
