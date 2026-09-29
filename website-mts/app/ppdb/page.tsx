import { PpdbSteps } from "@/components/home/PpdbSteps";
import { PageIntro } from "@/components/ui/PageIntro";
import { Prose } from "@/components/ui/Prose";
import { alurPpdb, biayaPpdb, faqPpdb, jalurPpdb, syaratPpdb } from "@/content/ppdb";
import { getHalaman } from "@/lib/content/repository";
import { getPpdbInfo } from "@/lib/ppdb";
import { DaftarButton } from "@/components/ui/DaftarButton";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const info = getPpdbInfo(site.ppdb);
const halaman = getHalaman("ppdb");

export const metadata = buatMetadata({
  judul: info.judul,
  deskripsi: `${info.judul} ${site.nama}: ${info.statusLabel.toLowerCase()}, periode ${info.periode}. Syarat, jadwal, biaya, alur, dan tanya jawab.`,
  path: "/ppdb",
});

function Seksi({ id, judul, children }: { readonly id: string; readonly judul: string; readonly children: React.ReactNode }) {
  return (
    <section className="section section--rule" id={id} aria-labelledby={`${id}-judul`}>
      <div className="container split">
        <h2 id={`${id}-judul`} className="label label--muted">
          {judul}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function PpdbPage() {
  const { formulir } = info;
  return (
    <>
      <PageIntro
        id="ppdb-judul"
        judul={
          <>
            PPDB
            <br />
            {site.ppdb.tahunAjaran}
          </>
        }
        lead={`Penerimaan peserta didik baru kelas 7. Kuota ${site.ppdb.kuota} siswa untuk ${site.ppdb.rombel} rombel.`}
      >
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="status-block" id="formulir" role="region" aria-labelledby="formulir-judul">
            <p className="label label--accent">Status: {info.statusLabel}</p>
            <h2 id="formulir-judul" className="status-block__title">
              {formulir.judul}
            </h2>
            <p className="text-muted">{formulir.teks}</p>
            <div className="btn-row mt-2">
              {formulir.bisaDaftar && formulir.href ? (
                <DaftarButton href={formulir.href} eksternal={formulir.eksternal} />
              ) : (
                <a className="btn btn--solid" href={site.kontak.whatsapp.tautan}>
                  Tanya panitia via WhatsApp
                </a>
              )}
              {site.ppdb.brosur ? (
                <a className="btn btn--line" href={site.ppdb.brosur}>
                  Unduh brosur <span className="sr-only">(PDF)</span>
                </a>
              ) : null}
            </div>
          </div>
          <Prose markdown={halaman.body} className="prose--lead" />
        </div>
      </PageIntro>

      <Seksi id="jadwal" judul="Jadwal">
        <PpdbSteps tampilKeterangan />
      </Seksi>

      <Seksi id="syarat" judul="Syarat">
        <ol className="steps">
          {syaratPpdb.map((s, i) => (
            <li className="step" key={s}>
              <span className="step__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </Seksi>

      <Seksi id="jalur" judul="Jalur pendaftaran">
        <ul className="programs">
          {jalurPpdb.map((j) => (
            <li className="program" key={j.nama}>
              <h3 className="h3">{j.nama}</h3>
              <p>{j.keterangan}</p>
            </li>
          ))}
        </ul>
      </Seksi>

      <Seksi id="biaya" judul="Biaya">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Komponen</th>
                <th scope="col" className="num">
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody>
              {biayaPpdb.map((b) => (
                <tr key={b.komponen}>
                  <td>
                    <span className="font-bold">{b.komponen}</span>
                    {b.catatan ? <span className="block text-muted text-sm mt-1">{b.catatan}</span> : null}
                  </td>
                  <td className="num">{b.nilai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note mt-4">Nilai biaya adalah contoh dan akan diumumkan panitia.</p>
      </Seksi>

      <Seksi id="alur" judul="Alur pendaftaran">
        <ol className="steps">
          {alurPpdb.map((a, i) => (
            <li className="step" key={a.judul}>
              <span className="step__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="h3">{a.judul}</h3>
                <p className="text-muted">{a.teks}</p>
              </div>
            </li>
          ))}
        </ol>
      </Seksi>

      <Seksi id="faq" judul="Tanya jawab">
        <div className="faq">
          {faqPpdb.map((f) => (
            <details key={f.tanya}>
              <summary>{f.tanya}</summary>
              <p>{f.jawab}</p>
            </details>
          ))}
        </div>
      </Seksi>
    </>
  );
}
