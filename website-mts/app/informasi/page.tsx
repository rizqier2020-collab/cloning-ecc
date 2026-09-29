import { IndexList } from "@/components/ui/IndexList";
import { PageIntro } from "@/components/ui/PageIntro";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buatMetadata({
  judul: "Informasi",
  deskripsi: `Berita, pengumuman, agenda, prestasi siswa, dan unduhan dokumen ${site.nama}.`,
  path: "/informasi",
});

const SUBHALAMAN = [
  { href: "/informasi/berita", judul: "Berita", deskripsi: "Kabar kegiatan dan prestasi madrasah." },
  { href: "/informasi/pengumuman", judul: "Pengumuman", deskripsi: "Informasi resmi untuk siswa dan orang tua." },
  { href: "/informasi/agenda", judul: "Agenda", deskripsi: "Kalender ujian, libur, dan acara madrasah." },
  { href: "/informasi/prestasi", judul: "Prestasi", deskripsi: "Capaian siswa di tingkat kabupaten hingga nasional." },
  { href: "/informasi/unduhan", judul: "Unduhan", deskripsi: "Brosur, kalender akademik, dan formulir (PDF)." },
];

export default function InformasiPage() {
  return (
    <>
      <PageIntro id="informasi-judul" judul="Informasi" lead="Semua kabar resmi madrasah di satu tempat." />
      <section className="section section--rule" aria-labelledby="sub-informasi-judul">
        <div className="container">
          <h2 id="sub-informasi-judul" className="label label--muted section-head">
            Pilih informasi
          </h2>
          <IndexList items={SUBHALAMAN} />
        </div>
      </section>
    </>
  );
}
