import type { CSSProperties } from "react";
import { Carousel } from "@/components/ui/Carousel";
import { Photo } from "@/components/ui/Photo";
import { Breadcrumb } from "@/components/ui/PageIntro";
import { RevealObserver } from "@/components/ui/Reveal";
import { getGuruPerKelompok, type Guru } from "@/lib/content/repository";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buatMetadata({
  judul: "Guru & Staf",
  deskripsi: `Pimpinan, guru mata pelajaran umum, guru PAI & Bahasa Arab, serta tenaga kependidikan ${site.nama}.`,
  path: "/profil/guru-staf",
});

const JEDA_REVEAL_MS = 120;

const BARIS: readonly { id: "umum" | "pai" | "tendik"; judul: string }[] = [
  { id: "umum", judul: "Guru Mata Pelajaran Umum" },
  { id: "pai", judul: "Guru PAI & Bahasa Arab" },
  { id: "tendik", judul: "Tenaga Kependidikan" },
];

function Person({ guru }: { readonly guru: Guru }) {
  return (
    <figure className="person">
      <Photo src={guru.data.foto} alt={guru.data.alt} ratio="portrait" tone="bw" label="[ foto B/W ]" sizes="232px" />
      <figcaption className="person__cap">
        <span className="person__name">{guru.data.nama}</span>
        <span className="person__role">{guru.data.jabatan}</span>
      </figcaption>
    </figure>
  );
}

export default function GuruStafPage() {
  const guru = getGuruPerKelompok();

  return (
    <>
      <RevealObserver />
      <section className="section page-intro" aria-labelledby="pimpinan-judul">
        <div className="container">
          <Breadcrumb items={[{ label: "Profil", href: "/profil" }, { label: "Guru & Staf" }]} />
          <h1 className="sr-only">Guru &amp; Staf {site.nama}</h1>
          <h2 id="pimpinan-judul" className="h2 leaders__title">
            Pimpinan Madrasah
          </h2>
          <ul className="leaders">
            {guru.pimpinan.map((p, i) => (
              <li className="leader" key={p.slug}>
                <Photo src={p.data.foto} alt={p.data.alt} ratio="portrait" tone="bw" label="[ foto B/W cutout ]" sizes="(min-width: 1024px) 25vw, 50vw" />
                <div className="leader__bio reveal" style={{ "--delay": `${i * JEDA_REVEAL_MS}ms` } as CSSProperties}>
                  <h3 className="leader__name">{p.data.nama}</h3>
                  <p className="label label--accent">{p.data.jabatan}</p>
                  {p.data.mulai_mengajar ? <p className="meta">Mengajar sejak {p.data.mulai_mengajar}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="tim-judul">
        <div className="container">
          <h2 id="tim-judul" className="h2">
            Guru &amp; Staf
          </h2>
          <p className="note team__note">
            Geser ke samping atau pakai tombol panah untuk melihat semua. Arahkan kursor atau fokus pada foto untuk
            melihat nama dan tugas.
          </p>
          {BARIS.map((baris) => (
            <Carousel key={baris.id} id={baris.id} judul={baris.judul}>
              {guru[baris.id].map((g) => (
                <li key={g.slug}>
                  <Person guru={g} />
                </li>
              ))}
            </Carousel>
          ))}
        </div>
      </section>
    </>
  );
}
