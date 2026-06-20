import Image from "next/image";
import Link from "next/link";

type CampaignTile = {
  src: string;
  title: string;
  subtitle: string;
  href: string;
};

const SECONDARY: CampaignTile[] = [
  {
    src: "/home/campaign-2.jpg",
    title: "Everyday essentials",
    subtitle: "Built for the long run.",
    href: "/category/pants",
  },
  {
    src: "/home/campaign-3.jpg",
    title: "Move freely",
    subtitle: "Shorts that keep up.",
    href: "/category/shorts",
  },
];

const Tile = ({ tile }: { tile: CampaignTile }) => (
  <Link
    href={tile.href}
    className="group relative block aspect-[16/9] overflow-hidden rounded-3xl md:aspect-auto md:h-full"
  >
    <Image
      src={tile.src}
      alt={tile.title}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-6">
      <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
        {tile.title}
      </h3>
      <p className="text-sm text-white/80">{tile.subtitle}</p>
    </div>
  </Link>
);

const CampaignGrid = () => {
  return (
    <div className="container-bw grid gap-4 md:h-[560px] md:grid-cols-2">
      <Link
        href="/category/accessories"
        className="group relative block aspect-[4/5] overflow-hidden rounded-3xl md:aspect-auto md:h-full"
      >
        <Image
          src="/home/campaign-1.jpg"
          alt="Carry it all"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
            Campaign
          </p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Carry it all
          </h3>
          <p className="mt-1 text-sm text-white/80">
            Bags and accessories built to last.
          </p>
        </div>
      </Link>

      <div className="grid gap-4 md:h-full md:grid-rows-2">
        {SECONDARY.map((tile) => (
          <Tile key={tile.src} tile={tile} />
        ))}
      </div>
    </div>
  );
};

export default CampaignGrid;
