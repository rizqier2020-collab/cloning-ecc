import { PageIntro } from "@/components/ui/PageIntro";
import { Prose } from "@/components/ui/Prose";
import { getProgramUnggulan } from "@/lib/content/repository";
import { buatMetadata } from "@/lib/seo";

export const metadata = buatMetadata({
  judul: "Program Unggulan",
  deskripsi: "Tiga program unggulan madrasah: Tahfiz Al-Qur'an, Bahasa Arab & Inggris, serta Sains & Teknologi.",
  path: "/akademik/program-unggulan",
});

export default function ProgramUnggulanPage() {
  const program = getProgramUnggulan();
  return (
    <>
      <PageIntro
        id="program-judul"
        judul="Program Unggulan"
        remah={[{ label: "Akademik", href: "/akademik" }, { label: "Program Unggulan" }]}
        lead="Tiga program yang menjadi ciri lulusan Al-Hikmah."
      />
      {program.map((p) => (
        <section className="section section--rule" id={p.slug} aria-labelledby={`${p.slug}-judul`} key={p.slug}>
          <div className="container split">
            <div className="program border-t-0 pt-0">
              <span className="program__num" aria-hidden="true">
                {String(p.data.urutan).padStart(2, "0")}
              </span>
              <h2 id={`${p.slug}-judul`} className="h3">
                {p.data.judul}
              </h2>
              <p>{p.data.ringkasan}</p>
            </div>
            <Prose markdown={p.body} />
          </div>
        </section>
      ))}
    </>
  );
}
