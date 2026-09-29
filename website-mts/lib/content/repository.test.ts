import { describe, expect, test } from "vitest";
import { ContentValidationError } from "./loader";
import {
  cekRujukanBerita,
  getAgenda,
  getAlbum,
  getAlbums,
  getBerita,
  getBeritaBySlug,
  getEkstrakurikuler,
  getGuruPerKelompok,
  getHalaman,
  getPengumuman,
  getPrestasi,
  getProgramUnggulan,
  getUnduhan,
} from "./repository";

/** Integration test: the real content/ folder must be valid and complete. */
describe("content repository (real content/)", () => {
  test("berita: at least 6, newest first, resolvable by slug", () => {
    const berita = getBerita();
    expect(berita.length).toBeGreaterThanOrEqual(6);
    const dates = berita.map((b) => b.data.tanggal);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(getBeritaBySlug(berita[0].slug)?.slug).toBe(berita[0].slug);
    expect(getBeritaBySlug("tidak-ada")).toBeUndefined();
  });

  test("pengumuman: at least 4, newest first", () => {
    const list = getPengumuman();
    expect(list.length).toBeGreaterThanOrEqual(4);
    expect(list[0].data.tanggal >= list[list.length - 1].data.tanggal).toBe(true);
  });

  test("agenda: at least 5, sorted by start date", () => {
    const list = getAgenda();
    expect(list.length).toBeGreaterThanOrEqual(5);
    const starts = list.map((a) => a.data.mulai);
    expect(starts).toEqual([...starts].sort());
  });

  test("prestasi: at least 3", () => {
    expect(getPrestasi().length).toBeGreaterThanOrEqual(3);
  });

  test("prestasi: every berita reference points at an existing news slug", () => {
    const slugBerita = new Set(getBerita().map((b) => b.slug));
    const rujukan = getPrestasi().flatMap((p) => (p.data.berita ? [p.data.berita] : []));
    expect(rujukan.length).toBeGreaterThan(0);
    for (const slug of rujukan) expect(slugBerita.has(slug), slug).toBe(true);
  });

  test("galeri: at least 9 albums covering all four categories", () => {
    const albums = getAlbums();
    expect(albums.length).toBeGreaterThanOrEqual(9);
    expect(new Set(albums.map((a) => a.data.kategori))).toEqual(
      new Set(["akademik", "keagamaan", "ekstrakurikuler", "prestasi"]),
    );
    expect(getAlbum(albums[0].slug)?.slug).toBe(albums[0].slug);
    expect(getAlbum("tidak-ada")).toBeUndefined();
  });

  test("guru: 4 pimpinan and three non-empty staff groups, ordered", () => {
    const g = getGuruPerKelompok();
    expect(g.pimpinan).toHaveLength(4);
    expect(g.pimpinan[0].data.jabatan).toBe("Kepala Madrasah");
    expect(g.umum.length).toBeGreaterThan(0);
    expect(g.pai.length).toBeGreaterThan(0);
    expect(g.tendik.length).toBeGreaterThan(0);
  });

  test("program unggulan: exactly 3 in order", () => {
    const p = getProgramUnggulan();
    expect(p).toHaveLength(3);
    expect(p.map((x) => x.data.urutan)).toEqual([1, 2, 3]);
  });

  test("ekstrakurikuler: 10 in order", () => {
    const e = getEkstrakurikuler();
    expect(e).toHaveLength(10);
    expect(e[0].data.urutan).toBe(1);
  });

  test("unduhan: at least 3 entries; listed files exist in public/", async () => {
    const { existsSync } = await import("node:fs");
    const path = await import("node:path");
    const list = getUnduhan();
    expect(list.length).toBeGreaterThanOrEqual(3);
    for (const item of list) {
      if (item.data.berkas) {
        expect(existsSync(path.join(process.cwd(), "public", item.data.berkas))).toBe(true);
      }
    }
  });

  test("halaman: static pages exist and fail clearly when missing", () => {
    expect(getHalaman("sejarah").data.judul).toBeTruthy();
    expect(() => getHalaman("tidak-ada")).toThrow(/tidak ditemukan/i);
  });
});

describe("cekRujukanBerita", () => {
  const prestasi = (berita?: string) => ({
    slug: "juara",
    file: "content/prestasi/2026-09-20-juara.md",
    body: "",
    data: { judul: "Juara", tanggal: "2026-09-20", tingkat: "Provinsi" as const, peraih: "A", berita },
  });

  test("passes when references exist or are absent", () => {
    expect(() => cekRujukanBerita([prestasi("ada"), prestasi()], new Set(["ada"]))).not.toThrow();
  });

  test("throws a ContentValidationError naming the file and the missing slug", () => {
    const cek = () => cekRujukanBerita([prestasi("hilang")], new Set(["ada"]));
    expect(cek).toThrow(ContentValidationError);
    expect(cek).toThrow(/content\/prestasi\/2026-09-20-juara\.md[\s\S]*berita: "hilang"/);
  });
});
