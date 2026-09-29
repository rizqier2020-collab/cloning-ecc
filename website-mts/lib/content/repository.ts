import fs from "node:fs";
import path from "node:path";
import type { z } from "zod";
import { sortByDateAsc, sortByDateDesc } from "../collections";
import { ContentValidationError, type Entry, loadCollection, loadFile } from "./loader";
import {
  agendaSchema,
  beritaSchema,
  ekstrakurikulerSchema,
  galeriSchema,
  guruSchema,
  halamanSchema,
  type KelompokGuru,
  pengumumanSchema,
  prestasiSchema,
  programSchema,
  unduhanSchema,
} from "./schemas";

/**
 * Pintu tunggal ke konten Markdown di folder content/. Semua halaman membaca data
 * lewat fungsi di sini, sehingga sumber data bisa diganti (mis. CMS) tanpa menyentuh
 * komponen. Hasil dibaca sekali per proses build lalu disimpan di memori.
 */
const CONTENT_ROOT = path.join(process.cwd(), "content");

const cache = new Map<string, unknown>();

function memo<T>(key: string, load: () => T): T {
  if (!cache.has(key)) cache.set(key, load());
  return cache.get(key) as T;
}

function koleksi<S extends z.ZodType>(folder: string, schema: S): Entry<z.output<S>>[] {
  return memo(folder, () => loadCollection(path.join(CONTENT_ROOT, folder), schema));
}

export type Berita = Entry<z.output<typeof beritaSchema>>;
export type Pengumuman = Entry<z.output<typeof pengumumanSchema>>;
export type Agenda = Entry<z.output<typeof agendaSchema>>;
export type Prestasi = Entry<z.output<typeof prestasiSchema>>;
export type Album = Entry<z.output<typeof galeriSchema>>;
export type Guru = Entry<z.output<typeof guruSchema>>;
export type Program = Entry<z.output<typeof programSchema>>;
export type Ekstrakurikuler = Entry<z.output<typeof ekstrakurikulerSchema>>;
export type Unduhan = Entry<z.output<typeof unduhanSchema>>;
export type Halaman = Entry<z.output<typeof halamanSchema>>;

export function getBerita(): Berita[] {
  return sortByDateDesc(koleksi("berita", beritaSchema), (b) => b.data.tanggal);
}

export function getBeritaBySlug(slug: string): Berita | undefined {
  return getBerita().find((b) => b.slug === slug);
}

export function getPengumuman(): Pengumuman[] {
  return sortByDateDesc(koleksi("pengumuman", pengumumanSchema), (p) => p.data.tanggal);
}

export function getAgenda(): Agenda[] {
  return sortByDateAsc(koleksi("agenda", agendaSchema), (a) => a.data.mulai);
}

/** Pastikan setiap `berita` di prestasi menunjuk slug berita yang ada. */
export function cekRujukanBerita(prestasi: readonly Prestasi[], slugBerita: ReadonlySet<string>): void {
  const rusak = prestasi.find((p) => p.data.berita && !slugBerita.has(p.data.berita));
  if (rusak) {
    throw new ContentValidationError(
      `Konten tidak valid di ${rusak.file}:\n  - berita: "${rusak.data.berita}" tidak ditemukan di content/berita/. ` +
        `Isi dengan slug berita yang ada atau hapus field ini.`,
    );
  }
}

export function getPrestasi(): Prestasi[] {
  const prestasi = memo("prestasi:tervalidasi", () => {
    const semua = koleksi("prestasi", prestasiSchema);
    cekRujukanBerita(semua, new Set(getBerita().map((b) => b.slug)));
    return semua;
  });
  return sortByDateDesc(prestasi, (p) => p.data.tanggal);
}

export function getAlbums(): Album[] {
  return sortByDateDesc(koleksi("galeri", galeriSchema), (a) => a.data.tanggal);
}

export function getAlbum(slug: string): Album | undefined {
  return getAlbums().find((a) => a.slug === slug);
}

const urutGuru = (a: Guru, b: Guru) => a.data.urutan - b.data.urutan || a.data.nama.localeCompare(b.data.nama, "id");

export function getGuruPerKelompok(): Record<KelompokGuru, Guru[]> {
  const semua = [...koleksi("guru", guruSchema)].sort(urutGuru);
  const per = (k: KelompokGuru) => semua.filter((g) => g.data.kelompok === k);
  return { pimpinan: per("pimpinan"), umum: per("umum"), pai: per("pai"), tendik: per("tendik") };
}

export function getProgramUnggulan(): Program[] {
  return [...koleksi("program", programSchema)].sort((a, b) => a.data.urutan - b.data.urutan);
}

export function getEkstrakurikuler(): Ekstrakurikuler[] {
  return [...koleksi("ekstrakurikuler", ekstrakurikulerSchema)].sort(
    (a, b) => a.data.urutan - b.data.urutan,
  );
}

export function getUnduhan(): Unduhan[] {
  return sortByDateDesc(koleksi("unduhan", unduhanSchema), (u) => u.data.tanggal);
}

/** Halaman statis berbasis Markdown di content/halaman/<nama>.md. */
export function getHalaman(nama: string): Halaman {
  return memo(`halaman/${nama}`, () => {
    const file = path.join(CONTENT_ROOT, "halaman", `${nama}.md`);
    if (!fs.existsSync(file)) {
      throw new ContentValidationError(`Halaman konten tidak ditemukan: content/halaman/${nama}.md`);
    }
    return loadFile(file, halamanSchema);
  });
}
