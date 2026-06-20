"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="text-eyebrow-brand">Error</p>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        Something went wrong
      </h1>
      <p className="text-muted-foreground max-w-md text-sm">
        An unexpected error occurred. Please try again.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} className="rounded-full">
          Try again
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/">Back to store</Link>
        </Button>
      </div>
    </div>
  );
};

export default Error;
