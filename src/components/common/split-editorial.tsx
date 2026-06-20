import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SplitTile = {
  src: string;
  title: string;
  href: string;
};

const TILES: SplitTile[] = [
  { src: "/home/split-1.jpg", title: "Move different.", href: "/category/sneakers" },
  { src: "/home/split-2.jpg", title: "Street ready.", href: "/category/jackets-hoodies" },
];

const SplitEditorial = () => {
  return (
    <div className="container-bw grid gap-4 md:grid-cols-2">
      {TILES.map((tile) => (
        <Link
          key={tile.src}
          href={tile.href}
          className="group relative block overflow-hidden rounded-3xl"
        >
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={tile.src}
              alt={tile.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-8">
              <h3 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                {tile.title}
              </h3>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                Shop now
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SplitEditorial;
