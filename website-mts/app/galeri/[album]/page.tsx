import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui/PageIntro";
import { Photo } from "@/components/ui/Photo";
import { Prose } from "@/components/ui/Prose";
import { getAlbum, getAlbums } from "@/lib/content/repository";
import { formatTanggal } from "@/lib/date";
import { buatMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAlbums().map((a) => ({ album: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/galeri/[album]">): Promise<Metadata> {
  const { album } = await params;
  const data = getAlbum(album);
  if (!data) return {};
  return buatMetadata({
    judul: `${data.data.judul} — Galeri`,
    deskripsi: `Album foto ${data.data.judul} di ${data.data.tempat}, ${formatTanggal(data.data.tanggal, "panjang")}.`,
    path: `/galeri/${data.slug}`,
  });
}

const RASIO_BERGANTI = ["portrait", "square", "tall", "wide"] as const;

export default async function AlbumPage({ params }: PageProps<"/galeri/[album]">) {
  const { album } = await params;
  const data = getAlbum(album);
  if (!data) notFound();

  return (
    <>
      <PageIntro
        id="album-judul"
        judul={data.data.judul}
        remah={[{ label: "Galeri", href: "/galeri" }, { label: data.data.judul }]}
      >
        <p className="label label--accent mt-6">
          {data.data.kategori} · {data.data.tempat} ·{" "}
          <time dateTime={data.data.tanggal}>{formatTanggal(data.data.tanggal, "panjang")}</time>
        </p>
        <Prose markdown={data.body} className="mt-6" />
      </PageIntro>
      <section className="pb-16 lg:pb-24" aria-label={`Foto ${data.data.judul}`}>
        <div className="container">
          <ul className="gallery">
            {data.data.foto.map((f, i) => (
              <li className="gallery__item" key={`${f.alt}-${i}`}>
                <figure>
                  <Photo
                    src={f.src}
                    alt={f.alt}
                    ratio={f.rasio ?? RASIO_BERGANTI[i % RASIO_BERGANTI.length]}
                    tone="color"
                    label={`[ foto ${String(i + 1).padStart(2, "0")} ]`}
                  />
                  {f.keterangan ? <figcaption className="meta photo-caption">{f.keterangan}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
          <p>
            <Link className="link-arrow" href="/galeri">
              <span aria-hidden="true">←&nbsp;</span> Semua kegiatan
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
