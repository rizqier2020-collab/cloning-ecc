import { describe, expect, test } from "vitest";
import {
  countByKategori,
  filterByKategori,
  pisahAgenda,
  pisahAgendaEntri,
  sortByDateAsc,
  sortByDateDesc,
} from "./collections";

const items = [
  { id: "a", tanggal: "2026-09-08", kategori: "prestasi" },
  { id: "b", tanggal: "2026-09-20", kategori: "kegiatan" },
  { id: "c", tanggal: "2026-01-15", kategori: "prestasi" },
];

describe("sortByDateDesc / sortByDateAsc", () => {
  test("sorts newest first without mutating the input", () => {
    const copy = [...items];
    const result = sortByDateDesc(items, (i) => i.tanggal);
    expect(result.map((i) => i.id)).toEqual(["b", "a", "c"]);
    expect(items).toEqual(copy);
  });

  test("sorts oldest first", () => {
    expect(sortByDateAsc(items, (i) => i.tanggal).map((i) => i.id)).toEqual(["c", "a", "b"]);
  });
});

describe("filterByKategori", () => {
  test("returns every item for 'semua'", () => {
    expect(filterByKategori(items, "semua", (i) => i.kategori)).toHaveLength(3);
  });

  test("returns only matching items, case-insensitively", () => {
    const result = filterByKategori(items, "Prestasi", (i) => i.kategori);
    expect(result.map((i) => i.id)).toEqual(["a", "c"]);
  });

  test("returns an empty array when nothing matches", () => {
    expect(filterByKategori(items, "olahraga", (i) => i.kategori)).toEqual([]);
  });
});

describe("countByKategori", () => {
  test("counts items per category plus a total under 'semua'", () => {
    expect(countByKategori(items, (i) => i.kategori)).toEqual({
      semua: 3,
      prestasi: 2,
      kegiatan: 1,
    });
  });
});

describe("pisahAgenda", () => {
  const agenda = [
    { id: "lalu", mulai: "2026-09-01", selesai: "2026-09-03" },
    { id: "berjalan", mulai: "2026-09-27", selesai: "2026-10-02" },
    { id: "nanti-2", mulai: "2026-11-07" },
    { id: "nanti-1", mulai: "2026-10-12", selesai: "2026-10-17" },
    { id: "kemarin", mulai: "2026-09-28" },
  ];

  test("puts ongoing and future events in akanDatang, soonest first", () => {
    const { akanDatang } = pisahAgenda(agenda, "2026-09-29");
    expect(akanDatang.map((a) => a.id)).toEqual(["berjalan", "nanti-1", "nanti-2"]);
  });

  test("puts finished events in selesai, most recent first", () => {
    const { selesai } = pisahAgenda(agenda, "2026-09-29");
    expect(selesai.map((a) => a.id)).toEqual(["kemarin", "lalu"]);
  });

  test("treats a single-day event on today as upcoming", () => {
    const { akanDatang } = pisahAgenda([{ id: "x", mulai: "2026-09-29" }], "2026-09-29");
    expect(akanDatang).toHaveLength(1);
  });
});

describe("pisahAgendaEntri", () => {
  test("splits content entries by data.mulai/data.selesai and returns the original entries", () => {
    const entri = [
      { slug: "lalu", data: { mulai: "2026-09-01", selesai: "2026-09-03" } },
      { slug: "nanti", data: { mulai: "2026-10-12" } },
      { slug: "berjalan", data: { mulai: "2026-09-27", selesai: "2026-10-02" } },
    ];
    const { akanDatang, selesai } = pisahAgendaEntri(entri, "2026-09-29");
    expect(akanDatang.map((a) => a.slug)).toEqual(["berjalan", "nanti"]);
    expect(selesai).toEqual([entri[0]]);
    expect(akanDatang[0]).toBe(entri[2]);
  });
});
