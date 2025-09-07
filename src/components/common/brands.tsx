import Image from "next/image";

interface BrandsProps {
  title: string;
}

const Brands = ({ title }: BrandsProps) => {
  const brands = [
    { src: "/nike.svg", name: "Nike" },
    { src: "/adidas.svg", name: "Adidas" },
    { src: "/puma.svg", name: "Puma" },
    { src: "/newbalance.svg", name: "New Balance" },
    { src: "/converse.svg", name: "Converse" },
    { src: "/polo.svg", name: "Polo" },
    { src: "/zara.svg", name: "Zara" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="px-5 text-sm font-semibold">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex min-w-[100px] flex-col items-center justify-center space-y-2"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={80}
              height={80}
              className="object-contain"
            />

            <span className="text-center text-sm font-medium">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
