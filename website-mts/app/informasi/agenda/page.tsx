import { AgendaRows } from "@/components/home/AgendaRows";
import { PageIntro } from "@/components/ui/PageIntro";
import { pisahAgenda } from "@/lib/collections";
import { getAgenda } from "@/lib/content/repository";
import { hariIniIso } from "@/lib/date";
import { buatMetadata } from "@/lib/seo";
import { getUnduhan } from "@/lib/content/repository";

export const metadata = buatMetadata({
  judul: "Agenda",
  deskripsi: "Kalender kegiatan MTs Contoh Al-Hikmah: ujian, libur, dan acara madrasah.",
  path: "/informasi/agenda",
});

export default function AgendaPage() {
  const { akanDatang, selesai } = pisahAgenda(
    getAgenda().map((a) => ({ ...a, mulai: a.data.mulai, selesai: a.data.selesai })),
    hariIniIso(),
  );
  const kalender = getUnduhan().find((u) => u.data.berkas?.includes("kalender"));

  return (
    <>
      <PageIntro
        id="agenda-judul"
        judul="Agenda"
        remah={[{ label: "Informasi", href: "/informasi" }, { label: "Agenda" }]}
        lead="Jadwal ujian, libur, dan kegiatan madrasah."
      >
        {kalender?.data.berkas ? (
          <p className="mt-6">
            <a className="btn btn--line" href={kalender.data.berkas}>
              Unduh {kalender.data.judul} <span className="sr-only">(PDF)</span>
            </a>
          </p>
        ) : null}
      </PageIntro>
      <section className="section section--rule" aria-labelledby="akan-datang-judul">
        <div className="container">
          <h2 id="akan-datang-judul" className="label label--accent section-head">
            Akan datang
          </h2>
          {akanDatang.length ? <AgendaRows items={akanDatang} /> : <p className="note">Belum ada agenda terjadwal.</p>}
        </div>
      </section>
      {selesai.length ? (
        <section className="section section--rule" aria-labelledby="selesai-judul">
          <div className="container">
            <h2 id="selesai-judul" className="label label--muted section-head">
              Telah berlangsung
            </h2>
            <AgendaRows items={selesai} />
          </div>
        </section>
      ) : null}
    </>
  );
}
