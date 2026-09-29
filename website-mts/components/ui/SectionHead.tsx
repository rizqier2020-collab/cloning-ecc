import Link from "next/link";

interface SectionHeadProps {
  readonly id: string;
  readonly judul: string;
  readonly tautan?: { readonly href: string; readonly label: string };
  readonly accent?: boolean;
}

/** Eyebrow mono + tautan "SEMUA … →" di kanan. */
export function SectionHead({ id, judul, tautan, accent = false }: SectionHeadProps) {
  return (
    <div className="section-head">
      <h2 id={id} className={`label ${accent ? "label--accent" : "label--muted"}`}>
        {judul}
      </h2>
      {tautan ? (
        <Link className="link-arrow" href={tautan.href}>
          {tautan.label} <span aria-hidden="true">&nbsp;→</span>
        </Link>
      ) : null}
    </div>
  );
}
