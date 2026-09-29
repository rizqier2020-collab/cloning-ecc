import { WorkCard } from "@/components/home/WorkCard";
import { FilterableList } from "@/components/ui/FilterableList";
import { PageIntro } from "@/components/ui/PageIntro";
import { getAlbums } from "@/lib/content/repository";
import { KATEGORI_GALERI } from "@/lib/content/schemas";
import { formatTanggal } from "@/lib/date";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buatMetadata({
  judul: "Galeri Kegiatan",
  deskripsi: `Dokumentasi kegiatan belajar, ibadah, ekstrakurikuler, dan prestasi siswa ${site.nama}.`,
  path: "/galeri",
});

const LABEL_KATEGORI: Record<(typeof KATEGORI_GALERI)[number], string> = {
  akademik: "Akademik",
  keagamaan: "Keagamaan",
  ekstrakurikuler: "Ekstrakurikuler",
  prestasi: "Prestasi",
};

export default function GaleriPage() {
  const albums = getAlbums();
  return (
    <PageIntro
      id="galeri-judul"
      judul={
        <>
          Galeri
          <br />
          Kegiatan
        </>
      }
      lead={`Dokumentasi kegiatan belajar, ibadah, ekstrakurikuler, dan prestasi siswa ${site.nama}.`}
    >
      <FilterableList
        ariaLabel="Saring berdasarkan kategori"
        satuan="kegiatan"
        listClassName="gallery"
        itemClassName="gallery__item"
        options={KATEGORI_GALERI.map((k) => ({ value: k, label: LABEL_KATEGORI[k] }))}
        items={albums.map((a) => ({
          key: a.slug,
          kategori: a.data.kategori,
          node: (
            <WorkCard
              className="gallery__card"
              href={`/galeri/${a.slug}`}
              judul={a.data.judul}
              alt={a.data.alt}
              src={a.data.sampul}
              rasio={a.data.rasio}
              kategori={LABEL_KATEGORI[a.data.kategori]}
              labelFoto="[ foto kegiatan ]"
              headingLevel="h2"
              meta={
                <>
                  {a.data.tempat} · <time dateTime={a.data.tanggal}>{formatTanggal(a.data.tanggal, "bulan-tahun")}</time>
                </>
              }
            />
          ),
        }))}
      />
    </PageIntro>
  );
}
