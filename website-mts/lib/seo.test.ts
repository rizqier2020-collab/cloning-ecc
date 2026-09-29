import { describe, expect, test } from "vitest";
import { buatMetadata, getSiteUrl, SITE_URL_DEFAULT } from "./seo";

describe("getSiteUrl", () => {
  test("falls back to the default when env var is missing or blank", () => {
    expect(getSiteUrl(undefined)).toBe(SITE_URL_DEFAULT);
    expect(getSiteUrl("  ")).toBe(SITE_URL_DEFAULT);
  });

  test("strips trailing slashes from a valid URL", () => {
    expect(getSiteUrl("https://mtscontoh.sch.id/")).toBe("https://mtscontoh.sch.id");
  });

  test("throws for a non-http URL so misconfiguration fails the build", () => {
    expect(() => getSiteUrl("ftp://contoh")).toThrow(/NEXT_PUBLIC_SITE_URL/);
    expect(() => getSiteUrl("bukan url")).toThrow(/NEXT_PUBLIC_SITE_URL/);
  });
});

describe("buatMetadata", () => {
  test("sets title, description, canonical and Open Graph basics", () => {
    const meta = buatMetadata({
      judul: "Galeri Kegiatan",
      deskripsi: "Dokumentasi kegiatan.",
      path: "/galeri",
    });
    expect(meta.title).toBe("Galeri Kegiatan");
    expect(meta.description).toBe("Dokumentasi kegiatan.");
    expect(meta.alternates?.canonical).toBe("/galeri");
    expect(meta.openGraph).toMatchObject({
      title: "Galeri Kegiatan",
      description: "Dokumentasi kegiatan.",
      url: "/galeri",
      type: "website",
    });
  });

  test("repeats siteName and id_ID locale because child openGraph replaces the layout's", () => {
    const meta = buatMetadata({ judul: "Kontak", deskripsi: "x", path: "/kontak" });
    expect(meta.openGraph).toMatchObject({ siteName: "MTs Contoh Al-Hikmah", locale: "id_ID" });
    const artikel = buatMetadata({ judul: "A", deskripsi: "x", path: "/a", jenis: "article", terbit: "2026-09-20" });
    expect(artikel.openGraph).toMatchObject({ siteName: "MTs Contoh Al-Hikmah", locale: "id_ID" });
  });

  test("supports article type for news pages", () => {
    const meta = buatMetadata({
      judul: "Juara",
      deskripsi: "x",
      path: "/informasi/berita/juara",
      jenis: "article",
      terbit: "2026-09-20",
    });
    expect(meta.openGraph).toMatchObject({ type: "article", publishedTime: "2026-09-20" });
  });
});
