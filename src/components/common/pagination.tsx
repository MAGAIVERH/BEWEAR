"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

type PaginationProps = {
  totalPages: number;
};

const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = Math.min(
    Math.max(1, Number(searchParams.get("page") ?? 1)),
    totalPages,
  );

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={current <= 1}
        onClick={() => goToPage(current - 1)}
        className="hover:bg-accent flex h-9 w-9 items-center justify-center rounded-full border transition disabled:opacity-40"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === current ? "page" : undefined}
          onClick={() => goToPage(page)}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition",
            page === current
              ? "bg-foreground text-background"
              : "hover:bg-accent border",
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={current >= totalPages}
        onClick={() => goToPage(current + 1)}
        className="hover:bg-accent flex h-9 w-9 items-center justify-center rounded-full border transition disabled:opacity-40"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Pagination;
