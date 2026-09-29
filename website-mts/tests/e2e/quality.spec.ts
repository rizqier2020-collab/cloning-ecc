import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { RUTE_STATIS } from "../../lib/routes";

/** Rute dinamis contoh (satu berita, satu album) di samping semua rute statis. */
const RUTE = [...RUTE_STATIS, "/informasi/berita/juara-mtq-kabupaten", "/galeri/wisuda-tahfiz-2026"];

test.describe("aksesibilitas (axe, WCAG 2.2 A/AA)", () => {
  for (const path of RUTE) {
    test(`${path} tanpa pelanggaran axe`, async ({ page }) => {
      await page.goto(path);
      const hasil = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const ringkas = hasil.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(ringkas).toEqual([]);
    });
  }
});

test("semua tautan internal di semua halaman mengarah ke halaman yang ada", async ({ page, request }) => {
  test.setTimeout(120_000);
  const tautan = new Set<string>();
  for (const path of RUTE) {
    await page.goto(path);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href") ?? ""));
    for (const href of hrefs) {
      if (href.startsWith("/") && !href.startsWith("//")) tautan.add(href.split("#")[0] || "/");
    }
  }
  const rusak: string[] = [];
  for (const href of tautan) {
    const res = await request.get(href);
    if (res.status() !== 200) rusak.push(`${href} → ${res.status()}`);
  }
  expect(rusak).toEqual([]);
});
