import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkCard } from "@/components/home/WorkCard";
import { Breadcrumb } from "@/components/ui/PageIntro";
import { Photo } from "@/components/ui/Photo";
import { Prose } from "@/components/ui/Prose";
import { getBerita, getBeritaBySlug } from "@/lib/content/repository";
import { formatTanggal } from "@/lib/date";
import { buatMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBerita().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/informasi/berita/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);
  if (!berita) return {};
  return buatMetadata({
    judul: berita.data.judul,
    deskripsi: berita.data.ringkasan,
    path: `/informasi/berita/${berita.slug}`,
    jenis: "article",
    terbit: berita.data.tanggal,
  });
}

const JUMLAH_LAINNYA = 3;

export default async function BeritaDetailPage({ params }: PageProps<"/informasi/berita/[slug]">) {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);
  if (!berita) notFound();

  const lainnya = getBerita()
    .filter((b) => b.slug !== berita.slug)
    .slice(0, JUMLAH_LAINNYA);

  return (
    <>
      <article className="section page-intro" aria-labelledby="artikel-judul">
        <div className="container">
          <header className="article__header">
            <Breadcrumb
              items={[
                { label: "Informasi", href: "/informasi" },
                { label: "Berita", href: "/informasi/berita" },
                { label: berita.data.judul },
              ]}
            />
            <p className="label label--accent">{berita.data.kategori}</p>
            <h1 id="artikel-judul" className="article__title">
              {berita.data.judul}
            </h1>
            <p className="meta">
              <time dateTime={berita.data.tanggal}>{formatTanggal(berita.data.tanggal, "panjang")}</time>
            </p>
            <p className="lead">{berita.data.ringkasan}</p>
          </header>
          <figure className="article__figure">
            <Photo
              src={berita.data.sampul}
              alt={berita.data.alt}
              ratio="wide"
              tone="color"
              label="[ foto berita ]"
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority
            />
            <figcaption className="note article__caption">{berita.data.alt}</figcaption>
          </figure>
          <Prose markdown={berita.body} />
          <p className="mt-12">
            <Link className="link-arrow" href="/informasi/berita">
              <span aria-hidden="true">←&nbsp;</span> Semua berita
            </Link>
          </p>
        </div>
      </article>

      {lainnya.length ? (
        <section className="section section--rule" aria-labelledby="lainnya-judul">
          <div className="container">
            <h2 id="lainnya-judul" className="label label--muted section-head">
              Berita lainnya
            </h2>
            <ul className="card-grid">
              {lainnya.map((b) => (
                <li key={b.slug}>
                  <WorkCard
                    href={`/informasi/berita/${b.slug}`}
                    judul={b.data.judul}
                    alt={b.data.alt}
                    src={b.data.sampul}
                    rasio="wide"
                    meta={
                      <>
                        <time dateTime={b.data.tanggal}>{formatTanggal(b.data.tanggal)}</time> · {b.data.kategori}
                      </>
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
