import { PageIntro } from "@/components/ui/PageIntro";
import { Prose } from "@/components/ui/Prose";
import { akreditasi } from "@/content/profil";
import { getHalaman } from "@/lib/content/repository";
import { buatMetadata } from "@/lib/seo";

const halaman = getHalaman("akreditasi");

export const metadata = buatMetadata({ judul: halaman.data.judul, deskripsi: halaman.data.deskripsi, path: "/profil/akreditasi" });

export default function AkreditasiPage() {
  const rincian: readonly [string, string][] = [
    ["Predikat", akreditasi.predikat],
    ["Lembaga", akreditasi.lembaga],
    ["Nomor SK", akreditasi.nomorSk],
    ["Tahun penetapan", String(akreditasi.tahun)],
    ["Berlaku sampai", akreditasi.berlakuSampai],
  ];
  return (
    <>
      <PageIntro
        id="akreditasi-judul"
        judul={halaman.data.judul}
        remah={[{ label: "Profil", href: "/profil" }, { label: halaman.data.judul }]}
        lead={halaman.data.deskripsi}
      />
      <section className="section section--rule" aria-labelledby="status-judul">
        <div className="container split">
          <div>
            <h2 id="status-judul" className="label label--muted">
              Peringkat saat ini
            </h2>
            <p className="big-figure" aria-label={`Peringkat ${akreditasi.peringkat}`}>
              {akreditasi.peringkat}
            </p>
          </div>
          <dl className="contact-grid">
            {rincian.map(([label, nilai]) => (
              <div className="contact-item" key={label}>
                <dt className="label label--accent">{label}</dt>
                <dd>{nilai}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="section section--rule" aria-labelledby="riwayat-judul">
        <div className="container split">
          <h2 id="riwayat-judul" className="label label--muted">
            Riwayat akreditasi
          </h2>
          <div className="grid gap-8">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Tahun</th>
                  <th scope="col" className="num">
                    Peringkat
                  </th>
                </tr>
              </thead>
              <tbody>
                {akreditasi.riwayat.map((r) => (
                  <tr key={r.tahun}>
                    <td>{r.tahun}</td>
                    <td className="num">{r.peringkat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Prose markdown={halaman.body} />
          </div>
        </div>
      </section>
    </>
  );
}
