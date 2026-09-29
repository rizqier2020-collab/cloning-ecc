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
    for (const pendaftaranUrl of ["https://linktr.ee/contoh", "/ppdb/daftar"]) {
      const ok = { ...site, ppdb: { ...site.ppdb, pendaftaranUrl } };
      expect(siteConfigSchema.safeParse(ok).success).toBe(true);
    }
  });

  test("rejects an insecure or malformed registration link", () => {
    for (const pendaftaranUrl of ["http://linktr.ee/contoh", "javascript:alert(1)", "linktr.ee/contoh"]) {
      const rusak = { ...site, ppdb: { ...site.ppdb, pendaftaranUrl } };
      expect(siteConfigSchema.safeParse(rusak).success).toBe(false);
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
