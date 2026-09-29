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

test.describe("header keamanan & CSP", () => {
  test("header CSP, HSTS, dan COOP terpasang", async ({ request }) => {
    const res = await request.get("/");
    const h = res.headers();
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(h["content-security-policy"]).not.toContain("unsafe-eval");
    expect(h["strict-transport-security"]).toBe("max-age=63072000; includeSubDomains");
    expect(h["cross-origin-opener-policy"]).toBe("same-origin");
  });

  test("tidak ada pelanggaran CSP di semua halaman (termasuk peta & font)", async ({ page }) => {
    test.setTimeout(120_000);
    const pelanggaran: string[] = [];
    page.on("console", (msg) => {
      if (/Content Security Policy|Refused to/i.test(msg.text())) pelanggaran.push(`${page.url()}: ${msg.text()}`);
    });
    for (const path of RUTE) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
    }
    const fontTermuat = await page.evaluate(() =>
      [...document.fonts].some((f) => f.family.includes("Space Grotesk") && f.status === "loaded"),
    );
    expect(fontTermuat).toBe(true);
    await page.goto("/kontak");
    await page.getByRole("button", { name: "Tampilkan peta di sini" }).click();
    await expect(page.locator("iframe")).toBeVisible();
    await page.waitForTimeout(1500);
    expect(pelanggaran).toEqual([]);
  });
});
