import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { getPrestasi } from "@/lib/content/repository";
import { formatTanggal } from "@/lib/date";
import { buatMetadata } from "@/lib/seo";

export const metadata = buatMetadata({
  judul: "Prestasi",
  deskripsi: "Prestasi siswa MTs Contoh Al-Hikmah di bidang keagamaan, akademik, seni, dan olahraga.",
  path: "/informasi/prestasi",
});

export default function PrestasiPage() {
  const list = getPrestasi();
  return (
    <>
      <PageIntro
        id="prestasi-judul"
        judul="Prestasi"
        remah={[{ label: "Informasi", href: "/informasi" }, { label: "Prestasi" }]}
        lead="Capaian siswa dari tingkat kabupaten hingga provinsi."
      />
      <section className="pb-16 lg:pb-24" aria-label="Daftar prestasi">
        <div className="container">
          <ul className="rows">
            {list.map((p) => (
              <li className="row" key={p.slug} id={p.slug}>
                <time className="notice__date" dateTime={p.data.tanggal}>
                  {formatTanggal(p.data.tanggal, "titik")}
                </time>
                <div className="row__main">
                  <h2 className="h3">{p.data.judul}</h2>
                  <p className="meta">
                    {p.data.peraih}
                    {p.data.penyelenggara ? ` · ${p.data.penyelenggara}` : ""}
                  </p>
                  {p.data.berita ? (
                    <p>
                      <Link className="link-arrow" href={`/informasi/berita/${p.data.berita}`}>
                        Baca berita <span aria-hidden="true">&nbsp;→</span>
                      </Link>
                    </p>
                  ) : null}
                </div>
                <p className="label label--accent">{p.data.tingkat}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
