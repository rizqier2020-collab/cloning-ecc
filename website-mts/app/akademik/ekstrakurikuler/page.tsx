import { PageIntro } from "@/components/ui/PageIntro";
import { getEkstrakurikuler } from "@/lib/content/repository";
import { buatMetadata } from "@/lib/seo";

export const metadata = buatMetadata({
  judul: "Ekstrakurikuler",
  deskripsi: "Sepuluh ekstrakurikuler untuk mengembangkan minat dan bakat siswa, lengkap dengan jadwal dan pembina.",
  path: "/akademik/ekstrakurikuler",
});

export default function EkstrakurikulerPage() {
  const ekskul = getEkstrakurikuler();
  return (
    <>
      <PageIntro
        id="ekskul-judul"
        judul="Ekstrakurikuler"
        remah={[{ label: "Akademik", href: "/akademik" }, { label: "Ekstrakurikuler" }]}
        lead="Setiap siswa wajib mengikuti Pramuka di kelas 7 dan boleh memilih satu hingga dua kegiatan lain."
      />
      <section className="section section--rule" aria-labelledby="daftar-ekskul-judul">
        <div className="container">
          <h2 id="daftar-ekskul-judul" className="label label--muted section-head">
            {ekskul.length} kegiatan
          </h2>
          <ol className="programs">
            {ekskul.map((e) => (
              <li className="program" key={e.slug} id={e.slug}>
                <span className="program__num" aria-hidden="true">
                  {String(e.data.urutan).padStart(2, "0")}
                </span>
                <h3 className="h3">{e.data.nama}</h3>
                <p>{e.data.ringkasan}</p>
                <p className="meta">
                  {e.data.jadwal} · Pembina: {e.data.pembina}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
