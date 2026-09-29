import type { SiteConfigInput } from "@/lib/content/schemas";

/**
 * KONFIGURASI SITUS — identitas, kontak, statistik, dan status PPDB.
 *
 * SEMUA DATA DI SINI ADALAH DATA CONTOH. Ganti dengan data asli madrasah sebelum terbit.
 * Berkas ini divalidasi saat build (lib/site.ts); isian yang salah menggagalkan build
 * dengan pesan yang menyebut field bermasalah.
 */
export const siteConfig = {
  nama: "MTs Contoh Al-Hikmah",
  namaPendek: "Al-Hikmah",
  jenjang: "Madrasah Tsanawiyah",
  kota: "Kota Contoh",
  deskripsi:
    "Website resmi MTs Contoh Al-Hikmah, Kota Contoh: profil madrasah, berita, agenda, galeri kegiatan, dan informasi PPDB.",
  nsm: "121200000000",
  npsn: "00000000",
  tahunBerdiri: 1987,
  alamat: {
    jalan: "Jl. Pendidikan No. 1",
    kota: "Kota Contoh",
    provinsi: "Provinsi Contoh",
    kodePos: "00000",
  },
  kontak: {
    whatsapp: { tampil: "0812-0000-0000", tautan: "https://wa.me/6281200000000" },
    email: "info@mtscontoh.sch.id",
    telepon: "(0000) 000000",
    instagram: { tampil: "@mtscontohalhikmah", tautan: "https://www.instagram.com/mtscontohalhikmah" },
    youtube: { tampil: "MTs Contoh Al-Hikmah", tautan: "https://www.youtube.com/@mtscontohalhikmah" },
    peta: {
      tautan: "https://www.google.com/maps/search/?api=1&query=Jl.+Pendidikan+No.+1+Kota+Contoh",
      embed: "https://www.google.com/maps?q=Jl.+Pendidikan+No.+1+Kota+Contoh&output=embed",
    },
    jamLayanan: ["Senin–Jumat 07.00–14.00 WIB", "Sabtu 07.00–12.00 WIB"],
  },
  /** Maksimal 4 angka di beranda. Nilai angka dianimasikan (hitung naik); teks tidak. */
  statistik: [
    { label: "Siswa aktif", nilai: 612 },
    { label: "Guru & staf", nilai: 48 },
    { label: "Ekstrakurikuler", nilai: 14 },
    { label: "Akreditasi", nilai: "A" },
  ],
  /** Teks berjalan di bawah hero beranda. */
  keunggulan: [
    "Tahfiz Al-Qur'an",
    "Bahasa Arab",
    "Sains & Teknologi",
    "Pramuka",
    "Hadrah",
    "Olimpiade",
    "Kitab Kuning",
  ],
  ppdb: {
    tahunAjaran: "2027/2028",
    /**
     * Status PPDB: "belum-dibuka" | "dibuka" | "ditutup".
     * Mengubah baris ini mengganti bar pengumuman beranda, blok PPDB, dan halaman /ppdb.
     */
    status: "belum-dibuka",
    pendaftaran: { mulai: "2027-01-11", selesai: "2027-03-13" },
    pengumumanHasil: "2027-04-03",
    kuota: 192,
    rombel: 6,
    /**
     * Tautan pendaftaran online (Linktree yang berisi Google Form), mis. "https://linktr.ee/nama-madrasah".
     * Tombol "Daftar online" hanya muncul saat status "dibuka" dan tautan ini diisi.
     */
    pendaftaranUrl: undefined,
    brosur: "/unduhan/brosur-ppdb-2027-2028.pdf",
  },
} satisfies SiteConfigInput;
