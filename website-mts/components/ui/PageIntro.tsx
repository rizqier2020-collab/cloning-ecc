import Link from "next/link";
import type { ReactNode } from "react";

export interface Remah {
  readonly label: string;
  readonly href?: string;
}

export function Breadcrumb({ items }: { readonly items: readonly Remah[] }) {
  return (
    <nav aria-label="Jejak halaman">
      <ol className="breadcrumb label label--muted">
        {items.map((item, i) => (
          <li key={item.label} aria-current={i === items.length - 1 ? "page" : undefined}>
            {item.href && i < items.length - 1 ? <Link href={item.href}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface PageIntroProps {
  readonly id: string;
  readonly judul: ReactNode;
  /** Tanpa remah → titik hitam kecil seperti mockup Galeri (halaman induk). */
  readonly remah?: readonly Remah[];
  readonly lead?: ReactNode;
  readonly children?: ReactNode;
}

/** Pembuka halaman: remah/titik + judul display raksasa + paragraf pembuka. */
export function PageIntro({ id, judul, remah, lead, children }: PageIntroProps) {
  return (
    <section className="section page-intro" aria-labelledby={id}>
      <div className="container">
        {remah ? <Breadcrumb items={remah} /> : <span className="display__dot" aria-hidden="true" />}
        <h1 id={id} className={["display", remah ? "page-intro__title" : ""].filter(Boolean).join(" ")}>
          {judul}
        </h1>
        {lead ? <p className="lead page-intro__lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
