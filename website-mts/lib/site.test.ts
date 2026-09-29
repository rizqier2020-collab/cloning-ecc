import { describe, expect, test } from "vitest";
import { site } from "./site";
import { siteConfigSchema } from "./content/schemas";

describe("site config", () => {
  test("the real config is valid and exposes identity, contacts and PPDB", () => {
    expect(site.nama).toBe("MTs Contoh Al-Hikmah");
    expect(site.kontak.whatsapp.tautan).toMatch(/^https:\/\/wa\.me\/\d+$/);
    expect(["belum-dibuka", "dibuka", "ditutup"]).toContain(site.ppdb.status);
  });

  test("rejects a PPDB period that ends before it starts", () => {
    const rusak = {
      ...site,
      ppdb: { ...site.ppdb, pendaftaran: { mulai: "2027-03-13", selesai: "2027-01-11" } },
    };
    const result = siteConfigSchema.safeParse(rusak);
    expect(result.success).toBe(false);
  });

  test("accepts an https registration link (Linktree) or an internal path", () => {
    for (const pendaftaranUrl of ["https://linktr.ee/contoh", "https://forms.gle/abc123", "/ppdb/daftar"]) {
      const ok = { ...site, ppdb: { ...site.ppdb, pendaftaranUrl } };
      expect(siteConfigSchema.safeParse(ok).success).toBe(true);
    }
  });

  test("rejects an insecure or malformed registration link", () => {
    for (const pendaftaranUrl of [
      "http://linktr.ee/contoh",
      "javascript:alert(1)",
      "linktr.ee/contoh",
      "//evil.example",
      "https://linktr.ee@evil.example/x",
      "https://evil.example/form",
    ]) {
      const rusak = { ...site, ppdb: { ...site.ppdb, pendaftaranUrl } };
      expect(siteConfigSchema.safeParse(rusak).success).toBe(false);
    }
  });

  test("map embed must be a Google Maps URL on www.google.com/maps", () => {
    const denganEmbed = (embed: string) => ({ ...site, kontak: { ...site.kontak, peta: { ...site.kontak.peta, embed } } });
    expect(siteConfigSchema.safeParse(denganEmbed("https://www.google.com/maps?q=x&output=embed")).success).toBe(true);
    expect(siteConfigSchema.safeParse(denganEmbed("https://www.google.com/maps/embed?pb=abc")).success).toBe(true);
    for (const embed of [
      "https://evil.example/maps?q=x",
      "https://www.google.com/search?q=x",
      "https://www.google.com.evil.example/maps",
      "http://www.google.com/maps?q=x",
    ]) {
      expect(siteConfigSchema.safeParse(denganEmbed(embed)).success, embed).toBe(false);
    }
  });

  test("PPDB brochure must be a PDF directly inside /unduhan/", () => {
    const denganBrosur = (brosur: string) => ({ ...site, ppdb: { ...site.ppdb, brosur } });
    expect(siteConfigSchema.safeParse(denganBrosur("/unduhan/brosur-ppdb.pdf")).success).toBe(true);
    for (const brosur of ["/unduhan/../rahasia.pdf", "/unduhan/brosur.exe", "/unduhan/", "/lain/brosur.pdf"]) {
      expect(siteConfigSchema.safeParse(denganBrosur(brosur)).success, brosur).toBe(false);
    }
  });

  test("rejects an unknown PPDB status", () => {
    const rusak = { ...site, ppdb: { ...site.ppdb, status: "buka" } };
    expect(siteConfigSchema.safeParse(rusak).success).toBe(false);
  });
});

describe("parseSiteConfig", () => {
  test("throws a message that points at content/site.ts and the bad field", async () => {
    const { parseSiteConfig } = await import("./site");
    expect(() => parseSiteConfig({ ...site, nsm: "123" })).toThrow(
      /content\/site\.ts[\s\S]*nsm: NSM harus 12 digit/,
    );
  });
});
