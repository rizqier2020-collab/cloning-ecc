import Link from "next/link";
import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
import type { Rasio } from "@/lib/content/schemas";

interface WorkCardProps {
  readonly href: string;
  readonly judul: string;
  readonly meta: ReactNode;
  readonly alt: string;
  readonly src?: string;
  readonly rasio: Rasio;
  readonly kategori?: string;
  readonly ringkasan?: string;
  readonly labelFoto?: string;
  readonly headingLevel?: "h2" | "h3";
  readonly className?: string;
}

/** Kartu "karya": foto (zoom halus), kategori, judul huruf besar, meta miring, garis rambut. */
export function WorkCard({
  href,
  judul,
  meta,
  alt,
  src,
  rasio,
  kategori,
  ringkasan,
  labelFoto = "[ foto berita ]",
  headingLevel = "h3",
  className = "",
}: WorkCardProps) {
  const Heading = headingLevel;
  return (
    <Link className={["work zoom", className].filter(Boolean).join(" ")} href={href}>
      <div className="media">
        <Photo src={src} alt={alt} ratio={rasio} tone="color" label={labelFoto} />
      </div>
      <div className="work__body">
        {kategori ? <p className="work__cat label label--accent">{kategori}</p> : null}
        <Heading className="work__title">{judul}</Heading>
        <p className="meta work__meta">{meta}</p>
        {ringkasan ? <p className="work__excerpt">{ringkasan}</p> : null}
      </div>
    </Link>
  );
}
