import Link from "next/link";
import { AgendaRows } from "@/components/home/AgendaRows";
import { ContactGrid } from "@/components/home/ContactGrid";
import { NoticeList } from "@/components/home/NoticeList";
import { PpdbSteps } from "@/components/home/PpdbSteps";
import { StatRow } from "@/components/home/StatRow";
import { WorkCard } from "@/components/home/WorkCard";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHead } from "@/components/ui/SectionHead";
import { pisahAgenda } from "@/lib/collections";
import {
  getAgenda,
  getBerita,
  getEkstrakurikuler,
  getPengumuman,
  getProgramUnggulan,
} from "@/lib/content/repository";
import type { Rasio } from "@/lib/content/schemas";
import { formatTanggal, hariIniIso } from "@/lib/date";
import { getPpdbInfo } from "@/lib/ppdb";
import { DaftarButton } from "@/components/ui/DaftarButton";
import { site } from "@/lib/site";

const TATA_BERITA: readonly { kelas: string; rasio: Rasio }[] = [
  { kelas: "news-grid__a", rasio: "tall" },
  { kelas: "news-grid__b", rasio: "wide" },
  { kelas: "news-grid__c", rasio: "wide" },
];

export default function Beranda() {
  const berita = getBerita().slice(0, TATA_BERITA.length);
  const pengumuman = getPengumuman().slice(0, 3);
  const agenda = pisahAgenda(
    getAgenda().map((a) => ({ ...a, mulai: a.data.mulai, selesai: a.data.selesai })),
    hariIniIso(),
  ).akanDatang.slice(0, 3);
  const program = getProgramUnggulan();
  const ekskul = getEkstrakurikuler();
  const ppdb = getPpdbInfo(site.ppdb);

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-judul">
        <div className="ph hero__ph" role="img" aria-label="Foto gedung dan kegiatan madrasah (placeholder)">
          <span className="hero__ph-label" aria-hidden="true">
            [ foto gedung / kegiatan madrasah — full-bleed ]
          </span>
        </div>
        <div className="container hero__inner">
          <h1 id="hero-judul" className="hero__title">
            <span className="hero__wordmark">{site.namaPendek}</span>
            <span className="hero__sub">
              {site.jenjang} · {site.kota}
            </span>
          </h1>
        </div>
        <Marquee
          className="hero__marquee"
          groupClassName="marquee-text"
          durasi="40s"
          srContent={<p className="sr-only">Keunggulan: {site.keunggulan.join(", ")}.</p>}
        >
          {site.keunggulan.map((k) => (
            <span key={k} className="contents">
              <span>{k}</span>
              <span aria-hidden="true">·</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* BAR PENGUMUMAN PPDB */}
      <Link className="announce" href="/ppdb">
        <span className="container announce__inner">
          {ppdb.bar.bagian.map((teks, i) => (
            <span key={teks} className="contents">
              {i > 0 ? <span aria-hidden="true">·</span> : null}
              <span>{teks}</span>
            </span>
          ))}
          <span aria-hidden="true">·</span>
          <span className="announce__cta">
            {ppdb.bar.cta} <span aria-hidden="true">→</span>
          </span>
        </span>
      </Link>

      {/* KABAR MADRASAH */}
      <section className="section" id="kabar" aria-labelledby="kabar-judul">
        <div className="container">
          <SectionHead id="kabar-judul" judul="Kabar Madrasah" tautan={{ href: "/informasi/berita", label: "Semua berita" }} />
          <ul className="news-grid">
            {berita.map((b, i) => (
              <li key={b.slug} className={TATA_BERITA[i].kelas}>
                <WorkCard
                  href={`/informasi/berita/${b.slug}`}
                  judul={b.data.judul}
                  alt={b.data.alt}
                  src={b.data.sampul}
                  rasio={TATA_BERITA[i].rasio}
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

      {/* PENGUMUMAN */}
      <section className="section section--rule" aria-labelledby="pengumuman-judul">
        <div className="container">
          <SectionHead
            id="pengumuman-judul"
            judul="Pengumuman"
            tautan={{ href: "/informasi/pengumuman", label: "Semua pengumuman" }}
          />
          <NoticeList items={pengumuman} />
        </div>
      </section>

      {/* STATISTIK */}
      <section className="section section--rule" aria-labelledby="angka-judul">
        <div className="container">
          <h2 id="angka-judul" className="label label--muted section-head">
            Madrasah dalam angka
          </h2>
          <StatRow items={site.statistik} />
        </div>
      </section>

      {/* PROGRAM UNGGULAN */}
      <section className="section section--rule" id="program" aria-labelledby="program-judul">
        <div className="container">
          <SectionHead id="program-judul" judul="Program Unggulan" tautan={{ href: "/akademik/kurikulum", label: "Kurikulum" }} />
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

      {/* AGENDA */}
      <section className="section section--rule" aria-labelledby="agenda-judul">
        <div className="container">
          <SectionHead id="agenda-judul" judul="Agenda" tautan={{ href: "/informasi/agenda", label: "Kalender akademik" }} />
          {agenda.length ? (
            <AgendaRows items={agenda} />
          ) : (
            <p className="note">Belum ada agenda terdekat.</p>
          )}
        </div>
      </section>

      {/* EKSTRAKURIKULER */}
      <section className="section section--rule ekskul" aria-labelledby="ekskul-judul">
        <h2 id="ekskul-judul" className="label label--muted ekskul__title">
          Ekstrakurikuler
        </h2>
        <Marquee
          durasi="50s"
          srContent={
            <ul className="sr-only">
              {ekskul.map((e) => (
                <li key={e.slug}>{e.data.nama}</li>
              ))}
            </ul>
          }
        >
          {ekskul.map((e) => (
            <span className="tile" key={e.slug}>
              <span className="tile__num">{String(e.data.urutan).padStart(2, "0")}</span>
              {e.data.nama}
            </span>
          ))}
        </Marquee>
      </section>

      {/* PPDB */}
      <section className="section section--canvas ppdb" id="ppdb" aria-labelledby="ppdb-judul">
        <div className="container ppdb__grid">
          <div>
            <p className="label label--accent">Penerimaan peserta didik baru · {ppdb.statusLabel}</p>
            <h2 id="ppdb-judul" className="display ppdb__title">
              PPDB
              <br />
              {site.ppdb.tahunAjaran}
            </h2>
            <p className="lead ppdb__lead">
              Kuota {site.ppdb.kuota} siswa untuk {site.ppdb.rombel} rombel kelas 7. Pendaftaran online, gratis, dan
              bisa dari HP.
            </p>
            <div className="btn-row">
              {ppdb.formulir.bisaDaftar && ppdb.formulir.href ? (
                <DaftarButton href={ppdb.formulir.href} eksternal={ppdb.formulir.eksternal} />
              ) : (
                <Link className="btn btn--solid" href="/ppdb">
                  Info pendaftaran <span aria-hidden="true">→</span>
                </Link>
              )}
              {site.ppdb.brosur ? (
                <a className="btn btn--line" href={site.ppdb.brosur}>
                  Unduh brosur <span className="sr-only">(PDF)</span>
                </a>
              ) : null}
            </div>
          </div>
          <PpdbSteps />
        </div>
      </section>

      {/* KONTAK */}
      <section className="section" id="kontak" aria-labelledby="kontak-judul">
        <div className="container">
          <h2 id="kontak-judul" className="label label--accent section-head">
            Kontak
          </h2>
          <ContactGrid />
        </div>
      </section>
    </>
  );
}
