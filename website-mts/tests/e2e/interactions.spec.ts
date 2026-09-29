import { expect, test } from "@playwright/test";

test.describe("menu HP", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("panel tertutup setelah navigasi Kembali", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.click();
    await page.getByRole("navigation", { name: "Menu utama" }).getByRole("link", { name: "Kontak" }).click();
    await expect(page).toHaveURL(/\/kontak$/);
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("tombol membuka/menutup panel; Esc menutup dan mengembalikan fokus", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    const nav = page.getByRole("navigation", { name: "Menu utama" });

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(nav).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Guru & Staf" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(nav).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("mengetuk tautan menutup panel dan menandai aria-current", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("navigation", { name: "Menu utama" }).getByRole("link", { name: "Guru & Staf" }).click();
    await expect(page).toHaveURL(/\/profil\/guru-staf$/);
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");

    await page.getByRole("button", { name: "Menu" }).click();
    const nav = page.getByRole("navigation", { name: "Menu utama" });
    await expect(nav.getByRole("link", { name: "Guru & Staf" })).toHaveAttribute("aria-current", "page");
    await expect(nav.getByRole("link", { name: "Profil", exact: true })).toHaveAttribute("aria-current", "true");
  });
});

test.describe("filter galeri", () => {
  test("kategori menyaring kartu, memperbarui aria-pressed dan status", async ({ page }) => {
    await page.goto("/galeri");
    const status = page.getByRole("status");
    const items = page.locator(".gallery__item");
    const total = await items.count();
    await expect(status).toHaveText(`${total} kegiatan`);

    const prestasi = page.getByRole("button", { name: "Prestasi" });
    await prestasi.click();
    await expect(prestasi).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("button", { name: "Semua" })).toHaveAttribute("aria-pressed", "false");

    const visible = page.locator(".gallery__item:visible");
    const shown = await visible.count();
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);
    await expect(status).toHaveText(`${shown} kegiatan`);
    for (const kategori of await visible.evaluateAll((els) => els.map((e) => e.getAttribute("data-kategori")))) {
      expect(kategori).toBe("prestasi");
    }

    await page.getByRole("button", { name: "Semua" }).click();
    await expect(page.locator(".gallery__item:visible")).toHaveCount(total);
  });

  test("filter berita per kategori", async ({ page }) => {
    await page.goto("/informasi/berita");
    await page.getByRole("button", { name: "Kegiatan" }).click();
    const kategori = await page
      .locator(".card-grid__item:visible")
      .evaluateAll((els) => els.map((e) => e.getAttribute("data-kategori")));
    expect(kategori.length).toBeGreaterThan(0);
    expect(new Set(kategori)).toEqual(new Set(["kegiatan"]));
  });
});

test.describe("carousel guru & staf", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("tombol kanan menggeser jalur; tombol kiri aktif setelahnya", async ({ page }) => {
    await page.goto("/profil/guru-staf");
    const track = page.locator("#track-umum");
    const prev = page.getByRole("button", { name: "Geser ke kiri: Guru Mata Pelajaran Umum" });
    const next = page.getByRole("button", { name: "Geser ke kanan: Guru Mata Pelajaran Umum" });

    await expect(prev).toHaveAttribute("aria-disabled", "true");
    await expect(next).toHaveAttribute("aria-disabled", "false");
    await expect(next).toHaveAttribute("aria-controls", "track-umum");

    await next.click();
    await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
    await expect(prev).toHaveAttribute("aria-disabled", "false");
    await expect(prev).toBeEnabled();
  });
});

test.describe("marquee & hitung naik", () => {
  test("tombol Jeda menghentikan running text (aria-pressed)", async ({ page }) => {
    await page.goto("/");
    const btn = page.locator(".hero__marquee .marquee__toggle");
    await expect(btn).toHaveText("Jeda");
    await btn.click();
    await expect(btn).toHaveAttribute("aria-pressed", "true");
    await expect(btn).toHaveText("Putar");
    await expect(page.locator(".hero__marquee")).toHaveClass(/is-paused/);
  });

  test("statistik mencapai nilai akhir setelah terlihat", async ({ page }) => {
    await page.goto("/");
    const angka = page.locator('[data-count="612"]');
    await angka.scrollIntoViewIfNeeded();
    await expect(angka).toHaveText("612", { timeout: 5000 });
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("marquee statis, salinan kedua tersembunyi, bio pimpinan langsung terlihat", async ({ page }) => {
    await page.goto("/");
    const track = page.locator(".hero__marquee .marquee__track");
    expect(await track.evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
    await expect(page.locator(".hero__marquee .marquee__toggle")).toBeHidden();
    await expect(page.locator('[data-count="612"]')).toHaveText("612");

    await page.goto("/profil/guru-staf");
    expect(await page.evaluate(() => document.documentElement.classList.contains("reveal-ready"))).toBe(false);
    await expect(page.locator(".leader__bio").first()).toHaveCSS("opacity", "1");
  });
});

test.describe("tanpa JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });

  test("menu tampil sebagai daftar, filter disembunyikan, semua kartu tampil", async ({ page }) => {
    await page.goto("/galeri");
    await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
    await expect(page.getByRole("navigation", { name: "Menu utama" }).getByRole("link", { name: "Galeri" })).toBeVisible();
    await expect(page.locator(".filter-bar")).toBeHidden();
    const total = await page.locator(".gallery__item").count();
    await expect(page.locator(".gallery__item:visible")).toHaveCount(total);
  });

  test("statistik menampilkan angka akhir dan tombol carousel tersembunyi", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-count="612"]')).toHaveText("612");
    await page.goto("/profil/guru-staf");
    await expect(page.locator(".carousel__controls").first()).toBeHidden();
    await expect(page.locator(".leader__bio").first()).toBeVisible();
  });
});

test.describe("aksesibilitas dasar", () => {
  test("skip link menjadi elemen fokus pertama dan menuju konten utama", async ({ page }) => {
    await page.goto("/informasi/berita");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Langsung ke konten utama" });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#konten");
    await expect(page.locator("main#konten")).toHaveCount(1);
  });

  test("peta hanya dimuat setelah tombol ditekan", async ({ page }) => {
    await page.goto("/kontak");
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.getByRole("button", { name: "Tampilkan peta di sini" }).click();
    const peta = page.locator("iframe");
    await expect(peta).toHaveAttribute("title", /Peta lokasi/);
    await expect(peta).toHaveAttribute("sandbox", "allow-scripts allow-same-origin allow-popups");
    await expect(peta).toHaveAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    await expect(peta).not.toHaveAttribute("allowfullscreen", /.*/);
    await expect(peta).toBeFocused();
  });

  test("salinan kedua marquee tidak bisa difokus (inert)", async ({ page }) => {
    await page.goto("/");
    const salinan = page.locator(".marquee__track > .marquee__group:nth-child(2)");
    await expect(salinan.first()).toHaveAttribute("inert", "");
    await expect(salinan.first()).toHaveAttribute("aria-hidden", "true");
  });
});
