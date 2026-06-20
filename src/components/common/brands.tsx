import Image from "next/image";

import Marquee from "./marquee";

interface BrandsProps {
  title: string;
}

const BRANDS = [
  { src: "/nike.svg", name: "Nike" },
  { src: "/adidas.svg", name: "Adidas" },
  { src: "/puma.svg", name: "Puma" },
  { src: "/newbalance.svg", name: "New Balance" },
  { src: "/converse.svg", name: "Converse" },
  { src: "/polo.svg", name: "Polo" },
  { src: "/zara.svg", name: "Zara" },
] as const;

const Brands = ({ title }: BrandsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="section-title px-5">{title}</h3>

      <Marquee gapClassName="gap-10 md:gap-16">
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="flex min-w-[96px] flex-col items-center justify-center gap-2"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={72}
              height={72}
              className="h-16 w-16 object-contain opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
            <span className="text-muted-foreground text-center text-xs font-medium">
              {brand.name}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Brands;
