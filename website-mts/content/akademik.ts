/**
 * Mata pelajaran per kelompok dengan alokasi jam pelajaran (JP) per minggu.
 * SEMUA DATA ADALAH CONTOH — sesuaikan dengan struktur kurikulum madrasah.
 */

export interface MataPelajaran {
  readonly nama: string;
  readonly jp: number;
  readonly keterangan?: string;
}

export const kelompokMapel: readonly {
  readonly judul: string;
  readonly catatan: string;
  readonly mapel: readonly MataPelajaran[];
}[] = [
  {
    judul: "Pendidikan Agama Islam & Bahasa Arab",
    catatan: "Ciri khas madrasah di bawah Kementerian Agama.",
    mapel: [
      { nama: "Al-Qur'an Hadis", jp: 2, keterangan: "Membaca, memahami, dan mengamalkan ayat serta hadis pilihan." },
      { nama: "Akidah Akhlak", jp: 2, keterangan: "Keimanan dan pembentukan akhlak terpuji." },
      { nama: "Fikih", jp: 2, keterangan: "Tata cara ibadah dan muamalah sehari-hari, termasuk praktik manasik." },
      { nama: "Sejarah Kebudayaan Islam (SKI)", jp: 2, keterangan: "Sejarah Nabi, Khulafaur Rasyidin, dan peradaban Islam." },
      { nama: "Bahasa Arab", jp: 3, keterangan: "Keterampilan menyimak, berbicara, membaca, dan menulis." },
    ],
  },
  {
    judul: "Mata Pelajaran Umum",
    catatan: "Sesuai struktur Kurikulum Merdeka jenjang SMP/MTs.",
    mapel: [
      { nama: "Pendidikan Pancasila", jp: 3 },
      { nama: "Bahasa Indonesia", jp: 6 },
      { nama: "Matematika", jp: 5 },
      { nama: "Ilmu Pengetahuan Alam (IPA)", jp: 5 },
      { nama: "Ilmu Pengetahuan Sosial (IPS)", jp: 4 },
      { nama: "Bahasa Inggris", jp: 4 },
      { nama: "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)", jp: 3 },
      { nama: "Informatika", jp: 2 },
      { nama: "Seni Budaya", jp: 2 },
    ],
  },
  {
    judul: "Muatan Lokal & Program Madrasah",
    catatan: "Ditetapkan madrasah untuk memperkuat program unggulan.",
    mapel: [
      { nama: "Tahfiz Al-Qur'an", jp: 2, keterangan: "Setoran dan murajaah hafalan terjadwal." },
      { nama: "Bahasa Daerah", jp: 2 },
    ],
  },
];
