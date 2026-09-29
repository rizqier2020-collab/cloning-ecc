import { describe, expect, test } from "vitest";
import {
  compareIso,
  hariIniIso,
  formatRentang,
  formatTanggal,
  pecahTanggal,
  toIsoDate,
} from "./date";

describe("toIsoDate", () => {
  test("accepts a valid YYYY-MM-DD string unchanged", () => {
    expect(toIsoDate("2026-09-20")).toBe("2026-09-20");
  });

  test("converts a Date (as produced by YAML) using UTC components", () => {
    expect(toIsoDate(new Date(Date.UTC(2026, 8, 20)))).toBe("2026-09-20");
  });

  test("returns null for impossible calendar dates", () => {
    expect(toIsoDate("2026-02-30")).toBeNull();
    expect(toIsoDate("2026-13-01")).toBeNull();
  });

  test("returns null for malformed input", () => {
    expect(toIsoDate("20-09-2026")).toBeNull();
    expect(toIsoDate(42)).toBeNull();
    expect(toIsoDate(new Date("invalid"))).toBeNull();
  });
});

describe("formatTanggal (id-ID)", () => {
  test("formats short style with Indonesian month abbreviations", () => {
    expect(formatTanggal("2026-09-20")).toBe("20 Sep 2026");
    expect(formatTanggal("2026-10-12", "pendek")).toBe("12 Okt 2026");
    expect(formatTanggal("2026-08-01", "pendek")).toBe("1 Agu 2026");
    expect(formatTanggal("2026-05-03", "pendek")).toBe("3 Mei 2026");
    expect(formatTanggal("2025-12-24", "pendek")).toBe("24 Des 2025");
  });

  test("formats long style with full month name", () => {
    expect(formatTanggal("2027-01-11", "panjang")).toBe("11 Januari 2027");
    expect(formatTanggal("2026-08-17", "panjang")).toBe("17 Agustus 2026");
  });

  test("formats dotted numeric style used in announcement lists", () => {
    expect(formatTanggal("2026-09-08", "titik")).toBe("08.09.2026");
  });

  test("formats month-year style", () => {
    expect(formatTanggal("2026-06-14", "bulan-tahun")).toBe("Jun 2026");
  });

  test("throws a clear error for invalid ISO input", () => {
    expect(() => formatTanggal("kemarin")).toThrow(/tanggal tidak valid/i);
  });
});

describe("formatRentang", () => {
  test("returns a single date when end is missing or equal", () => {
    expect(formatRentang("2026-10-22")).toBe("22 Okt 2026");
    expect(formatRentang("2026-10-22", "2026-10-22")).toBe("22 Okt 2026");
  });

  test("compresses a range within the same month", () => {
    expect(formatRentang("2026-10-12", "2026-10-17")).toBe("12–17 Okt 2026");
  });

  test("keeps both months when the range spans months in one year", () => {
    expect(formatRentang("2027-01-11", "2027-03-13")).toBe("11 Jan – 13 Mar 2027");
  });

  test("keeps both years when the range spans years", () => {
    expect(formatRentang("2026-12-28", "2027-01-02")).toBe("28 Des 2026 – 2 Jan 2027");
  });

  test("supports the long style", () => {
    expect(formatRentang("2027-01-11", "2027-03-13", "panjang")).toBe(
      "11 Januari – 13 Maret 2027",
    );
    expect(formatRentang("2026-10-12", "2026-10-17", "panjang")).toBe("12–17 Oktober 2026");
  });
});

describe("pecahTanggal", () => {
  test("splits a date into zero-padded day and month label for agenda rows", () => {
    expect(pecahTanggal("2026-11-07")).toEqual({ hari: "07", bulan: "Nov 2026" });
  });
});

describe("compareIso", () => {
  test("orders ISO dates chronologically", () => {
    const sorted = ["2026-10-01", "2025-12-31", "2026-01-15"].sort(compareIso);
    expect(sorted).toEqual(["2025-12-31", "2026-01-15", "2026-10-01"]);
  });
});

describe("hariIniIso", () => {
  test("uses the Asia/Jakarta (UTC+7) calendar day", () => {
    expect(hariIniIso(new Date("2026-09-29T16:59:00Z"))).toBe("2026-09-29");
    expect(hariIniIso(new Date("2026-09-29T17:00:00Z"))).toBe("2026-09-30");
  });

  test("defaults to now and returns an ISO date", () => {
    expect(hariIniIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
