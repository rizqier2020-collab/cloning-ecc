# Rencana Website MTs

Rencana pembuatan website resmi Madrasah Tsanawiyah (MTs). Nama sekolah, logo, dan warna sementara memakai contoh (**MTs Contoh Al-Hikmah**) sampai data asli tersedia.

## 1. Tujuan

- **Profil resmi madrasah** untuk orang tua, calon siswa, dan masyarakat.
- **Pusat informasi** berita, pengumuman, dan agenda sekolah.
- **PPDB online**: pendaftaran peserta didik baru langsung lewat website.

## 2. Keputusan yang sudah diambil

| Topik | Keputusan |
|---|---|
| Pengelola konten | Programmer. Konten disimpan sebagai file Markdown di repo, tanpa panel admin. Perubahan di-push ke GitHub lalu website terbit ulang otomatis. |
| PPDB | **Diperbarui (Tahap 3):** tombol "Daftar online" mengarah ke Linktree PPDB yang berisi Google Form. Data pendaftar tersimpan di Google Form/Sheets milik madrasah; website tidak menyimpan data dan Supabase tidak diperlukan. |
| Identitas sekolah | Pakai contoh dulu, diganti data asli di tahap 6. |

## 3. Fitur inti (MVP)

### Halaman publik

| Halaman | Isi |
|---|---|
| Beranda | Banner, sambutan kepala madrasah, pengumuman & berita terbaru, angka singkat (siswa, guru, akreditasi), tombol PPDB |
| Profil | Sejarah, visi & misi, struktur organisasi, akreditasi, identitas madrasah (NSM/NPSN, alamat) |
| Guru & Staf | Foto, nama, jabatan, mata pelajaran |
| Akademik | Kurikulum, mata pelajaran umum dan PAI (Al-Qur'an Hadis, Akidah Akhlak, Fikih, SKI, Bahasa Arab), program unggulan |
| Kesiswaan | Ekstrakurikuler, OSIM, prestasi siswa |
| Berita & Pengumuman | Daftar artikel dengan kategori dan pencarian sederhana |
| Agenda | Kalender kegiatan (ujian, libur, acara) |
| Galeri | Album foto kegiatan |
| PPDB | Syarat, jadwal, biaya, alur, formulir pendaftaran online |
| Unduhan | Brosur, formulir, kalender akademik (PDF) |
| Kontak | Alamat, peta, tombol WhatsApp, jam layanan, media sosial |

### PPDB online

| Bagian | Isi |
|---|---|
| Formulir | Data calon siswa (nama, NISN, tempat/tanggal lahir, jenis kelamin, asal SD/MI, alamat), data orang tua/wali, nomor WhatsApp, jalur pendaftaran |
| Upload berkas | Kartu Keluarga, akta kelahiran, ijazah/SKL, pas foto (PDF/JPG, ukuran dibatasi) |
| Bukti pendaftaran | Nomor pendaftaran otomatis dan halaman bukti yang bisa dicetak |
| Halaman panitia | Login khusus panitia: daftar pendaftar, buka berkas, unduh CSV |
| Pengumuman hasil | Lewat halaman Pengumuman (cek status per nomor bisa ditambah nanti) |

### Perlindungan data siswa

- Mengikuti UU No. 27/2022 tentang Pelindungan Data Pribadi; pendaftar mencentang persetujuan penggunaan data.
- Berkas disimpan di penyimpanan privat, tidak bisa dibuka lewat link publik.
- Hanya akun panitia yang bisa membaca data; pengunjung hanya bisa mengirim formulir.
- Anti-spam dengan Cloudflare Turnstile dan pembatasan jumlah kiriman.
- Data pendaftar yang tidak diterima dihapus setelah masa PPDB selesai, sesuai kebijakan madrasah.

### Standar kualitas

- Nyaman di HP (mulai lebar 360px) dan cepat di sinyal lemah.
- SEO dasar agar mudah ditemukan di Google.
- Aksesibel (kontras cukup, bisa dipakai dengan keyboard, teks alternatif gambar).
- Berbahasa Indonesia.

## 4. Di luar tahap pertama

- Nilai/rapor online, absensi, e-learning.
- Akun siswa atau orang tua.
- Cek status PPDB per nomor pendaftaran dan notifikasi otomatis ke panitia.
- Aplikasi mobile.

## 5. Teknologi

| Bagian | Pilihan | Catatan |
|---|---|---|
| Website | Next.js + Tailwind CSS | Konten dalam Markdown |
| PPDB | Linktree + Google Form | Tanpa database; tautan diatur di `content/site.ts` (`pendaftaranUrl`) |
| Hosting | Vercel (paket gratis) | Website sekolah bersifat non-komersial |
| Domain | `*.vercel.app` dulu | Nanti bisa pindah ke domain `.sch.id` |

## 6. Tahapan kerja

| Tahap | Pekerjaan | Agent |
|---|---|---|
| 1. Desain | Struktur menu, panduan desain, contoh tampilan beranda | UX Architect, UI Designer |
| 2. Halaman publik | Semua halaman informasi dengan konten contoh dalam Markdown | Frontend Developer |
| 3. PPDB | Formulir, upload berkas, bukti pendaftaran, halaman panitia, perlindungan data | Backend Architect, Database Optimizer |
| 4. Pengujian | Tampilan HP/desktop, alur formulir dari awal sampai akhir, keamanan data PPDB | Test Automation Engineer, security-reviewer |
| 5. Online | Terbit ke Vercel, hubungkan Supabase (akun dan kunci dari pihak sekolah, disimpan sebagai secret) | DevOps Automator |
| 6. Konten asli | Ganti konten contoh dengan data sekolah | — |

## 7. Bahan dari sekolah

- Nama resmi, NSM/NPSN, alamat, kontak.
- Logo (kualitas tinggi) dan warna khas sekolah.
- Sejarah, visi & misi, sambutan kepala madrasah.
- Data guru/staf dan foto kegiatan.
- Informasi PPDB tahun berjalan.

## 8. Pertanyaan terbuka

- Jalur PPDB yang dipakai: reguler, prestasi, afirmasi?
- Apakah ada biaya pendaftaran?
- Apakah panitia perlu notifikasi (email/WhatsApp) setiap ada pendaftar baru?
- Berapa lama data pendaftar disimpan setelah PPDB selesai?
