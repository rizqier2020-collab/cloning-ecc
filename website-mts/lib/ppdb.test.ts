import { describe, expect, test } from "vitest";
import {
  getPpdbInfo,
  isEksternal,
  isTautanPendaftaranValid,
  PENDAFTARAN_HOST,
  type PpdbConfig,
} from "./ppdb";
import { jadwalPpdb } from "@/content/ppdb";
import { site } from "./site";

const base: PpdbConfig = {
  tahunAjaran: "2027/2028",
  status: "belum-dibuka",
  pendaftaran: { mulai: "2027-01-11", selesai: "2027-03-13" },
  pengumumanHasil: "2027-04-03",
  kuota: 192,
  rombel: 6,
};

/** Hari di tengah periode pendaftaran contoh. */
const HARI_INI = "2027-02-01";

describe("getPpdbInfo", () => {
  test("belum-dibuka: announces the opening date and offers info, not registration", () => {
    const info = getPpdbInfo(base, HARI_INI);
    expect(info.judul).toBe("PPDB 2027/2028");
    expect(info.statusLabel).toBe("Segera dibuka");
    expect(info.bar).toEqual({
      bagian: ["PPDB 2027/2028 segera dibuka", "11 Jan – 13 Mar 2027"],
      cta: "Info",
    });
    expect(info.formulir.judul).toBe("Formulir pendaftaran online dibuka 11 Januari 2027");
    expect(info.formulir.bisaDaftar).toBe(false);
    expect(info.formulir.href).toBeUndefined();
  });

  test("dibuka: matches the mockup bar and links to the external registration page (Linktree)", () => {
    const info = getPpdbInfo({ ...base, status: "dibuka", pendaftaranUrl: "https://linktr.ee/contoh" }, HARI_INI);
    expect(info.statusLabel).toBe("Dibuka");
    expect(info.bar).toEqual({
      bagian: ["PPDB 2027/2028 dibuka", "11 Jan – 13 Mar 2027"],
      cta: "Daftar",
    });
    expect(info.formulir.judul).toBe("Formulir pendaftaran online dibuka sampai 13 Maret 2027");
    expect(info.formulir.bisaDaftar).toBe(true);
    expect(info.formulir.href).toBe("https://linktr.ee/contoh");
    expect(info.formulir.eksternal).toBe(true);
  });

  test("dibuka with an internal path: link is not marked external", () => {
    const info = getPpdbInfo({ ...base, status: "dibuka", pendaftaranUrl: "/ppdb/daftar" }, HARI_INI);
    expect(info.formulir.href).toBe("/ppdb/daftar");
    expect(info.formulir.eksternal).toBe(false);
  });

  test("belum-dibuka ignores a configured link so nobody registers early", () => {
    const info = getPpdbInfo({ ...base, pendaftaranUrl: "https://linktr.ee/contoh" }, HARI_INI);
    expect(info.formulir.bisaDaftar).toBe(false);
    expect(info.formulir.href).toBeUndefined();
  });

  test("dibuka without a form URL: open period but no link to a non-existent form", () => {
    const info = getPpdbInfo({ ...base, status: "dibuka" }, HARI_INI);
    expect(info.formulir.bisaDaftar).toBe(false);
    expect(info.formulir.teks).toMatch(/segera tersedia/i);
  });

  test("ditutup: points visitors to the result announcement", () => {
    const info = getPpdbInfo({ ...base, status: "ditutup" }, HARI_INI);
    expect(info.statusLabel).toBe("Ditutup");
    expect(info.bar).toEqual({
      bagian: ["PPDB 2027/2028 ditutup", "Pengumuman hasil 3 Apr 2027"],
      cta: "Lihat info",
    });
    expect(info.formulir.judul).toBe("Pendaftaran online sudah ditutup");
    expect(info.formulir.bisaDaftar).toBe(false);
  });

  test("ditutup without announcement date still produces a sensible bar", () => {
    const { pengumumanHasil: _unused, ...rest } = base;
    const info = getPpdbInfo({ ...rest, status: "ditutup" }, HARI_INI);
    expect(info.bar.bagian).toEqual(["PPDB 2027/2028 ditutup", "Terima kasih atas minat Anda"]);
  });

  test("always exposes the formatted registration period", () => {
    expect(getPpdbInfo(base, HARI_INI).periode).toBe("11 Januari – 13 Maret 2027");
  });
});

describe("getPpdbInfo dengan tanggal hari ini", () => {
  const dibuka: PpdbConfig = { ...base, status: "dibuka", pendaftaranUrl: "https://linktr.ee/contoh" };

  test("dibuka but today is past pendaftaran.selesai: treated as ditutup (no stale Daftar button)", () => {
    const info = getPpdbInfo(dibuka, "2027-03-14");
    expect(info.statusLabel).toBe("Ditutup");
    expect(info.bar.cta).toBe("Lihat info");
    expect(info.formulir.bisaDaftar).toBe(false);
    expect(info.formulir.href).toBeUndefined();
  });

  test("dibuka on the last registration day: still dibuka", () => {
    const info = getPpdbInfo(dibuka, "2027-03-13");
    expect(info.statusLabel).toBe("Dibuka");
    expect(info.formulir.bisaDaftar).toBe(true);
  });

  test("belum-dibuka stays manual even after the period started", () => {
    expect(getPpdbInfo(base, "2027-02-01").statusLabel).toBe("Segera dibuka");
  });
});

describe("tautan pendaftaran", () => {
  test("allowlist host is exported for README-documented extension", () => {
    expect(PENDAFTARAN_HOST).toEqual(["linktr.ee", "forms.gle", "docs.google.com", "s.id"]);
  });

  test("accepts https links on allowlisted hosts and internal paths", () => {
    for (const url of ["https://linktr.ee/contoh", "https://forms.gle/abc123", "https://docs.google.com/forms/d/x", "/ppdb/daftar"]) {
      expect(isTautanPendaftaranValid(url), url).toBe(true);
    }
  });

  test("rejects http, protocol-relative, credential tricks, other hosts and javascript:", () => {
    for (const url of [
      "http://linktr.ee/contoh",
      "//evil.example",
      "/\\evil.example",
      "/\t/evil.example",
      "https://linktr.ee@evil.example/x",
      "https://user:pass@linktr.ee/x",
      "https://evil.example/form",
      "https://linktr.ee.evil.example/x",
      "javascript:alert(1)",
      "linktr.ee/contoh",
      "",
    ]) {
      expect(isTautanPendaftaranValid(url), url).toBe(false);
    }
  });

  test("isEksternal: only same-origin paths are internal; protocol-relative is never internal", () => {
    expect(isEksternal(undefined)).toBe(false);
    expect(isEksternal("/ppdb/daftar")).toBe(false);
    expect(isEksternal("https://linktr.ee/contoh")).toBe(true);
    expect(isEksternal("//evil.example")).toBe(true);
    expect(isEksternal("/\\evil.example")).toBe(true);
    expect(isEksternal("https://[rusak")).toBe(true);
  });
});

describe("jadwalPpdb (content/ppdb.ts)", () => {
  test("the online registration row is derived from site.ppdb.pendaftaran", () => {
    const baris = jadwalPpdb.find((j) => j.judul === "Pendaftaran online");
    expect(baris?.mulai).toBe(site.ppdb.pendaftaran.mulai);
    expect(baris?.selesai).toBe(site.ppdb.pendaftaran.selesai);
  });
});
