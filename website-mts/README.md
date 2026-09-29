# Website MTs Contoh Al-Hikmah

Website publik madrasah (Tahap 2): Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.
Semua halaman dibuat statis saat build. Konten dikelola programmer sebagai berkas di folder
`content/` — tanpa panel admin dan tanpa database.

> **Semua data di repo ini adalah data contoh** (nama sekolah, NSM/NPSN, alamat, kontak,
> nama guru, angka statistik, berita, dll.). Ganti dengan data asli sebelum terbit.

Desain mengikuti `docs/desain/panduan-desain.md` (versi 2) dan mockup di `docs/desain/wireframe/`.

## Menjalankan

Butuh Node.js 20.9+ (disarankan 22) dan npm.

```bash
npm install          # set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 bila tidak perlu unduh browser
npm run dev          # http://localhost:3000
```

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server pengembangan |
| `npm run build` | Build produksi (semua halaman statis). **Gagal bila ada konten tidak valid.** |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Membuat tipe rute (`next typegen`) lalu `tsc --noEmit` |
| `npm run test` | Unit test Vitest + laporan coverage (ambang 80%) |
| `npm run test:e2e` | Build + start di port 3100, lalu uji Playwright (semua rute di 390 & 1440px, menu HP, filter, carousel, tanpa JS, reduced motion) |

Playwright memakai Chromium di `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; ganti lewat
env `PW_CHROMIUM_PATH`. Tangkapan layar penuh: `SCREENSHOT_DIR=/tmp/shots npx playwright test screenshots`.

URL situs untuk canonical, sitemap, dan Open Graph diambil dari `NEXT_PUBLIC_SITE_URL`
(lihat `.env.example`; bawaan `https://mts-contoh-alhikmah.vercel.app`).

## Struktur folder

```
app/                      Rute (App Router). Satu folder = satu URL.
  page.tsx                Beranda
  profil/ akademik/ informasi/ galeri/ ppdb/ kontak/
  not-found.tsx           Halaman 404
  sitemap.ts robots.ts    SEO
  globals.css             Token desain + semua gaya komponen (turunan wireframe/style.css)
components/
  layout/                 SiteHeader (menu HP), SiteFooter
  home/                   Bagian beranda yang dipakai ulang: WorkCard, NoticeList, AgendaRows, StatRow, ...
  ui/                     Photo (placeholder/next/image), Marquee, CountUp, Carousel, FilterableList,
                          RevealObserver, MapEmbed, PageIntro, Prose, IndexList, ...
content/                  SEMUA KONTEN (lihat bagian berikut)
lib/
  content/schemas.ts      Skema zod untuk setiap jenis konten + konfigurasi situs
  content/loader.ts       Membaca Markdown + frontmatter, validasi, cek slug ganda
  content/repository.ts   Fungsi getBerita(), getAlbums(), ... yang dipakai halaman
  date.ts                 Format tanggal Indonesia ("20 Sep 2026", "28.09.2026", rentang)
  collections.ts          Urut, saring kategori, pisah agenda akan datang/selesai
  ppdb.ts                 Teks tampilan per status PPDB
  nav.ts seo.ts site.ts markdown.ts routes.ts
public/unduhan/           PDF yang bisa diunduh
public/images/            (buat sendiri) foto asli
tests/e2e/                Uji Playwright
tests/fixtures/           Berkas konten contoh untuk unit test
```

## Mengelola konten

Setiap jenis konten ada di foldernya sendiri di `content/`. Satu berkas `.md` = satu item.
Bagian di antara `---` adalah *frontmatter* (data), di bawahnya isi Markdown.

Aturan umum:

- **Nama berkas** menjadi alamat (slug). Awalan tanggal dibuang otomatis:
  `2026-09-20-juara-mtq-kabupaten.md` → `/informasi/berita/juara-mtq-kabupaten`.
  Pakai huruf kecil, angka, dan tanda hubung. Bisa juga menulis `slug: nama-lain` di frontmatter.
- **Tanggal** ditulis `YYYY-MM-DD`, mis. `2026-09-20`. Tanggal yang mustahil (mis. `2026-02-30`) ditolak.
- **Teks alternatif foto (`alt`) wajib.** Tulis apa yang terlihat di foto, mis.
  "Siswi berjilbab putih memegang piala di panggung MTQ".
- **HTML mentah di Markdown dibuang** demi keamanan. Pakai sintaks Markdown biasa
  (judul `##`, **tebal**, *miring*, daftar `-`, tabel, tautan `[teks](/alamat)`).
- Setelah mengubah konten, jalankan `npm run build`. Bila ada kesalahan, build berhenti dengan
  pesan seperti:

  ```
  Konten tidak valid di content/berita/2026-09-20-juara.md:
    - kategori: Pilihan tidak valid: diharapkan salah satu dari "Berita"|"Kegiatan"|"Prestasi"
    - alt: wajib diisi
  ```

### Berita — `content/berita/`

```md
---
judul: "Juara 1 MTQ Tingkat Kabupaten"
tanggal: 2026-09-20
kategori: Prestasi            # Berita | Kegiatan | Prestasi
ringkasan: "Fulanah Azzahra meraih juara pertama cabang Tilawah..."
alt: "Siswi berjilbab putih memegang piala di panggung MTQ"
# sampul: /images/berita/juara-mtq.webp   # opsional; kosong = placeholder bergaris
---
Isi berita dalam **Markdown**.
```

Tiga berita terbaru tampil di beranda; semua berita di `/informasi/berita` (bisa disaring per kategori).

### Pengumuman — `content/pengumuman/`

```md
---
judul: "Jadwal Penilaian Tengah Semester Ganjil 2026/2027"
tanggal: 2026-09-28
kategori: Akademik            # Umum | Akademik | Keuangan | PPDB
penting: true                 # opsional; true → label "Penting"
---
Isi pengumuman.
```

Tiga terbaru tampil di beranda dan menaut ke `/informasi/pengumuman#<slug>`.

### Agenda — `content/agenda/`

```md
---
judul: "Penilaian Tengah Semester Ganjil"
mulai: 2026-10-12
selesai: 2026-10-17           # opsional (acara satu hari cukup `mulai`)
waktu: "07.15–11.30 WIB"      # opsional
tempat: "Ruang kelas 7–9"     # opsional
kategori: Ujian               # Akademik | Ujian | Libur | Kegiatan
---
```

Pembagian "Akan datang" / "Telah berlangsung" dihitung **saat build** (zona WIB). Karena situs
statis, lakukan build ulang (push ke GitHub) minimal saat ada perubahan agenda.

### Prestasi — `content/prestasi/`

```md
---
judul: "Juara 1 MTQ Cabang Tilawah Remaja Putri"
tanggal: 2026-09-20
tingkat: Kabupaten/Kota       # Kecamatan | Kabupaten/Kota | Provinsi | Nasional | Internasional
peraih: "Fulanah Azzahra (8B)"
penyelenggara: "LPTQ Kabupaten Contoh"   # opsional
berita: juara-mtq-kabupaten   # opsional: slug berita terkait
---
```

### Galeri (album) — `content/galeri/`

```md
---
judul: "Wisuda Tahfiz 2026"
kategori: keagamaan           # akademik | keagamaan | ekstrakurikuler | prestasi
tempat: "Aula"
tanggal: 2026-06-14
alt: "Santri mengenakan toga wisuda tahfiz di panggung aula"   # untuk foto sampul
rasio: tall                   # tall (4:5) | portrait (3:4) | square | wide (16:10)
# sampul: /images/galeri/wisuda-tahfiz.webp
foto:                         # minimal 1
  - alt: "Prosesi penyematan selempang oleh orang tua"
    keterangan: "Prosesi penyematan selempang"   # opsional, tampil di bawah foto
    # src: /images/galeri/wisuda-tahfiz-01.webp
---
Deskripsi album.
```

Nama berkas boleh diawali `YYYY-MM-` (mis. `2026-06-wisuda-tahfiz-2026.md` → `/galeri/wisuda-tahfiz-2026`).

### Guru & staf — `content/guru/`

```md
---
nama: "H. Ahmad Fulan, S.Pd.I., M.Pd."
kelompok: pimpinan            # pimpinan | umum | pai | tendik
jabatan: "Kepala Madrasah"    # atau mata pelajaran/tugas
mulai_mengajar: 2005          # opsional
urutan: 1                     # urutan dalam kelompok (kecil = lebih dulu)
alt: "Foto potret H. Ahmad Fulan, S.Pd.I., M.Pd."
# foto: /images/guru/ahmad-fulan.webp   # potret B/W, rasio 3:4
---
```

`pimpinan` tampil di grid atas (Kepala Madrasah sebaiknya `urutan: 1` — dipakai juga di halaman Profil);
`umum`, `pai`, `tendik` tampil sebagai tiga carousel.

### Program unggulan — `content/program/`

```md
---
judul: "Tahfiz Al-Qur'an"
urutan: 1
ringkasan: "Target hafalan minimal 3 juz selama tiga tahun..."
---
Penjelasan lengkap (tampil di /akademik/program-unggulan).
```

### Ekstrakurikuler — `content/ekstrakurikuler/`

```md
---
nama: "Pramuka"
urutan: 1
jadwal: "Jumat, 14.00–16.00"
pembina: "Muhammad Rizal, S.Pd."
ringkasan: "Wajib bagi kelas 7..."
slug: pramuka
---
```

### Unduhan — `content/unduhan/`

```md
---
judul: "Brosur PPDB 2027/2028"
keterangan: "Ringkasan syarat, jadwal, dan alur pendaftaran."
tanggal: 2026-09-01
berkas: /unduhan/brosur-ppdb-2027-2028.pdf   # opsional; kosong → "Segera tersedia"
ukuran: "1 halaman"                          # opsional
---
```

Letakkan PDF-nya di `public/unduhan/` dengan nama yang sama (huruf kecil dan tanda hubung).
Unit test memeriksa bahwa setiap `berkas` benar-benar ada.

### Halaman teks — `content/halaman/`

`sambutan.md`, `sejarah.md`, `visi-misi.md`, `struktur-organisasi.md`, `akreditasi.md`,
`kurikulum.md`, `ppdb.md`. Frontmatter: `judul` dan `deskripsi` (dipakai juga sebagai deskripsi SEO).

### Data terstruktur (TypeScript)

| Berkas | Isi |
|---|---|
| `content/site.ts` | Identitas, alamat, kontak, media sosial, peta, jam layanan, statistik beranda, teks berjalan, **PPDB** |
| `content/profil.ts` | Bagan struktur organisasi, data akreditasi |
| `content/akademik.ts` | Mata pelajaran per kelompok + JP/minggu |
| `content/ppdb.ts` | Jadwal, syarat, jalur, biaya, alur, FAQ PPDB |

`content/site.ts` divalidasi dengan zod saat build (mis. NSM harus 12 digit, akhir pendaftaran
tidak boleh sebelum awal). Berkas TS lain dicek oleh TypeScript (`npm run typecheck`).

## Mengubah status PPDB

Di `content/site.ts`, bagian `ppdb`:

```ts
ppdb: {
  tahunAjaran: "2027/2028",
  status: "belum-dibuka",       // "belum-dibuka" | "dibuka" | "ditutup"
  pendaftaran: { mulai: "2027-01-11", selesai: "2027-03-13" },
  pengumumanHasil: "2027-04-03",
  kuota: 192,
  rombel: 6,
  formulirUrl: undefined,       // isi "/ppdb/daftar" setelah formulir Tahap 3 siap
  brosur: "/unduhan/brosur-ppdb-2027-2028.pdf",
},
```

| `status` | Bar beranda | Blok formulir di `/ppdb` |
|---|---|---|
| `belum-dibuka` | "PPDB 2027/2028 segera dibuka · 11 Jan – 13 Mar 2027 · Info →" | "Formulir pendaftaran online dibuka 11 Januari 2027" |
| `dibuka` | "PPDB 2027/2028 dibuka · 11 Jan – 13 Mar 2027 · Daftar →" (sama dengan mockup) | "…dibuka sampai 13 Maret 2027" + tombol **Daftar online** bila `formulirUrl` diisi |
| `ditutup` | "PPDB 2027/2028 ditutup · Pengumuman hasil 3 Apr 2027 · Lihat info →" | "Pendaftaran online sudah ditutup" |

Status ditulis manual (bukan otomatis dari tanggal) agar panitia bisa memperpanjang atau menutup lebih awal.
Jadwal tiga langkah ada di `content/ppdb.ts` — samakan tanggalnya bila periode berubah.

## Mengganti warna aksen

Ubah **satu baris** di `app/globals.css`:

```css
:root {
  --accent: #0f6b45;   /* ganti, mis. #F15A22 untuk oranye */
}
```

`--accent-strong` (teks kecil, tombol, bar) dihitung otomatis dengan `color-mix` agar tetap lolos
kontras WCAG AA. Utilitas Tailwind (`text-accent`, `bg-accent-strong`, ...) ikut berubah.
Periksa tabel kontras di panduan desain §3.2 bila memakai warna yang jauh lebih terang.

## Mengganti placeholder dengan foto asli

1. Siapkan foto WebP/AVIF ≤ 200 KB (potret guru boleh langsung hitam-putih, rasio 3:4).
2. Simpan di `public/images/<jenis>/`, mis. `public/images/berita/juara-mtq.webp`.
   Nama berkas: huruf kecil, angka, tanda hubung.
3. Isi field foto di frontmatter:
   - berita/galeri: `sampul: /images/berita/juara-mtq.webp`
   - foto album: `src:` pada tiap item `foto`
   - guru: `foto: /images/guru/ahmad-fulan.webp`
4. Pastikan `alt` menggambarkan foto yang baru.

Komponen `components/ui/Photo.tsx` otomatis merender `next/image` (ukuran responsif, lazy load)
di bingkai rasio yang sama, sehingga efek zoom dan monokrom→warna tetap berjalan. Foto hero beranda
masih placeholder statis di `app/page.tsx` (bagian HERO): ganti `<div className="ph hero__ph">` dengan
`<Photo src="/images/hero.webp" alt="..." priority className="hero__ph" />` dan beri lapisan terang
di area teks sesuai panduan desain §3.2.

## Aksesibilitas & perilaku tanpa JS

- Skip link, landmark, satu `h1` per halaman, `aria-current` di menu (`page` / `true` untuk induk).
- Target sentuh ≥ 44px, fokus terlihat, `prefers-reduced-motion` mematikan marquee/hitung naik/reveal.
- Tanpa JavaScript: menu tampil sebagai daftar, filter disembunyikan (semua item tampil), carousel
  tetap bisa digeser, angka statistik langsung angka akhir, peta diganti tautan Google Maps.
