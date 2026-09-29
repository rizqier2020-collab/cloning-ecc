import { NoticeTag } from "@/components/home/NoticeList";
import { PageIntro } from "@/components/ui/PageIntro";
import { Prose } from "@/components/ui/Prose";
import { getPengumuman } from "@/lib/content/repository";
import { formatTanggal } from "@/lib/date";
import { buatMetadata } from "@/lib/seo";

export const metadata = buatMetadata({
  judul: "Pengumuman",
  deskripsi: "Pengumuman resmi MTs Contoh Al-Hikmah untuk siswa, orang tua, dan masyarakat.",
  path: "/informasi/pengumuman",
});

export default function PengumumanPage() {
  const list = getPengumuman();
  return (
    <>
      <PageIntro
        id="pengumuman-judul"
        judul="Pengumuman"
        remah={[{ label: "Informasi", href: "/informasi" }, { label: "Pengumuman" }]}
        lead="Informasi resmi untuk siswa dan orang tua, terbaru di atas."
      />
      <section className="pb-16 lg:pb-24" aria-label="Daftar pengumuman">
        <div className="container">
          <ul className="notice-list">
            {list.map((p) => (
              <li key={p.slug}>
                <article className="notice" id={p.slug} aria-labelledby={`${p.slug}-judul`}>
                  <time className="notice__date" dateTime={p.data.tanggal}>
                    {formatTanggal(p.data.tanggal, "titik")}
                  </time>
                  <h2 id={`${p.slug}-judul`} className="notice__title">
                    {p.data.judul}
                  </h2>
                  <NoticeTag item={p} />
                  <div className="notice__body">
                    <Prose markdown={p.body} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
