import { WorkCard } from "@/components/home/WorkCard";
import { FilterableList } from "@/components/ui/FilterableList";
import { PageIntro } from "@/components/ui/PageIntro";
import { getBerita } from "@/lib/content/repository";
import { KATEGORI_BERITA } from "@/lib/content/schemas";
import { formatTanggal } from "@/lib/date";
import { buatMetadata } from "@/lib/seo";

export const metadata = buatMetadata({
  judul: "Berita",
  deskripsi: "Berita kegiatan, prestasi, dan kabar terbaru MTs Contoh Al-Hikmah.",
  path: "/informasi/berita",
});

export default function BeritaPage() {
  const berita = getBerita();
  return (
    <>
      <PageIntro
        id="berita-judul"
        judul="Berita"
        remah={[{ label: "Informasi", href: "/informasi" }, { label: "Berita" }]}
        lead="Kabar kegiatan belajar, ibadah, dan prestasi siswa."
      />
      <section className="pb-16 lg:pb-24" aria-label="Daftar berita">
        <div className="container">
          <FilterableList
            ariaLabel="Saring berita berdasarkan kategori"
            satuan="berita"
            listClassName="card-grid"
            itemClassName="card-grid__item"
            options={KATEGORI_BERITA.map((k) => ({ value: k.toLowerCase(), label: k }))}
            items={berita.map((b) => ({
              key: b.slug,
              kategori: b.data.kategori.toLowerCase(),
              node: (
                <WorkCard
                  href={`/informasi/berita/${b.slug}`}
                  judul={b.data.judul}
                  alt={b.data.alt}
                  src={b.data.sampul}
                  rasio="wide"
                  kategori={b.data.kategori}
                  ringkasan={b.data.ringkasan}
                  headingLevel="h2"
                  meta={<time dateTime={b.data.tanggal}>{formatTanggal(b.data.tanggal)}</time>}
                />
              ),
            }))}
          />
        </div>
      </section>
    </>
  );
}
