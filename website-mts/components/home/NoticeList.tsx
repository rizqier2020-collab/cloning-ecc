import Link from "next/link";
import type { Pengumuman } from "@/lib/content/repository";
import { formatTanggal } from "@/lib/date";

/** Tag pengumuman: "Penting" beraksen, selain itu kategori abu. Tidak hanya warna. */
export function NoticeTag({ item }: { readonly item: Pengumuman }) {
  return item.data.penting ? (
    <span className="notice__tag label label--accent">Penting</span>
  ) : (
    <span className="notice__tag label label--muted">{item.data.kategori}</span>
  );
}

/** Daftar pengumuman ringkas (beranda): seluruh baris satu tautan. */
export function NoticeList({ items }: { readonly items: readonly Pengumuman[] }) {
  return (
    <ul className="notice-list">
      {items.map((item) => (
        <li key={item.slug}>
          <Link className="notice" href={`/informasi/pengumuman#${item.slug}`}>
            <time className="notice__date" dateTime={item.data.tanggal}>
              {formatTanggal(item.data.tanggal, "titik")}
            </time>
            <span className="notice__title">{item.data.judul}</span>
            <NoticeTag item={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
