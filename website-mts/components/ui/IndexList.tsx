import Link from "next/link";

export interface IndexEntry {
  readonly href: string;
  readonly judul: string;
  readonly deskripsi: string;
}

/** Daftar subhalaman bernomor dengan garis rambut (halaman induk Profil/Akademik/Informasi). */
export function IndexList({ items }: { readonly items: readonly IndexEntry[] }) {
  return (
    <ul className="index-list">
      {items.map((item, i) => (
        <li key={item.href}>
          <Link className="index-link" href={item.href}>
            <span className="index-link__num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="h3">{item.judul}</span>
            <span className="index-link__desc">{item.deskripsi}</span>
            <span className="index-link__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
