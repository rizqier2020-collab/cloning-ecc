import { expect, test } from "@playwright/test";
import { RUTE_STATIS } from "../../lib/routes";

/** Rute dinamis contoh (satu berita, satu album) di samping semua rute statis. */
const RUTE = [...RUTE_STATIS, "/informasi/berita/juara-mtq-kabupaten", "/galeri/wisuda-tahfiz-2026"];
const LEBAR = [390, 1440] as const;

for (const width of LEBAR) {
  test.describe(`rute @ ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const path of RUTE) {
      test(`${path} → 200, satu h1, tanpa scroll horizontal`, async ({ page }) => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator("html")).toHaveAttribute("lang", "id");
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  });
}

test("halaman tidak dikenal → 404 berbahasa Indonesia", async ({ page }) => {
  const response = await page.goto("/halaman-yang-tidak-ada");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Halaman tidak ditemukan");
});

test("/guru-staf dialihkan permanen ke /profil/guru-staf", async ({ request, page }) => {
  const res = await request.get("/guru-staf", { maxRedirects: 0 });
  expect(res.status()).toBe(301);
  expect(res.headers()["location"]).toBe("/profil/guru-staf");
  await page.goto("/guru-staf");
  await expect(page).toHaveURL(/\/profil\/guru-staf$/);
});

test("sitemap.xml dan robots.txt tersedia", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain("/profil/guru-staf</loc>");
  expect(xml).toContain("/informasi/berita/juara-mtq-kabupaten</loc>");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
});

test("metadata halaman memakai template judul dan canonical", async ({ page }) => {
  await page.goto("/galeri");
  await expect(page).toHaveTitle("Galeri Kegiatan | MTs Contoh Al-Hikmah");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/galeri$/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Galeri Kegiatan");
});
