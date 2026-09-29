import { PageIntro } from "@/components/ui/PageIntro";
import { getUnduhan } from "@/lib/content/repository";
import { formatTanggal } from "@/lib/date";
import { buatMetadata } from "@/lib/seo";

export const metadata = buatMetadata({
  judul: "Unduhan",
  deskripsi: "Unduh brosur PPDB, kalender akademik, dan formulir MTs Contoh Al-Hikmah dalam format PDF.",
  path: "/informasi/unduhan",
});

export default function UnduhanPage() {
  const list = getUnduhan();
  return (
    <>
      <PageIntro
        id="unduhan-judul"
        judul="Unduhan"
        remah={[{ label: "Informasi", href: "/informasi" }, { label: "Unduhan" }]}
        lead="Dokumen resmi madrasah dalam format PDF."
      />
      <section className="pb-16 lg:pb-24" aria-label="Daftar dokumen">
        <div className="container">
          <ul className="rows">
            {list.map((u) => (
              <li className="row" key={u.slug}>
                <p className="label label--muted">PDF{u.data.ukuran ? ` · ${u.data.ukuran}` : ""}</p>
                <div className="row__main">
                  <h2 className="h3">{u.data.judul}</h2>
                  <p className="text-muted">{u.data.keterangan}</p>
                  <p className="meta">
                    Diperbarui <time dateTime={u.data.tanggal}>{formatTanggal(u.data.tanggal)}</time>
                  </p>
                </div>
                {u.data.berkas ? (
                  <a className="btn btn--line" href={u.data.berkas} download>
                    Unduh <span className="sr-only">{u.data.judul} (PDF)</span>
                  </a>
                ) : (
                  <p className="label label--muted">Segera tersedia</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
