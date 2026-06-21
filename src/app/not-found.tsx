import Link from "next/link";

import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main
        id="main-content"
        className="container-bw flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center"
      >
        <p className="text-eyebrow-brand">404</p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Page not found
        </h1>
        <p className="text-muted-foreground max-w-md text-sm md:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button asChild size="lg" className="mt-2 rounded-full">
          <Link href="/">Back to store</Link>
        </Button>
      </main>
    </div>
  );
};

export default NotFound;
