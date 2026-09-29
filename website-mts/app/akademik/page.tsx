import { IndexList } from "@/components/ui/IndexList";
import { PageIntro } from "@/components/ui/PageIntro";
import { getProgramUnggulan } from "@/lib/content/repository";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buatMetadata({
  judul: "Akademik",
  deskripsi: `Kurikulum, mata pelajaran umum dan PAI, program unggulan, serta ekstrakurikuler ${site.nama}.`,
  path: "/akademik",
});

const SUBHALAMAN = [
  { href: "/akademik/kurikulum", judul: "Kurikulum", deskripsi: "Kurikulum Merdeka dengan ciri khas madrasah dan waktu belajar." },
  { href: "/akademik/mata-pelajaran", judul: "Mata Pelajaran", deskripsi: "Mata pelajaran umum, PAI, Bahasa Arab, dan muatan lokal." },
  { href: "/akademik/program-unggulan", judul: "Program Unggulan", deskripsi: "Tahfiz Al-Qur'an, bahasa, serta sains & teknologi." },
  { href: "/akademik/ekstrakurikuler", judul: "Ekstrakurikuler", deskripsi: "Sepuluh kegiatan pengembangan minat dan bakat siswa." },
];

export default function AkademikPage() {
  const program = getProgramUnggulan();
  return (
    <>
      <PageIntro
        id="akademik-judul"
        judul="Akademik"
        lead="Belajar ilmu umum dan agama secara seimbang, dengan pembiasaan ibadah, tahfiz, dan bahasa setiap hari."
      />
      <section className="section section--rule" aria-labelledby="sub-akademik-judul">
        <div className="container">
          <h2 id="sub-akademik-judul" className="label label--muted section-head">
            Bagian akademik
          </h2>
          <IndexList items={SUBHALAMAN} />
        </div>
      </section>
      <section className="section section--rule" aria-labelledby="program-judul">
        <div className="container">
          <h2 id="program-judul" className="label label--muted section-head">
            Program unggulan
          </h2>
          <ol className="programs">
            {program.map((p) => (
              <li className="program" key={p.slug}>
                <span className="program__num" aria-hidden="true">
                  {String(p.data.urutan).padStart(2, "0")}
                </span>
                <h3 className="h3">{p.data.judul}</h3>
                <p>{p.data.ringkasan}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
