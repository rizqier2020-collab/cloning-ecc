# Panduan Desain Website MTs Contoh Al-Hikmah

Panduan visual dan komponen untuk website resmi madrasah. Dokumen ini menjadi acuan saat membangun situs dengan Next.js + Tailwind CSS. Mockup beranda yang menerapkan panduan ini ada di [`beranda.html`](./beranda.html).

> Semua identitas (nama, logo, NSM/NPSN, alamat, nomor telepon, angka statistik) adalah **data contoh** dan wajib diganti dengan data asli sebelum terbit.

## 1. Prinsip desain

| Prinsip | Artinya dalam praktik |
|---|---|
| **Terpercaya** | Tata letak rapi, informasi resmi (NSM/NPSN, akreditasi) mudah ditemukan, tidak ada elemen "iklan". |
| **Hangat** | Latar krem lembut, aksen emas, sudut membulat, bahasa yang menyapa orang tua. |
| **Ringan** | Pengunjung utama adalah orang tua di HP dengan sinyal lemah. Satu jenis huruf, tanpa slider, tanpa animasi berat. |
| **Khas madrasah** | Motif bintang delapan (khatam) yang samar dan bingkai foto berbentuk lengkung mihrab, dipakai hemat sebagai ciri, bukan hiasan di mana-mana. |
| **Jelas prioritasnya** | PPDB, pengumuman, dan kontak selalu terjangkau dalam satu-dua ketukan. |

## 2. Peta situs dan navigasi

### 2.1 Peta situs (URL)

```
/                               Beranda
/profil                         Profil (ringkasan + tautan ke subhalaman)
  /profil/sejarah               Sejarah
  /profil/visi-misi             Visi & Misi
  /profil/struktur-organisasi   Struktur Organisasi
  /profil/akreditasi            Akreditasi
/guru-staf                      Guru & Staf
/akademik                       Akademik
  /akademik/kurikulum           Kurikulum
  /akademik/mata-pelajaran      Mata Pelajaran
  /akademik/program-unggulan    Program Unggulan
/kesiswaan                      Kesiswaan
  /kesiswaan/ekstrakurikuler    Ekstrakurikuler
  /kesiswaan/osim               OSIM
  /kesiswaan/prestasi           Prestasi
/berita                         Berita & Pengumuman (filter kategori: Berita | Pengumuman)
  /berita/[slug]                Detail artikel
/agenda                         Agenda
/galeri                         Galeri
  /galeri/[album]               Album
/ppdb                           PPDB (syarat, jadwal, biaya, alur, formulir)
/unduhan                        Unduhan
/kontak                         Kontak
```

### 2.2 Navigasi utama

Sebelas kelompok halaman terlalu banyak untuk satu baris menu. Menu utama dikelompokkan menjadi **5 item + tombol PPDB**, tanpa menghilangkan satu halaman pun:

| Item menu | Isi dropdown |
|---|---|
| Profil | Sejarah, Visi & Misi, Struktur Organisasi, Akreditasi, **Guru & Staf** |
| Akademik | Kurikulum, Mata Pelajaran, Program Unggulan |
| Kesiswaan | Ekstrakurikuler, OSIM, Prestasi |
| Informasi | Berita & Pengumuman, Agenda, Galeri, Unduhan |
| Kontak | (tanpa dropdown) |
| **Daftar PPDB** | Tombol emas, selalu terlihat di header, termasuk di HP |

- **Beranda** dicapai lewat logo (dan tercantum sebagai item pertama di menu HP).
- Guru & Staf tetap punya URL tingkat atas (`/guru-staf`), hanya ditaruh di dropdown Profil agar menu desktop muat.
- Footer memuat **tautan cepat** ke semua halaman sebagai jalur cadangan.

## 3. Warna

### 3.1 Token warna

| Token | Hex | Peran |
|---|---|---|
| `primary-50` | `#EEF6F1` | Latar lembut kartu/ikon hijau |
| `primary-100` | `#D5E9DD` | Garis/aksen lembut hijau |
| `primary-600` | `#0F6B45` | **Hijau madrasah utama**: tombol, tautan, ikon |
| `primary-700` | `#0B5236` | Hover tombol, latar hero |
| `primary-800` | `#0A4430` | Teks judul berwarna hijau |
| `primary-900` | `#07301F` | Latar footer |
| `accent-100` | `#FBF1DC` | Latar lencana emas |
| `accent-200` | `#F6E3B4` | Latar banner PPDB |
| `accent-300` | `#E8C170` | Teks/ikon emas **di atas latar hijau tua** |
| `accent-500` | `#D9A441` | **Emas hangat**: latar tombol PPDB |
| `accent-600` | `#C28A26` | Hover tombol emas, garis hias |
| `accent-700` | `#8A5A12` | Teks emas **di atas latar terang** |
| `ink` | `#1B2420` | Teks utama |
| `muted` | `#4F5B55` | Teks sekunder, meta (tanggal, keterangan) |
| `line` | `#E4E0D6` | Garis batas, pemisah |
| `canvas` | `#FAF8F3` | Latar halaman (krem hangat) |
| `surface` | `#FFFFFF` | Latar kartu |
| `sand` | `#F3EFE5` | Latar seksi selang-seling |
| `danger-600` | `#B42318` | Lencana "Penting", pesan galat |
| `danger-50` | `#FDECEA` | Latar lencana "Penting" |

### 3.2 Kontras (WCAG 2.2 AA)

Batas AA: **4,5:1** untuk teks biasa, **3:1** untuk teks besar (≥ 24px, atau ≥ 18,66px tebal) dan komponen UI.

| Pasangan teks / latar | Rasio | Boleh untuk |
|---|---|---|
| `ink` di atas `canvas` / `surface` | ≈ 15,0:1 / 15,9:1 | Semua teks |
| `muted` di atas `surface` | ≈ 7,1:1 | Semua teks |
| `muted` di atas `sand` | ≈ 6,2:1 | Semua teks |
| Putih di atas `primary-600` | ≈ 6,5:1 | Teks tombol, teks biasa |
| Putih di atas `primary-700` | ≈ 9,2:1 | Teks hero |
| `primary-600` di atas `surface` / `sand` | ≈ 6,5:1 / 5,7:1 | Tautan, judul |
| `ink` di atas `accent-500` (hover `accent-600`) | ≈ 7,1:1 (5,3:1) | Teks tombol PPDB |
| `ink` di atas `accent-200` | ≈ 12,6:1 | Teks banner PPDB |
| `accent-700` di atas `surface` / `accent-100` / `sand` | ≈ 5,9:1 / 5,3:1 / 5,2:1 | Label emas kecil (eyebrow) |
| `accent-300` di atas `primary-700` | ≈ 5,4:1 | Eyebrow/label emas di hero |
| `accent-300` di atas `primary-600` | ≈ 3,8:1 | **Hanya teks besar** (mis. kata kedua judul hero) |
| `#D4E4DA` di atas `primary-600` | ≈ 5,0:1 | Tagline hero |
| `#C8D6CE` di atas `primary-900` | ≈ 9,6:1 | Teks footer |
| `danger-600` di atas `danger-50` | ≈ 5,8:1 | Lencana "Penting" |

**Dilarang:**
- `accent-500` sebagai **warna teks** di latar putih (≈ 2,3:1). Pakai `accent-700`.
- `accent-500` sebagai teks kecil di atas hijau tua (≈ 4,1:1). Pakai `accent-300`.
- Latar `accent-500` untuk ikon/garis di atas putih hanya sebagai hiasan (≈ 2,3:1, di bawah 3:1 untuk komponen UI); outline fokus emas selalu diberi jarak (`outline-offset`) agar tetap terlihat.
- Menyampaikan informasi hanya lewat warna (mis. "Penting" harus tertulis, bukan hanya merah).

## 4. Tipografi

**Huruf:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts). Karya desainer Indonesia, bentuknya ramah dan mudah dibaca di layar kecil.

- Muat hanya bobot **400, 600, 700, 800** dengan `display=swap`. Di Next.js gunakan `next/font/google` (di-host sendiri, tanpa request ke Google saat runtime).
- Cadangan: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Teks Arab (bila ada, mis. kutipan ayat) memakai huruf sistem dengan `lang="ar" dir="rtl"`; jangan menambah font Arab di beranda.

### Skala huruf (mobile → desktop)

| Token | Mobile | Desktop (≥ 1024px) | Bobot | Tinggi baris | Pemakaian |
|---|---|---|---|---|---|
| `display` | 32px | 52px | 800 | 1,1 | Judul hero (satu per halaman) |
| `h1` | 28px | 40px | 800 | 1,15 | Judul halaman dalam |
| `h2` | 24px | 32px | 700 | 1,2 | Judul seksi |
| `h3` | 18px | 20px | 700 | 1,35 | Judul kartu |
| `lead` | 17px | 19px | 400 | 1,6 | Paragraf pembuka |
| `body` | 16px | 16px | 400 | 1,65 | Teks isi (tidak pernah < 16px) |
| `small` | 14px | 14px | 400/600 | 1,5 | Meta, tanggal, keterangan |
| `eyebrow` | 13px | 13px | 700, huruf besar, `letter-spacing: .08em` | 1,4 | Label di atas judul seksi |

Lebar baris teks artikel maksimal **68ch**.

## 5. Spasi, radius, bayangan

### Spasi (kelipatan 4px)

| Token | Nilai | Pemakaian umum |
|---|---|---|
| `1` | 4px | Jarak ikon-teks rapat |
| `2` | 8px | Jarak dalam lencana |
| `3` | 12px | Jarak antar baris meta |
| `4` | 16px | **Gutter samping mobile**, padding kartu kecil |
| `6` | 24px | Padding kartu, gap grid |
| `8` | 32px | Gutter samping desktop |
| `12` | 48px | Jarak judul seksi ke isi (desktop) |
| `16` | 64px | Padding vertikal seksi (mobile) |
| `24` | 96px | Padding vertikal seksi (desktop) |

Kontainer: `max-width: 1200px`, rata tengah, gutter 16px (mobile) / 24px (≥ 640px) / 32px (≥ 1024px).

### Radius

| Token | Nilai | Pemakaian |
|---|---|---|
| `sm` | 6px | Lencana, input |
| `md` | 10px | Tombol |
| `lg` | 16px | Kartu |
| `xl` | 24px | Banner, blok besar |
| `arch` | `999px 999px 16px 16px` | Bingkai foto lengkung (hero, foto kepala madrasah) |
| `full` | 9999px | Pil, avatar bulat |

### Bayangan

| Token | Nilai | Pemakaian |
|---|---|---|
| `sm` | `0 1px 2px rgb(27 36 32 / .06)` | Kartu diam |
| `md` | `0 6px 16px -4px rgb(27 36 32 / .12)` | Kartu hover, dropdown |
| `lg` | `0 18px 40px -12px rgb(7 48 31 / .28)` | Menu HP, banner menonjol |

Bayangan dipakai hemat; batas kartu utamanya garis `line` 1px.

## 6. Breakpoint (mobile-first)

| Nama | Min. lebar | Perubahan utama |
|---|---|---|
| (dasar) | 360px | Satu kolom, menu HP, tombol PPDB ringkas di header |
| `sm` | 640px | Grid kartu 2 kolom, statistik 4 kolom |
| `md` | 768px | Sambutan 2 kolom (foto + teks) |
| `lg` | 1080px | **Menu desktop dengan dropdown**, hero 2 kolom, kartu 3 kolom |
| `xl` | 1280px | Hanya ruang napas lebih; kontainer tetap 1200px |

Catatan: breakpoint menu (`lg`) sengaja 1080px, bukan 1024px, agar 5 item menu + tombol PPDB tidak berdesakan. Uji di 360, 390, 768, 1080, 1440px. Tidak boleh ada scroll horizontal di lebar mana pun.

## 7. Inventaris komponen

Setiap komponen dirancang sebagai komponen React yang menerima data dari frontmatter Markdown.

### 7.1 Header / navigasi (`SiteHeader`)
- **Sticky**, latar putih 95% + garis bawah `line`. Tinggi 64px (mobile) / 76px (desktop).
- Kiri: logo (lambang 40px + nama madrasah dua baris; baris kedua "Madrasah Tsanawiyah" ukuran `small`).
- **Desktop (≥ 1080px):** 5 item menu. Dropdown muncul saat hover **dan** `:focus-within` (bisa dengan keyboard tanpa JS). Item aktif diberi garis bawah emas 2px + `aria-current="page"`.
- **Mobile:** tombol "Daftar PPDB" ringkas + tombol **Menu** (ikon + teks, 44×44px) dengan `aria-expanded`, `aria-controls`. Panel menu turun penuh lebar, sub-halaman tampil sebagai daftar terindentasi (tanpa akordeon, agar sekali ketuk). Tombol `Esc` menutup menu dan mengembalikan fokus ke tombol Menu.
- Tautan "Langsung ke konten utama" (skip link) menjadi elemen fokus pertama.

### 7.2 Hero (`Hero`)
- Latar `primary-700` → `primary-600` (gradien diagonal) dengan motif bintang delapan transparan 8%.
- Isi: eyebrow emas (mis. "Terakreditasi A · Kota Contoh"), judul `display`, tagline `lead`, dua tombol: **utama emas** ("Info PPDB 2027/2028") dan **sekunder garis putih** ("Profil Madrasah").
- Desktop: kolom kanan berisi bingkai foto lengkung (mihrab). Mobile: foto disembunyikan agar hero pendek dan cepat.
- Data: `title`, `tagline`, `ctaPrimary`, `ctaSecondary`, `image`.

### 7.3 Strip statistik (`StatStrip`)
- 4 angka: jumlah siswa, guru & staf, ekstrakurikuler, akreditasi. Kartu putih yang "menumpang" di tepi bawah hero (margin negatif) di ≥ 640px.
- Angka `h2` 800 hijau, label `small` `muted`. Grid 2×2 di mobile, 4 kolom di ≥ 640px. Pakai `<dl>`.

### 7.4 Kartu sambutan kepala madrasah (`SambutanCard`)
- Foto potret dalam bingkai lengkung (rasio 4:5), nama + gelar, jabatan.
- Kutipan pembuka 2–4 kalimat (maks. ±60 kata) dalam `<blockquote>`, tautan "Baca sambutan lengkap".
- Mobile: foto di atas (lebar maks. 220px), teks di bawah. ≥ 768px: dua kolom 5/7.

### 7.5 Daftar pengumuman (`PengumumanList`)
- Maks. 3 item di beranda. Setiap item: blok tanggal (tanggal besar + bulan singkat), judul (tautan), lencana opsional **"Penting"** (`danger`) atau kategori (`accent`), ringkasan 1 baris.
- Seluruh baris adalah satu area ketuk ≥ 44px; `<time datetime>` wajib.
- Tautan "Semua pengumuman →".

### 7.6 Kartu berita (`BeritaCard`)
- Gambar 16:9 (lazy), kategori (eyebrow), judul `h3` maks. 3 baris, tanggal `small`, ringkasan maks. 2 baris.
- Seluruh kartu dapat diklik lewat pola "stretched link" (satu `<a>` di judul, `::after` menutupi kartu), agar pembaca layar tidak mendengar tautan ganda.
- Grid: 1 / 2 / 3 kolom.

### 7.7 Item agenda (`AgendaItem`)
- Tanggal (hari, tanggal, bulan), judul kegiatan, waktu + tempat dengan ikon. Garis kiri emas 4px sebagai penanda.
- Untuk kegiatan multi-hari tampilkan rentang ("12–14 Okt").

### 7.8 Kartu program / ekskul (`ProgramCard`)
- Ikon garis 28px dalam lingkaran `primary-50`, judul `h3`, deskripsi 2–3 kalimat, tautan "Selengkapnya".
- Varian ekskul: ikon diganti foto kecil 1:1, ditambah jadwal latihan.

### 7.9 Banner CTA PPDB (`PpdbBanner`)
- Latar `accent-200` + motif bintang samar, radius `xl`.
- Judul "PPDB 2027/2028 telah dibuka" (atau status lain), ringkasan jadwal 3 gelombang/tahap dalam daftar ber-tanggal, tombol utama hijau "Daftar Sekarang" + tautan sekunder "Unduh brosur (PDF)".
- Status diatur dari satu file konfigurasi (`belum-dibuka` | `dibuka` | `ditutup`) agar teks dan tombol berubah otomatis.

### 7.10 Galeri pratinjau (`GaleriGrid`)
- 6 petak: grid 2 kolom (mobile) / 3 kolom (≥ 640px), rasio 4:3, keterangan singkat di bawah tiap foto.
- Gambar thumbnail ≤ 60 KB (WebP/AVIF), lazy.

### 7.11 Kontak singkat (`KontakRingkas`)
- Alamat, telepon, WhatsApp (tombol hijau, `https://wa.me/…`), email, jam layanan.
- Peta: gambar statis ringan + tautan "Buka di Google Maps". **Jangan** memuat iframe Google Maps di beranda (berat); iframe hanya di `/kontak` dan dimuat setelah diketuk (klik untuk memuat).

### 7.12 Footer (`SiteFooter`)
- Latar `primary-900`, teks `#C8D6CE`, judul kolom putih.
- Kolom: identitas (logo, alamat, NSM, NPSN), tautan cepat, informasi, kontak & media sosial (ikon + label teks).
- Baris bawah: hak cipta "© 2026 MTs Contoh Al-Hikmah" dan tautan kebijakan privasi (dibutuhkan untuk PPDB).

### 7.13 Elemen dasar
| Elemen | Spesifikasi |
|---|---|
| Tombol utama | Latar `primary-600`, teks putih 600, tinggi min. 44px (48px di hero), padding 12×20px, radius `md`. Hover `primary-700`. |
| Tombol PPDB | Latar `accent-500`, teks `ink` 700. Hover `accent-600`. |
| Tombol sekunder | Garis 1,5px `primary-600` (atau putih di latar gelap), latar transparan. |
| Tautan teks | `primary-600`, garis bawah saat hover; tautan dalam paragraf selalu bergaris bawah. |
| Lencana | Tinggi 24px, `small` 600, radius `sm`. |
| Judul seksi | Eyebrow `accent-700` + `h2` + (opsional) tautan "Lihat semua" di kanan. |
| Placeholder foto | Gradien hijau/emas lembut + motif + label "Foto kegiatan" — hanya untuk tahap desain. |

## 8. Aksesibilitas (wajib)

1. **Target ketuk minimal 44×44px** untuk semua tautan dan tombol mandiri; jarak antar target ≥ 8px.
2. **Fokus terlihat:** `outline: 3px solid #D9A441; outline-offset: 2px` (emas terlihat di latar terang maupun hijau tua). Jangan pernah `outline: none` tanpa pengganti.
3. **Skip link** "Langsung ke konten utama" sebagai elemen fokus pertama.
4. **Landmark semantik:** `<header>`, `<nav aria-label="Menu utama">`, `<main id="konten">`, `<footer>`; setiap seksi `<section aria-labelledby>` dengan satu `h1` per halaman dan urutan heading tanpa loncatan.
5. **Teks alternatif:** setiap foto kegiatan memiliki `alt` deskriptif (siapa, sedang apa). Gambar dekoratif (motif) `alt=""` / `aria-hidden="true"`. Frontmatter Markdown wajib punya field `alt` untuk gambar sampul.
6. **Kontras AA** sesuai tabel 3.2.
7. **Menu HP:** `aria-expanded` + `aria-controls`, bisa ditutup dengan `Esc`, fokus kembali ke tombol.
8. **Tanggal** memakai `<time datetime="YYYY-MM-DD">`, format tampilan Indonesia ("29 September 2026").
9. **Gerak:** hormati `prefers-reduced-motion` (matikan transisi transform).
10. **Zoom:** tata letak tetap utuh sampai 200% dan teks tidak terpotong; jangan kunci `user-scalable`.
11. Bahasa halaman `lang="id"`.

## 9. Performa (wajib)

| Aturan | Target |
|---|---|
| Total berat beranda (transfer) | ≤ 500 KB pada muat pertama, ≤ 1 MB dengan semua gambar |
| JavaScript di beranda | Seminimal mungkin; beranda adalah halaman statis (SSG). Tidak ada slider/carousel. |
| Gambar | `next/image`, format WebP/AVIF, `sizes` yang benar, `loading="lazy"` kecuali gambar hero (`priority`). Foto sumber dikompres ≤ 200 KB. |
| Font | Satu keluarga, 4 bobot, di-host sendiri via `next/font`, `display: swap`. |
| Ikon | SVG inline (mis. set Lucide yang dipilih per ikon), bukan font ikon. |
| Peta & video | Tidak di-embed di beranda. YouTube memakai pola "klik untuk memuat". |
| Core Web Vitals (HP, 4G lambat) | LCP ≤ 2,5 dtk, CLS ≤ 0,1, INP ≤ 200 md. |
| Pihak ketiga | Tidak ada widget chat/analitik berat; bila perlu analitik pilih yang ringan dan tanpa cookie. |

## 10. Pemetaan token ke Tailwind

Contoh untuk Tailwind v3 (`tailwind.config.ts`). Untuk Tailwind v4, nilai yang sama ditulis sebagai variabel di blok `@theme` (mis. `--color-primary-600: #0F6B45;`).

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,md,mdx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1080px',
      xl: '1280px',
    },
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { xl: '1200px' },
    },
    extend: {
      colors: {
        primary: {
          50: '#EEF6F1',
          100: '#D5E9DD',
          600: '#0F6B45',
          700: '#0B5236',
          800: '#0A4430',
          900: '#07301F',
          DEFAULT: '#0F6B45',
        },
        accent: {
          100: '#FBF1DC',
          200: '#F6E3B4',
          300: '#E8C170',
          500: '#D9A441',
          600: '#C28A26',
          700: '#8A5A12',
          DEFAULT: '#D9A441',
        },
        ink: '#1B2420',
        muted: '#4F5B55',
        line: '#E4E0D6',
        canvas: '#FAF8F3',
        surface: '#FFFFFF',
        sand: '#F3EFE5',
        danger: { 50: '#FDECEA', 600: '#B42318' },
        footer: { text: '#C8D6CE' },
      },
      fontFamily: {
        // dipasang lewat next/font/google: variable: '--font-jakarta'
        sans: ['var(--font-jakarta)', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        eyebrow: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '700' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        body: ['1rem', { lineHeight: '1.65' }],
        lead: ['1.0625rem', { lineHeight: '1.6' }],
        'lead-lg': ['1.1875rem', { lineHeight: '1.6' }],
        h3: ['1.125rem', { lineHeight: '1.35', fontWeight: '700' }],
        'h3-lg': ['1.25rem', { lineHeight: '1.35', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-lg': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        h1: ['1.75rem', { lineHeight: '1.15', fontWeight: '800' }],
        'h1-lg': ['2.5rem', { lineHeight: '1.15', fontWeight: '800' }],
        display: ['2rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-lg': ['3.25rem', { lineHeight: '1.1', fontWeight: '800' }],
      },
      spacing: {
        // skala 4px bawaan Tailwind sudah cocok (1 = 4px, 4 = 16px, 24 = 96px)
        tap: '2.75rem', // 44px, untuk min-h-tap / min-w-tap
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        arch: '999px 999px 16px 16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgb(27 36 32 / 0.06)',
        md: '0 6px 16px -4px rgb(27 36 32 / 0.12)',
        lg: '0 18px 40px -12px rgb(7 48 31 / 0.28)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}

export default config
```

Kelas fokus global yang disarankan (di `globals.css`):

```css
:focus-visible {
  outline: 3px solid theme('colors.accent.500');
  outline-offset: 2px;
  border-radius: 4px;
}
```

## 11. Struktur konten Markdown (acuan untuk komponen)

```md
---
# content/berita/2026-09-20-juara-mtq.md
judul: "Siswa Kelas 8 Raih Juara 1 MTQ Tingkat Kabupaten"
tanggal: 2026-09-20
kategori: Prestasi        # Berita | Prestasi | Kegiatan
jenis: berita             # berita | pengumuman
penting: false            # khusus pengumuman → lencana "Penting"
sampul: /images/berita/juara-mtq.webp
alt: "Siswi berjilbab putih memegang piala di panggung MTQ"
ringkasan: "Ananda Fulanah meraih juara pertama cabang tilawah..."
---
Isi artikel...
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
