import { Photo } from "@/components/ui/Photo";
import { IndexList } from "@/components/ui/IndexList";
import { PageIntro } from "@/components/ui/PageIntro";
import { Prose } from "@/components/ui/Prose";
import { akreditasi } from "@/content/profil";
import { getGuruPerKelompok, getHalaman } from "@/lib/content/repository";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buatMetadata({
  judul: "Profil",
  deskripsi: `Profil ${site.nama}: sambutan kepala madrasah, identitas, sejarah, visi & misi, struktur organisasi, akreditasi, serta guru dan staf.`,
  path: "/profil",
});

const SUBHALAMAN = [
  { href: "/profil/sejarah", judul: "Sejarah", deskripsi: `Perjalanan madrasah sejak berdiri pada ${site.tahunBerdiri}.` },
  { href: "/profil/visi-misi", judul: "Visi & Misi", deskripsi: "Arah, misi, dan tujuan pendidikan madrasah." },
  { href: "/profil/struktur-organisasi", judul: "Struktur Organisasi", deskripsi: "Yayasan, pimpinan, dan pengelola madrasah." },
  { href: "/profil/akreditasi", judul: "Akreditasi", deskripsi: "Status dan riwayat akreditasi dari BAN-PDM." },
  { href: "/profil/guru-staf", judul: "Guru & Staf", deskripsi: "Pimpinan, guru mata pelajaran, dan tenaga kependidikan." },
];

export default function ProfilPage() {
  const sambutan = getHalaman("sambutan");
  const kepala = getGuruPerKelompok().pimpinan[0];
  const identitas: readonly [string, string][] = [
    ["Nama madrasah", site.nama],
    ["NSM", site.nsm],
    ["NPSN", site.npsn],
    ["Tahun berdiri", String(site.tahunBerdiri)],
    ["Akreditasi", `${akreditasi.peringkat} (${akreditasi.predikat}), ${akreditasi.tahun}`],
    ["Alamat", `${site.alamat.jalan}, ${site.alamat.kota}, ${site.alamat.provinsi} ${site.alamat.kodePos}`],
  ];

  return (
    <>
      <PageIntro
        id="profil-judul"
        judul="Profil"
        lead={`Mengenal ${site.nama}: sejarah, visi, orang-orang di baliknya, dan identitas resmi madrasah.`}
      />

      <section className="section section--rule" aria-labelledby="sambutan-judul">
        <div className="container split">
          <div>
            <h2 id="sambutan-judul" className="label label--muted">
              {sambutan.data.judul}
            </h2>
            {kepala ? (
              <figure className="mt-6 max-w-60">
                <Photo alt={kepala.data.alt} src={kepala.data.foto} ratio="portrait" tone="bw" label="[ foto B/W ]" />
                <figcaption className="leader__bio">
                  <span className="leader__name">{kepala.data.nama}</span>
                  <span className="label label--accent">{kepala.data.jabatan}</span>
                </figcaption>
              </figure>
            ) : null}
          </div>
          <Prose markdown={sambutan.body} className="prose--lead" />
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="identitas-judul">
        <div className="container split">
          <h2 id="identitas-judul" className="label label--muted">
            Identitas madrasah
          </h2>
          <dl className="contact-grid">
            {identitas.map(([label, nilai]) => (
              <div className="contact-item" key={label}>
                <dt className="label label--accent">{label}</dt>
                <dd>{nilai}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="sub-profil-judul">
        <div className="container">
          <h2 id="sub-profil-judul" className="label label--muted section-head">
            Selengkapnya
          </h2>
          <IndexList items={SUBHALAMAN} />
        </div>
      </section>
    </>
  );
}
