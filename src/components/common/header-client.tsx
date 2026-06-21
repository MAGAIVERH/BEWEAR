"use client";

import {
  HeartIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useWishlist } from "@/hooks/queries/use-wishlist";
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
import SearchBar from "./search-bar";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type HeaderClientProps = {
  categories: Category[];
};

const HeaderClient = ({ categories }: HeaderClientProps) => {
  const { data: session } = authClient.useSession();
  const { data: wishlist } = useWishlist();
  const wishlistCount = wishlist?.length ?? 0;
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

  const mobileMenu = (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-5">
          <SearchBar className="w-full" />

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
                  <h3 className="text-sm font-semibold">{session.user.name}</h3>
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
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="hover:bg-accent rounded-lg px-2 py-2 text-sm font-medium"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/wishlist"
              className="hover:bg-accent rounded-lg px-2 py-2 text-sm font-medium"
            >
              Wishlist
            </Link>
            {session?.user && (
              <>
                <Link
                  href="/account"
                  className="hover:bg-accent rounded-lg px-2 py-2 text-sm font-medium"
                >
                  Account
                </Link>
                <Link
                  href="/my-orders"
                  className="hover:bg-accent rounded-lg px-2 py-2 text-sm font-medium"
                >
                  My orders
                </Link>
              </>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header
      className={cn(
        "bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
        {/* Left: logo */}
        <Link href="/" className="justify-self-start">
          <Image src="/logo.svg" alt="BEWEAR" width={100} height={26} priority />
        </Link>

        {/* Center: desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group/nav text-foreground/70 hover:text-foreground relative text-sm font-medium tracking-wide transition-colors"
            >
              {category.name}
              <span className="bg-foreground absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover/nav:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right: search + account (desktop) · menu + cart (mobile) */}
        <div className="flex items-center gap-1 justify-self-end sm:gap-2">
          <SearchBar className="hidden w-48 lg:block xl:w-64" />
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="Wishlist"
            className="relative hidden lg:inline-flex"
          >
            <Link href="/wishlist">
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="bg-foreground text-background absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>
          {session?.user ? (
            <div className="hidden items-center gap-1 lg:flex">
              <Link href="/account" aria-label="Account">
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
              className="hidden lg:inline-flex"
              aria-label="Sign in"
            >
              <Link href="/authentication">
                <UserIcon />
              </Link>
            </Button>
          )}
          {/* Mobile: menu then cart */}
          {mobileMenu}
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
