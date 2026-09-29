import { describe, expect, test } from "vitest";
import {
  agendaSchema,
  beritaSchema,
  galeriSchema,
  guruSchema,
  pengumumanSchema,
  unduhanSchema,
} from "./schemas";

const beritaValid = {
  judul: "Judul",
  tanggal: "2026-09-20",
  kategori: "Berita",
  ringkasan: "Ringkas",
  alt: "Teks alternatif",
};

describe("beritaSchema", () => {
  test("accepts valid frontmatter and converts YAML dates to ISO strings", () => {
    const parsed = beritaSchema.parse({ ...beritaValid, tanggal: new Date(Date.UTC(2026, 8, 20)) });
    expect(parsed.tanggal).toBe("2026-09-20");
  });

  test("requires alt text so every photo is described", () => {
    const { alt: _alt, ...tanpaAlt } = beritaValid;
    expect(beritaSchema.safeParse(tanpaAlt).success).toBe(false);
  });

  test("only accepts cover images stored under public/images", () => {
    expect(beritaSchema.safeParse({ ...beritaValid, sampul: "https://x/y.jpg" }).success).toBe(false);
    expect(beritaSchema.safeParse({ ...beritaValid, sampul: "/lain/a.webp" }).success).toBe(false);
    expect(beritaSchema.safeParse({ ...beritaValid, sampul: "/images/../a.webp" }).success).toBe(false);
    expect(beritaSchema.safeParse({ ...beritaValid, sampul: "/images/berita/a.webp" }).success).toBe(true);
  });

  test("rejects slugs with spaces or capitals", () => {
    expect(beritaSchema.safeParse({ ...beritaValid, slug: "Judul Baru" }).success).toBe(false);
  });
});

describe("pengumumanSchema", () => {
  test("defaults penting to false", () => {
    const parsed = pengumumanSchema.parse({ judul: "A", tanggal: "2026-09-01", kategori: "Umum" });
    expect(parsed.penting).toBe(false);
  });
});

describe("agendaSchema", () => {
  test("rejects an end date before the start date", () => {
    const result = agendaSchema.safeParse({
      judul: "PTS",
      mulai: "2026-10-17",
      selesai: "2026-10-12",
      tempat: "Kelas",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["selesai"]);
  });

  test("accepts single-day events without selesai", () => {
    expect(agendaSchema.safeParse({ judul: "Apel", mulai: "2026-10-22", tempat: "Lapangan" }).success).toBe(true);
  });
});

describe("galeriSchema", () => {
  test("requires at least one photo with alt text", () => {
    const base = { judul: "A", kategori: "akademik", tempat: "Lab", tanggal: "2026-09-01", alt: "x" };
    expect(galeriSchema.safeParse({ ...base, foto: [] }).success).toBe(false);
    expect(galeriSchema.safeParse({ ...base, foto: [{ keterangan: "x" }] }).success).toBe(false);
    const ok = galeriSchema.parse({ ...base, foto: [{ alt: "Foto 1" }] });
    expect(ok.rasio).toBe("square");
  });
});

describe("guruSchema", () => {
  test("only allows known groups", () => {
    const base = { nama: "A", jabatan: "Matematika", alt: "Foto A" };
    expect(guruSchema.safeParse({ ...base, kelompok: "umum" }).success).toBe(true);
    expect(guruSchema.safeParse({ ...base, kelompok: "satpam" }).success).toBe(false);
  });
});

describe("unduhanSchema", () => {
  test("only accepts PDF files inside /unduhan/", () => {
    const base = { judul: "Brosur", keterangan: "x", tanggal: "2026-09-01" };
    expect(unduhanSchema.safeParse({ ...base, berkas: "/unduhan/brosur.pdf" }).success).toBe(true);
    expect(unduhanSchema.safeParse({ ...base, berkas: "/lain/brosur.pdf" }).success).toBe(false);
    expect(unduhanSchema.safeParse({ ...base, berkas: "/unduhan/../rahasia.pdf" }).success).toBe(false);
    expect(unduhanSchema.safeParse(base).success).toBe(true);
  });
});
