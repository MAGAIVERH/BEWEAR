import { InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Link from "next/link";

import NewsletterForm from "./newsletter-form";

const SHOP_LINKS = [
  { label: "New arrivals", href: "/#new-arrivals" },
  { label: "Best sellers", href: "/#best-sellers" },
  { label: "Featured brands", href: "/" },
];

const HELP_LINKS = [
  { label: "Shipping", href: "#" },
  { label: "Returns", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Sustainability", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
];

const Footer = () => {
  return (
    <footer className="bg-muted/40 mt-16 border-t">
      <div className="px-5 py-12 md:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + newsletter */}
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-xl font-black tracking-tight">BEWEAR</h2>
            <p className="text-muted-foreground text-sm leading-6">
              Premium streetwear, sneakers and accessories — engineered for
              everyday motion.
            </p>
            <NewsletterForm />
          </div>

          {/* Link columns */}
          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Help" links={HELP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          <div className="text-muted-foreground text-center text-xs">
            <p>© 2025 BEWEAR. All rights reserved.</p>
            <p>
              Built by{" "}
              <a
                href="https://my-portifolio-three-navy.vercel.app/#s-home"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:underline"
              >
                Magaiver Magalhães
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-[0.18em] uppercase">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
