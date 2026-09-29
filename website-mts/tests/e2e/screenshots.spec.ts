import { test } from "@playwright/test";

/**
 * Tangkapan layar penuh untuk tinjauan visual. Hanya berjalan bila SCREENSHOT_DIR
 * diisi, mis.: SCREENSHOT_DIR=/tmp/shots npx playwright test screenshots
 */
const DIR = process.env.SCREENSHOT_DIR;
const RUTE = ["/", "/galeri", "/profil/guru-staf", "/ppdb", "/informasi/berita"];

test.describe("screenshots", () => {
  test.skip(!DIR, "SCREENSHOT_DIR tidak diisi");

  for (const width of [390, 1440]) {
    for (const path of RUTE) {
      test(`${path} @ ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path, { waitUntil: "networkidle" });
        // Gulir perlahan agar reveal & hitung naik berjalan, lalu tunggu animasi selesai.
        await page.evaluate(async () => {
          const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
          for (let y = 0; y < document.body.scrollHeight; y += 300) {
            window.scrollTo(0, y);
            await wait(150);
          }
          await wait(1600);
          window.scrollTo(0, 0);
          await wait(300);
        });
        const name = path === "/" ? "beranda" : path.slice(1).replaceAll("/", "-");
        await page.screenshot({ path: `${DIR}/s2-${name}-${width}.png`, fullPage: true });
      });
    }
  }
});
