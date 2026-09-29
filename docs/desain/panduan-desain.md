# Panduan Desain Website MTs Contoh Al-Hikmah — Versi 2

**Arah baru: editorial, minimal, "arsitektural".** Versi 2 mengganti arah visual versi 1 (hero hijau bergradien, aksen emas, motif khatam, bingkai mihrab) dengan gaya wireframe referensi yang disukai: halaman putih-hangat, teks hampir hitam, **satu** warna aksen yang tegas, judul huruf besar berukuran raksasa, label monospace berjarak lebar, dan footer hitam. Isinya tetap isi madrasah.

| Berkas | Isi |
|---|---|
| [`wireframe/beranda.html`](./wireframe/beranda.html) | Beranda |
| [`wireframe/galeri.html`](./wireframe/galeri.html) | Galeri Kegiatan (adaptasi layar *Project/Portfolio*) |
| [`wireframe/guru-staf.html`](./wireframe/guru-staf.html) | Guru & Staf (adaptasi layar *About*) |
| [`wireframe/style.css`](./wireframe/style.css) | Token + komponen bersama ketiga halaman |

> **Mockup lama sudah tidak berlaku.** `docs/desain/beranda.html` (versi 1) digantikan oleh `wireframe/beranda.html` dan akan dipindahkan ke `docs/desain/arsip/`. Bagian versi 1 yang masih berlaku (performa, struktur konten Markdown) dibawa ke dokumen ini.

> Semua identitas (nama, NSM 121200000000, NPSN 00000000, alamat Jl. Pendidikan No. 1 Kota Contoh, WA 0812-0000-0000, email, media sosial, angka statistik, nama guru) adalah **data contoh** dan wajib diganti dengan data asli sebelum terbit.

## 1. Prinsip desain

| Prinsip | Artinya dalam praktik |
|---|---|
| **Tipografi adalah dekorasi** | Tidak ada ornamen, gradien, bayangan, atau sudut membulat. Karakter datang dari skala huruf (wordmark raksasa vs label 12px) dan garis rambut 1px. |
| **Satu aksen** | Hijau madrasah hanya untuk wordmark, menu aktif, label, angka besar, dan tombol. Selebihnya hitam, abu-hangat, dan putih-hangat. |
| **Foto memimpin** | Tata letak disiapkan untuk foto kegiatan yang besar; placeholder bergaris diagonal menandai tempatnya. |
| **Gerak yang bermakna, bisa dimatikan** | Running text, hitung naik, zoom halus, monokrom→warna, reveal, carousel. Semuanya berhenti/disederhanakan bila pengguna memilih *reduced motion*, dan konten tetap utuh tanpa JavaScript. |
| **Prioritas jelas** | PPDB punya tombol khusus di header, bar pengumuman di bawah hero, dan blok sendiri. Kontak selalu di akhir beranda. |

## 2. Peta situs dan navigasi

### 2.1 Peta situs (URL)

Perubahan dari versi 1: **Galeri naik ke menu utama**, dan **Guru & Staf dipindah ke bawah Profil**.

```
/                               Beranda
/profil                         Profil (ringkasan + tautan ke subhalaman)
  /profil/sejarah               Sejarah
  /profil/visi-misi             Visi & Misi
  /profil/struktur-organisasi   Struktur Organisasi
  /profil/akreditasi            Akreditasi
  /profil/guru-staf             Guru & Staf            ← pindah dari /guru-staf
/akademik                       Akademik
  /akademik/kurikulum           Kurikulum
  /akademik/mata-pelajaran      Mata Pelajaran
  /akademik/program-unggulan    Program Unggulan
  /akademik/ekstrakurikuler     Ekstrakurikuler
/informasi                      Informasi
  /informasi/berita             Berita (filter kategori)
  /informasi/berita/[slug]      Detail berita
  /informasi/pengumuman         Pengumuman
  /informasi/agenda             Agenda
  /informasi/prestasi           Prestasi
  /informasi/unduhan            Unduhan
/galeri                         Galeri Kegiatan (filter kategori)  ← naik ke menu utama
  /galeri/[album]               Album
/ppdb                           PPDB (syarat, jadwal, biaya, alur, formulir)
/kontak                         Kontak
```

Pasang pengalihan 301 dari `/guru-staf` ke `/profil/guru-staf` bila URL lama pernah dibagikan.

### 2.2 Navigasi utama

`PROFIL · AKADEMIK · INFORMASI · GALERI · KONTAK` + tombol **DAFTAR PPDB** (latar aksen).

- Kiri: wordmark kecil berjarak lebar ("AL-HIKMAH") → Beranda. Di beranda wordmark diberi `aria-current="page"`.
- Tautan menu huruf besar, `letter-spacing: .16em`, abu `--muted`; aktif = warna aksen + `aria-current` (`page` untuk halaman persis, `true` untuk induk bagian, mis. PROFIL saat di Guru & Staf).
- **Desktop (≥ 1024px):** satu baris di kanan, garis rambut di bawah header. Tanpa dropdown; subhalaman dicapai lewat halaman induk dan footer.
- **Mobile (< 1024px):** wordmark + tombol hamburger 44×44px (`aria-expanded`, `aria-controls`, label "Menu"). Panel turun penuh lebar, berisi item utama + subtautan penting (mis. "Guru & Staf" terindentasi di bawah Profil) + tombol PPDB. `Esc` menutup dan mengembalikan fokus ke tombol; mengetuk tautan juga menutup panel.
- **Tanpa JS:** tombol hamburger disembunyikan dan menu tampil sebagai daftar tautan yang membungkus di bawah wordmark.
- Di mockup, tautan PROFIL mengarah ke `guru-staf.html` karena halaman Profil belum dibuat; AKADEMIK/INFORMASI/KONTAK/PPDB mengarah ke jangkar di beranda.

## 3. Token

Semua token ada di `:root` pada [`wireframe/style.css`](./wireframe/style.css). Hanya tema terang.

### 3.1 Warna

| Token | Nilai | Peran |
|---|---|---|
| `--accent` | `#0F6B45` | **Satu-satunya warna aksen** (hijau madrasah). Wordmark hero, angka statistik, nomor program. |
| `--accent-strong` | `color-mix(in srgb, var(--accent) 70%, var(--ink))` → ≈ `#155439` | Turunan otomatis untuk **teks kecil** (label, menu aktif, tautan) dan **latar tombol/bar**. Cadangan tanpa `color-mix`: sama dengan `--accent`. |
| `--ink` | `#231F1C` | Teks utama, garis tebal |
| `--muted` | `#5F5851` | Teks sekunder, meta miring, menu tidak aktif |
| `--line` | `#DDD6CB` | Garis rambut 1px |
| `--surface` | `#FDFCFA` | Latar halaman |
| `--canvas` | `#EFEBE4` | Latar seksi selang-seling (blok PPDB) |
| `--on-accent` | `#FDFCFA` | Teks di atas latar aksen |
| `--footer-bg` / `--footer-ink` | `#0E0C0B` / `#BDB5AC` | Footer hitam |
| `--ph-*` | krem, abu (B/W), hijau-krem (berwarna) | Placeholder bergaris diagonal |

**Mengganti aksen = mengubah satu baris.** `--accent: #F15A22;` mengembalikan oranye wireframe; `--accent-strong` ikut menyesuaikan sendiri.

### 3.2 Kontras (WCAG 2.2 AA)

Batas: 4,5:1 teks biasa, 3:1 teks besar (≥ 24px, atau ≥ 18,66px tebal) dan komponen UI.

| Pasangan | Hijau `#0F6B45` | Oranye `#F15A22` (bila diganti) |
|---|---|---|
| `--accent-strong` di atas `--surface` (label, tautan) | 8,7:1 | 5,3:1 |
| `--accent-strong` di atas `--canvas` (label di blok PPDB) | 7,5:1 | 4,6:1 |
| `--on-accent` di atas `--accent-strong` (tombol, bar PPDB) | 8,7:1 | 5,3:1 |
| `--accent` mentah di atas `--surface` (angka/judul besar saja) | 6,4:1 | 3,3:1 — **hanya teks besar** |
| `--muted` di atas `--surface` / `--canvas` | 6,8:1 / 5,9:1 | — |
| `--ink` di atas `--surface` | ≈ 16:1 | — |
| `--footer-ink` di atas `--footer-bg` | 9,6:1 | — |
| Label placeholder `#5A524B` di atas garis tergelap | ≥ 5,0:1 | — |

Aturan:
- `--accent` mentah **hanya** untuk teks ≥ 24px (wordmark, angka statistik, nomor program). Teks kecil selalu `--accent-strong`.
- Wordmark dan subjudul hero berada di atas foto. Dengan foto asli, beri lapisan terang (mis. `rgb(253 252 250 / .6)`) di area teks agar kontras tetap ≥ 3:1 (wordmark) dan ≥ 4,5:1 (subjudul). Dengan oranye, lapisan ini wajib.
- Informasi tidak disampaikan hanya dengan warna: label "Penting" tertulis, filter aktif juga bergaris bawah.

### 3.3 Huruf

| Keluarga | Pemakaian |
|---|---|
| **Space Grotesk** 400/500/700 | Semua judul, isi, menu, angka |
| **Space Mono** 400/700 | Label/eyebrow, tanggal pengumuman, nomor langkah, label placeholder, footer legal |

Dimuat dari Google Fonts dengan `display=swap` (satu-satunya sumber eksternal di mockup). Di Next.js pakai `next/font/google` agar di-host sendiri. Gaya miring pada meta ("20 Sep 2026 · Prestasi") memakai *oblique* sintetis Space Grotesk, sama seperti referensi.

### 3.4 Skala huruf

| Token | Nilai (`clamp`) | 360px → 1440px | Gaya | Pemakaian |
|---|---|---|---|---|
| `--fs-hero` | `clamp(3rem, 14vw, 13rem)` | 50 → 208px | 700, huruf besar, `line-height .85`, `letter-spacing -.04em`, tidak membungkus | Wordmark hero "AL-HIKMAH" |
| `--fs-display` | `clamp(2.75rem, 1.2rem + 6.6vw, 5.75rem)` | 44 → 92px | 700, huruf besar, `line-height .92` | "GALERI KEGIATAN", "PPDB 2027/2028" |
| `--fs-stat` | `clamp(3rem, 1.6rem + 5.6vw, 5.5rem)` | 48 → 88px | 700, angka tabular | Angka statistik |
| `--fs-h2` | `clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)` | 28 → 44px | 700, huruf besar | "PIMPINAN MADRASAH", "GURU & STAF" |
| `--fs-h3` | `clamp(1.125rem, 1rem + .5vw, 1.375rem)` | 18 → 22px | 700, huruf besar | Judul kartu, pengumuman, agenda |
| `--fs-lead` | `1.25rem` | 20px | 400, `--muted` | Paragraf pembuka |
| `--fs-base` | `1rem` | 16px | 400, `line-height 1.6` | Teks isi (tidak pernah < 16px) |
| `--fs-sm` | `.875rem` | 14px | 500, `letter-spacing .16em` | Menu, tombol, meta |
| `--fs-label` | `.75rem` | 12px | Space Mono 700, huruf besar, `letter-spacing .18em` | Eyebrow seksi, label kontak, kategori kartu |

Subjudul hero: 12 → 16px, `letter-spacing .34em`. Tanggal agenda: 44 → 72px.

### 3.5 Spasi, tata letak, bentuk

- Spasi kelipatan 4px: `--s-1` 4px … `--s-24` 96px. Seksi: 64px (mobile) / 96px (≥ 1024px) atas-bawah.
- Kontainer maks. 1200px; gutter 16px (dasar) / 24px (≥ 640px) / 40px (≥ 1024px).
- Breakpoint: 640px (galeri 2 kolom), 768px (grid berita asimetris, statistik 4 kolom, kontak 2 kolom, program 3 kolom), 1024px (menu desktop, galeri 3 kolom, pimpinan 4 kolom). Diuji di 360, 390, 768, 1440px tanpa scroll horizontal halaman.
- **Radius 0** dan **tanpa bayangan**, kecuali tombol panah carousel (bulat) dan bayangan panel menu HP.
- Pemisah: garis rambut `--line` 1px; garis `--ink` 1px untuk kepala kolom program dan timeline PPDB.

## 4. Inventaris komponen

| Komponen (React) | Kelas di mockup | Dipakai di | Catatan |
|---|---|---|---|
| `SiteHeader` | `.site-header`, `.site-header--overlay` | Semua | Varian overlay transparan di atas hero beranda. |
| `SkipLink` | `.skip-link` | Semua | Elemen fokus pertama. |
| `Hero` | `.hero`, `.hero__wordmark`, `.hero__sub` | Beranda | Foto full-bleed; `h1` = wordmark + subjudul "MADRASAH TSANAWIYAH · KOTA CONTOH". |
| `Marquee` | `.marquee`, `.marquee-text`, `.tile` | Beranda (hero, ekskul) | Satu komponen, dua isi: teks keunggulan dan petak ekskul (pola strip logo klien). |
| `AnnouncementBar` | `.announce` | Beranda | Satu tautan penuh-lebar: "PPDB 2027/2028 DIBUKA · 11 JAN – 13 MAR 2027 · DAFTAR →". Status dari konfigurasi PPDB. |
| `SectionHead` | `.section-head`, `.label`, `.link-arrow` | Semua | Eyebrow mono + tautan "SEMUA … →" di kanan. |
| `NewsGrid` + `WorkCard` | `.news-grid`, `.work` | Beranda | 3 berita: besar-tinggi kiri, kecil kanan turun ke bawah, ketiga di bawahnya. Judul huruf besar, meta miring rata kanan, garis rambut. |
| `NoticeList` | `.notice-list`, `.notice` | Beranda | Tanggal mono `28.09.2026`, judul, tag kategori ("Penting" beraksen). Seluruh baris satu tautan. |
| `StatRow` | `.stats`, `.stat` | Beranda | `<dl>`; 612 Siswa aktif · 48 Guru & staf · 14 Ekstrakurikuler · A Akreditasi. |
| `ProgramColumns` | `.programs`, `.program` | Beranda | 3 kolom bernomor 01–03 dengan garis hitam di atas. |
| `AgendaRows` | `.agenda`, `.agenda__row` | Beranda | Tanggal besar + bulan (label), judul, waktu/tempat miring. |
| `PpdbBlock` | `.ppdb`, `.steps` | Beranda | Judul display "PPDB 2027/2028", 3 langkah bertanggal, tombol "DAFTAR ONLINE" (solid) + "UNDUH BROSUR" (garis). |
| `ContactGrid` | `.contact-grid`, `.contact-item` | Beranda | Pasangan label/nilai: WhatsApp, Email, Instagram, YouTube, Alamat + "Lihat di Google Maps →", Jam layanan. |
| `SiteFooter` | `.site-footer` | Semua | Hitam: wordmark · daftar tautan · NSM/NPSN + © 2026. |
| `PageIntro` | `.page-intro`, `.display` | Galeri | Titik hitam kecil + judul display raksasa. |
| `FilterTabs` | `.filter`, `.filter__btn` | Galeri | Tombol `aria-pressed`; aktif = aksen + garis bawah 2px. Status jumlah di `role="status"`. |
| `MasonryGallery` | `.gallery`, `.gallery__card` | Galeri | CSS `columns` 1/2/3; kartu = foto, kategori aksen, judul, meta, garis rambut. |
| `LeaderGrid` | `.leaders`, `.leader__bio` | Guru & Staf | 4 potret B/W, bio (nama besar, jabatan label aksen, "Mengajar sejak …"). 2 kolom di HP, 4 di desktop. |
| `PeopleCarousel` | `.carousel`, `.person`, `.round-btn` | Guru & Staf | Baris per kelompok: Guru Mapel Umum, Guru PAI & Bahasa Arab, Tenaga Kependidikan. |
| `Placeholder` | `.ph`, `.ph--bw`, `.ph--color` | Semua | Kotak bergaris diagonal + label mono "[ foto … ]", `role="img"` + `aria-label`. Hanya untuk tahap desain. |
| Tombol | `.btn--solid`, `.btn--line`, `.nav__cta` | Semua | Tinggi 52px (44px di header), huruf besar berjarak, radius 0; hover berubah ke `--ink` / terisi aksen. |

## 5. Pola interaksi

Semua efek hover **juga** berlaku untuk `:focus-visible`. Hanya properti `transform`, `opacity`, dan `filter` yang dianimasikan.

| Pola | Perilaku | Aksesibilitas | *Reduced motion* | Tanpa JS |
|---|---|---|---|---|
| **Marquee** (running text, strip ekskul) | Dua salinan isi digeser `translateX(-50%)` tanpa henti (40–50 dtk per putaran). Terpotong di dalam wadahnya sendiri (`overflow: hidden`). | Berhenti saat hover/fokus; tombol **Jeda/Putar** (`aria-pressed`) memenuhi WCAG 2.2.2. Salinan kedua dan jalurnya `aria-hidden`; daftar teks utuh tersedia untuk pembaca layar (`.sr-only`). | Animasi mati, salinan kedua disembunyikan, isi membungkus menjadi daftar statis. | Animasi CSS tetap jalan; tombol jeda disembunyikan (butuh JS). |
| **Hitung naik** (statistik) | Angka naik dari 0 ke nilai akhir dalam 1,4 dtk (easing *ease-out cubic*) saat 60% terlihat, sekali saja. Angka tabular agar lebar tidak goyang. | Angka animasi `aria-hidden`; nilai akhir ada di `.sr-only`, jadi pembaca layar tidak mendengar hitungan. | Tidak ada animasi; langsung angka akhir. | Angka akhir tertulis di HTML. |
| **Zoom halus** (kartu berita, galeri, foto guru) | Foto `scale(1.05)` dalam 700ms di dalam bingkai `overflow: hidden`; judul bergaris bawah. | Kartu adalah satu tautan, fokus memicu efek yang sama. | Tidak ada skala. | Berfungsi (CSS). |
| **Monokrom → warna** (galeri) | Foto `grayscale(1)` → `grayscale(0)` dalam 500ms saat hover/fokus. | Di perangkat sentuh (`hover: none`) foto langsung berwarna. | Transisi instan. | Berfungsi (CSS). |
| **Scroll reveal** (bio pimpinan) | Bio muncul *fade + slide up* 28px, 800ms, bertahap 120ms per orang saat 20% terlihat. | Status tersembunyi hanya dipasang oleh JS (`.reveal-ready`) setelah memastikan `IntersectionObserver` ada. | Tidak ada; bio langsung terlihat. | Bio langsung terlihat. |
| **Carousel** (guru & staf) | Scroll horizontal asli + `scroll-snap`, bisa di-swipe; tombol bulat ‹ › menggeser 80% lebar. Terpotong di dalam jalurnya sendiri. | Tombol ber-`aria-label` ("Geser ke kanan: Guru PAI & Bahasa Arab") dan `aria-controls`; di ujung memakai `aria-disabled` (bukan `disabled`) agar fokus tidak hilang. Jalur `tabindex="0"` sehingga bisa digeser dengan panah keyboard; saat jalur difokus semua nama tampil. Nama & tugas tampil saat hover/`:focus-within`, dan **selalu tampil** di layar < 768px atau perangkat sentuh. | Geser tombol tanpa animasi halus. | Tombol disembunyikan; scroll/swipe asli tetap jalan, nama tampil saat hover. |
| **Filter galeri** | Klik kategori → kartu lain `hidden`; status "3 kegiatan" diumumkan lewat `role="status"`. Di HP bar filter scroll horizontal sendiri. | Tombol asli dengan `aria-pressed`; target 44px. | Tidak relevan. | Bar filter disembunyikan; semua kartu tampil. |
| **Menu HP** | Lihat 2.2. | `aria-expanded`, `aria-controls`, `Esc`, fokus kembali. | Ikon berubah tanpa animasi. | Menu tampil sebagai daftar. |

## 6. Aksesibilitas (wajib)

1. Target ketuk minimal **44×44px** untuk semua tautan dan tombol mandiri (menu, tombol panah, filter, tautan kontak, tautan footer).
2. **Fokus terlihat:** `outline: 3px solid var(--accent-strong); outline-offset: 3px`; di footer hitam dan bar PPDB warna outline berganti (`--focus`) agar tetap kontras.
3. Skip link "Langsung ke konten utama" → `<main id="konten">`.
4. Landmark: `<header>`, `<nav aria-label="Menu utama">`, `<main>`, `<nav aria-label="Tautan footer">`, `<footer>`; setiap seksi `<section aria-labelledby>`; satu `h1` per halaman.
5. Tanggal memakai `<time datetime>`; format tampilan Indonesia.
6. Placeholder/foto punya teks alternatif deskriptif; hiasan `aria-hidden`.
7. Kontras sesuai 3.2; `prefers-reduced-motion` sesuai tabel 5.
8. Tidak ada scroll horizontal halaman di 360–1440px: marquee, filter, dan carousel memotong isinya di wadah sendiri. Wordmark hero tidak membungkus dan diskalakan dengan `vw`.
9. `lang="id"`; zoom 200% tidak memotong teks; `user-scalable` tidak dikunci.

## 7. Performa (dibawa dari versi 1, disesuaikan)

| Aturan | Target |
|---|---|
| Berat beranda | ≤ 500 KB muat pertama, ≤ 1 MB dengan semua gambar |
| JavaScript | Vanilla, kecil (< 3 KB per halaman di mockup). Tanpa pustaka carousel/animasi. `IntersectionObserver`, bukan *scroll handler*. |
| Gambar | `next/image`, WebP/AVIF, `sizes` benar; hero `priority`, sisanya `lazy`. Foto sumber ≤ 200 KB; potret guru B/W bisa diekspor langsung grayscale. |
| Huruf | Dua keluarga (Space Grotesk 3 bobot, Space Mono 2 bobot), di-host sendiri, `display: swap`. |
| Peta & video | Tidak di-embed di beranda; cukup tautan "Lihat di Google Maps →". |
| Core Web Vitals (HP) | LCP ≤ 2,5 dtk, CLS ≤ 0,1, INP ≤ 200 md. Wordmark hero adalah teks, jadi LCP tidak bergantung pada foto. |

## 8. Pemetaan token ke Tailwind

Untuk Tailwind v4, tulis token sebagai variabel di `@theme`; aksen tetap satu variabel.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-accent: #0F6B45;                 /* ganti ke #F15A22 untuk oranye */
  --color-accent-strong: color-mix(in srgb, var(--color-accent) 70%, #231F1C);
  --color-ink: #231F1C;
  --color-muted: #5F5851;
  --color-line: #DDD6CB;
  --color-surface: #FDFCFA;
  --color-canvas: #EFEBE4;
  --color-footer: #0E0C0B;

  --font-sans: var(--font-space-grotesk), system-ui, sans-serif;
  --font-mono: var(--font-space-mono), ui-monospace, monospace;

  --text-label: 0.75rem;
  --text-h3: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
  --text-h2: clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem);
  --text-display: clamp(2.75rem, 1.2rem + 6.6vw, 5.75rem);
  --text-stat: clamp(3rem, 1.6rem + 5.6vw, 5.5rem);
  --text-hero: clamp(3rem, 14vw, 13rem);

  --tracking-label: 0.18em;
  --tracking-nav: 0.16em;
  --tracking-hero-sub: 0.34em;

  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

## 9. Struktur konten Markdown (acuan untuk komponen)

```md
---
# content/berita/2026-09-20-juara-mtq.md
judul: "Juara 1 MTQ Tingkat Kabupaten"
tanggal: 2026-09-20
kategori: Prestasi        # Berita | Prestasi | Kegiatan
jenis: berita             # berita | pengumuman
penting: false            # khusus pengumuman → tag "Penting"
sampul: /images/berita/juara-mtq.webp
alt: "Siswi berjilbab putih memegang piala di panggung MTQ"
ringkasan: "Ananda Fulanah meraih juara pertama cabang tilawah..."
---
```

```md
---
# content/galeri/2026-06-wisuda-tahfiz.md
judul: "Wisuda Tahfiz 2026"
kategori: keagamaan       # akademik | keagamaan | ekstrakurikuler | prestasi
tempat: "Aula"
tanggal: 2026-06-14
sampul: /images/galeri/wisuda-tahfiz.webp
alt: "Santri mengenakan toga wisuda tahfiz di panggung aula"
---
```

```md
---
# content/guru/ahmad-fulan.md
nama: "H. Ahmad Fulan, S.Pd.I., M.Pd."
kelompok: pimpinan        # pimpinan | umum | pai | tendik
jabatan: "Kepala Madrasah" # atau mata pelajaran
mulai_mengajar: 2005
foto: /images/guru/ahmad-fulan.webp   # potret B/W, rasio 3:4
---
```

```md
---
# content/agenda/2026-10-12-pts.md
judul: "Penilaian Tengah Semester Ganjil"
mulai: 2026-10-12
selesai: 2026-10-17
waktu: "07.15 – 11.30 WIB"
tempat: "Ruang kelas 7–9"
---
```
