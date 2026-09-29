import type { Metadata } from "next";
import Link from "next/link";
import { IndexList } from "@/components/ui/IndexList";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section page-intro" aria-labelledby="nf-judul">
      <div className="container">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1 id="nf-judul" className="h2 mt-8">
          Halaman tidak ditemukan
        </h1>
        <p className="lead page-intro__lead">
          Alamat yang Anda buka mungkin salah ketik atau halamannya sudah dipindahkan.
        </p>
        <p className="mt-6">
          <Link className="btn btn--solid" href="/">
            Kembali ke beranda
          </Link>
        </p>
        <div className="mt-12">
          <IndexList
            items={[
              { href: "/informasi/berita", judul: "Berita", deskripsi: "Kabar terbaru madrasah." },
              { href: "/ppdb", judul: "PPDB", deskripsi: "Syarat, jadwal, dan alur pendaftaran." },
              { href: "/kontak", judul: "Kontak", deskripsi: "Hubungi madrasah." },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
