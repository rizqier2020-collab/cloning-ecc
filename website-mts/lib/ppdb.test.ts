import { describe, expect, test } from "vitest";
import { getPpdbInfo, type PpdbConfig } from "./ppdb";

const base: PpdbConfig = {
  tahunAjaran: "2027/2028",
  status: "belum-dibuka",
  pendaftaran: { mulai: "2027-01-11", selesai: "2027-03-13" },
  pengumumanHasil: "2027-04-03",
  kuota: 192,
  rombel: 6,
};

describe("getPpdbInfo", () => {
  test("belum-dibuka: announces the opening date and offers info, not registration", () => {
    const info = getPpdbInfo(base);
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
    const info = getPpdbInfo({ ...base, status: "dibuka", pendaftaranUrl: "https://linktr.ee/contoh" });
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
    const info = getPpdbInfo({ ...base, status: "dibuka", pendaftaranUrl: "/ppdb/daftar" });
    expect(info.formulir.href).toBe("/ppdb/daftar");
    expect(info.formulir.eksternal).toBe(false);
  });

  test("belum-dibuka ignores a configured link so nobody registers early", () => {
    const info = getPpdbInfo({ ...base, pendaftaranUrl: "https://linktr.ee/contoh" });
    expect(info.formulir.bisaDaftar).toBe(false);
    expect(info.formulir.href).toBeUndefined();
  });

  test("dibuka without a form URL: open period but no link to a non-existent form", () => {
    const info = getPpdbInfo({ ...base, status: "dibuka" });
    expect(info.formulir.bisaDaftar).toBe(false);
    expect(info.formulir.teks).toMatch(/segera tersedia/i);
  });

  test("ditutup: points visitors to the result announcement", () => {
    const info = getPpdbInfo({ ...base, status: "ditutup" });
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
    const info = getPpdbInfo({ ...rest, status: "ditutup" });
    expect(info.bar.bagian).toEqual(["PPDB 2027/2028 ditutup", "Terima kasih atas minat Anda"]);
  });

  test("always exposes the formatted registration period", () => {
    expect(getPpdbInfo(base).periode).toBe("11 Januari – 13 Maret 2027");
  });
});
