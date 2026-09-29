/**
 * Data terstruktur untuk halaman Profil. SEMUA DATA ADALAH CONTOH.
 * Teks panjang (sejarah, visi-misi, dll.) ada di content/halaman/*.md.
 */

export interface UnitStruktur {
  readonly jabatan: string;
  readonly nama: string;
}

/** Bagan struktur organisasi, dibaca dari atas ke bawah per tingkat. */
export const strukturOrganisasi: readonly { readonly tingkat: string; readonly unit: readonly UnitStruktur[] }[] = [
  {
    tingkat: "Yayasan & komite",
    unit: [
      { jabatan: "Ketua Yayasan Al-Hikmah", nama: "KH. Abdullah Contoh" },
      { jabatan: "Ketua Komite Madrasah", nama: "H. Mahmud Contoh" },
    ],
  },
  {
    tingkat: "Pimpinan",
    unit: [{ jabatan: "Kepala Madrasah", nama: "H. Ahmad Fulan, S.Pd.I., M.Pd." }],
  },
  {
    tingkat: "Wakil kepala & tata usaha",
    unit: [
      { jabatan: "Waka Kurikulum", nama: "Siti Aminah, S.Pd." },
      { jabatan: "Waka Kesiswaan", nama: "Muhammad Rizal, S.Pd." },
      { jabatan: "Waka Sarana Prasarana", nama: "Drs. Abdul Karim" },
      { jabatan: "Kepala Tata Usaha", nama: "Sri Handayani, S.E." },
    ],
  },
  {
    tingkat: "Koordinator & pembina",
    unit: [
      { jabatan: "Koordinator Tahfiz", nama: "Ust. Zainal Abidin, Al-Hafiz" },
      { jabatan: "Pembina OSIM", nama: "Fajar Nugroho, S.Pd." },
      { jabatan: "Koordinator BK", nama: "Rina Wulandari, S.Pd." },
      { jabatan: "Kepala Perpustakaan", nama: "Lina Marlina, S.Pd." },
    ],
  },
  {
    tingkat: "Pelaksana",
    unit: [
      { jabatan: "Wali kelas 7–9", nama: "18 wali kelas" },
      { jabatan: "Guru mata pelajaran", nama: "36 guru" },
    ],
  },
];

export const akreditasi = {
  peringkat: "A",
  predikat: "Unggul",
  lembaga: "BAN-PDM (Badan Akreditasi Nasional Pendidikan Dasar dan Menengah)",
  nomorSk: "000/BAN-PDM/SK/2024",
  tahun: 2024,
  berlakuSampai: "2029",
  riwayat: [
    { tahun: 2009, peringkat: "B" },
    { tahun: 2014, peringkat: "B" },
    { tahun: 2019, peringkat: "A" },
    { tahun: 2024, peringkat: "A" },
  ],
} as const;
