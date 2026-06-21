"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
] as const;

type ProductFiltersProps = {
  availableColors: string[];
};

const ProductFilters = ({ availableColors }: ProductFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeColor = searchParams.get("color");
  const activeSort = searchParams.get("sort") ?? "featured";

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  const hasActiveFilters =
    Boolean(activeColor) ||
    activeSort !== "featured" ||
    Boolean(searchParams.get("minPrice")) ||
    Boolean(searchParams.get("maxPrice"));

  const pushParams = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    // Changing a filter or sort should reset back to the first page.
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const toggleColor = (color: string) => {
    pushParams((params) => {
      if (activeColor === color) {
        params.delete("color");
      } else {
        params.set("color", color);
      }
    });
  };

  const handleSortChange = (value: string) => {
    pushParams((params) => {
      if (value === "featured") {
        params.delete("sort");
      } else {
        params.set("sort", value);
      }
    });
  };

  const applyPriceRange = (event: React.FormEvent) => {
    event.preventDefault();
    pushParams((params) => {
      if (minPrice) params.set("minPrice", minPrice);
      else params.delete("minPrice");
      if (maxPrice) params.set("maxPrice", maxPrice);
      else params.delete("maxPrice");
    });
  };

  const clearAll = () => {
    setMinPrice("");
    setMaxPrice("");
    router.push(pathname);
  };

  return (
    <div className="flex flex-col gap-4 border-y py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {availableColors.map((color) => {
          const isActive = activeColor === color;
          return (
            <button
              key={color}
              type="button"
              onClick={() => toggleColor(color)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition",
                isActive
                  ? "bg-foreground text-background border-foreground"
                  : "hover:border-foreground",
              )}
            >
              {color}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <form onSubmit={applyPriceRange} className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Min $"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            className="h-9 w-20"
          />
          <span className="text-muted-foreground text-xs">–</span>
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Max $"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className="h-9 w-20"
          />
          <Button type="submit" variant="outline" size="sm">
            Apply
          </Button>
        </form>

        <label className="sr-only" htmlFor="sort">
          Sort products
        </label>
        <select
          id="sort"
          value={activeSort}
          onChange={(event) => handleSortChange(event.target.value)}
          className="border-input bg-background h-9 rounded-md border px-3 text-sm shadow-xs focus-visible:ring-2 focus-visible:outline-none"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
