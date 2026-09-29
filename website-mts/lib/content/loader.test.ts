import path from "node:path";
import { describe, expect, test } from "vitest";
import { beritaSchema } from "./schemas";
import { ContentValidationError, loadCollection, slugDariNamaBerkas } from "./loader";

const FIXTURES = path.resolve(__dirname, "../../tests/fixtures");

describe("slugDariNamaBerkas", () => {
  test("drops the .md extension and a leading date prefix", () => {
    expect(slugDariNamaBerkas("2026-09-20-juara-mtq.md")).toBe("juara-mtq");
    expect(slugDariNamaBerkas("pekan-bahasa.md")).toBe("pekan-bahasa");
    expect(slugDariNamaBerkas("2026-06-wisuda-tahfiz.md")).toBe("wisuda-tahfiz");
  });
});

describe("loadCollection", () => {
  test("parses, validates and normalises every Markdown file in a folder", () => {
    const items = loadCollection(path.join(FIXTURES, "valid/berita"), beritaSchema);
    expect(items).toHaveLength(2);
    const juara = items.find((i) => i.slug === "juara-mtq");
    expect(juara?.data.tanggal).toBe("2026-09-20");
    expect(juara?.data.kategori).toBe("Prestasi");
    expect(juara?.body.trim()).toBe("Isi **berita**.");
    expect(juara?.file).toMatch(/2026-09-20-juara-mtq\.md$/);
  });

  test("uses the frontmatter slug when provided", () => {
    const items = loadCollection(path.join(FIXTURES, "valid/berita"), beritaSchema);
    expect(items.map((i) => i.slug)).toContain("pekan-bahasa-arab-2026");
  });

  test("fails with a message naming the file and every invalid field", () => {
    const load = () => loadCollection(path.join(FIXTURES, "invalid/berita"), beritaSchema);
    expect(load).toThrow(ContentValidationError);
    try {
      load();
    } catch (err) {
      const message = (err as Error).message;
      expect(message).toContain("rusak.md");
      expect(message).toContain("judul");
      expect(message).toContain("tanggal");
      expect(message).toContain("kategori");
      expect(message).toContain("alt");
    }
  });

  test("rejects executable ---js front matter instead of evaluating it", () => {
    const load = () => loadCollection(path.join(FIXTURES, "js-frontmatter/berita"), beritaSchema);
    expect(load).toThrow(ContentValidationError);
    expect(load).toThrow(/eval-js\.md[\s\S]*front matter JavaScript tidak diizinkan/);
    expect((globalThis as Record<string, unknown>).__frontmatterDieksekusi).toBeUndefined();
  });

  test("fails when two files resolve to the same slug", () => {
    expect(() => loadCollection(path.join(FIXTURES, "duplikat/berita"), beritaSchema)).toThrow(
      /slug "sama" dipakai lebih dari satu berkas/,
    );
  });

  test("returns an empty list for a folder without Markdown files", () => {
    expect(loadCollection(path.join(FIXTURES, "kosong"), beritaSchema)).toEqual([]);
  });

  test("fails clearly when the folder does not exist", () => {
    expect(() => loadCollection(path.join(FIXTURES, "tidak-ada"), beritaSchema)).toThrow(
      /folder konten tidak ditemukan/i,
    );
  });
});
