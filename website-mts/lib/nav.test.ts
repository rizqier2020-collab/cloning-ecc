import { describe, expect, test } from "vitest";
import { getAriaCurrent, NAV_UTAMA, normalisasiPath } from "./nav";

describe("normalisasiPath", () => {
  test("strips trailing slashes, query and hash but keeps root", () => {
    expect(normalisasiPath("/profil/")).toBe("/profil");
    expect(normalisasiPath("/galeri?x=1#a")).toBe("/galeri");
    expect(normalisasiPath("/")).toBe("/");
    expect(normalisasiPath("")).toBe("/");
  });
});

describe("getAriaCurrent", () => {
  test("returns 'page' for the exact page", () => {
    expect(getAriaCurrent("/galeri", "/galeri")).toBe("page");
    expect(getAriaCurrent("/profil/guru-staf", "/profil/guru-staf/")).toBe("page");
  });

  test("returns 'true' for the parent section of a subpage", () => {
    expect(getAriaCurrent("/profil", "/profil/guru-staf")).toBe("true");
    expect(getAriaCurrent("/informasi", "/informasi/berita/juara-mtq")).toBe("true");
  });

  test("does not match siblings sharing a prefix", () => {
    expect(getAriaCurrent("/profil", "/profil-lain")).toBeUndefined();
  });

  test("home only matches itself", () => {
    expect(getAriaCurrent("/", "/")).toBe("page");
    expect(getAriaCurrent("/", "/galeri")).toBeUndefined();
  });

  test("returns undefined when pathname is unknown", () => {
    expect(getAriaCurrent("/galeri", null)).toBeUndefined();
  });
});

describe("NAV_UTAMA", () => {
  test("lists the five main sections in the approved order", () => {
    expect(NAV_UTAMA.map((i) => i.label)).toEqual([
      "Profil",
      "Akademik",
      "Informasi",
      "Galeri",
      "Kontak",
    ]);
  });
});
