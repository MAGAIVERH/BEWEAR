import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const EditorialBanner = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[3/2] min-h-[360px] w-full md:aspect-[2/1]">
        <Image
          src="/home/banner-authentic.jpg"
          alt="Be authentic — the new BEWEAR collection"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

        <div className="container-bw absolute inset-0 flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
            BEWEAR
          </p>
          <h2 className="text-display mt-3 max-w-2xl text-white">
            Be authentic.
          </h2>
          <p className="mt-4 max-w-md text-white/80 md:text-lg">
            Pieces designed to move with you — from the gym to the street.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#new-arrivals">Shop the collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialBanner;
