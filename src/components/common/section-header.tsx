import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

const SectionHeader = ({
  title,
  eyebrow,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" && "flex flex-col items-center text-center",
        className,
      )}
    >
      {eyebrow && <p className="text-eyebrow-brand">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
