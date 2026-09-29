/**
 * Isi halaman /ppdb. Status & periode pendaftaran ada di content/site.ts (ppdb).
 * SEMUA DATA ADALAH CONTOH — jalur, biaya, dan tanggal wajib dikonfirmasi panitia.
 */

export interface LangkahJadwal {
  readonly judul: string;
  readonly mulai: string;
  readonly selesai?: string;
  readonly keterangan?: string;
}

export const jadwalPpdb: readonly LangkahJadwal[] = [
  { judul: "Pendaftaran online", mulai: "2027-01-11", selesai: "2027-03-13", keterangan: "Isi formulir dan unggah berkas." },
  { judul: "Tes baca Al-Qur'an & wawancara", mulai: "2027-03-20", keterangan: "Di madrasah, 07.30–12.00 WIB." },
  { judul: "Pengumuman & daftar ulang", mulai: "2027-04-03", selesai: "2027-04-10", keterangan: "Hasil diumumkan di halaman Pengumuman." },
];

export const syaratPpdb: readonly string[] = [
  "Lulus atau akan lulus SD/MI tahun 2027, usia maksimal 15 tahun pada 1 Juli 2027.",
  "Scan/foto Kartu Keluarga.",
  "Scan/foto akta kelahiran.",
  "Scan/foto ijazah atau Surat Keterangan Lulus (SKL); bila belum ada, rapor kelas 6 semester 1.",
  "Pas foto terbaru berlatar merah ukuran 3×4.",
  "Nomor Induk Siswa Nasional (NISN).",
];

export const jalurPpdb: readonly { readonly nama: string; readonly keterangan: string }[] = [
  { nama: "Reguler", keterangan: "Seleksi melalui tes baca Al-Qur'an dan wawancara." },
  { nama: "Prestasi", keterangan: "Untuk peraih juara akademik, keagamaan, atau olahraga minimal tingkat kecamatan." },
  { nama: "Afirmasi", keterangan: "Untuk calon siswa dari keluarga pemegang KIP/PKH atau yatim/piatu." },
];

export const biayaPpdb: readonly { readonly komponen: string; readonly nilai: string; readonly catatan?: string }[] = [
  { komponen: "Pendaftaran", nilai: "Gratis" },
  { komponen: "Seragam (5 stel)", nilai: "Rp —", catatan: "Diumumkan saat daftar ulang" },
  { komponen: "Kegiatan & buku tahun pertama", nilai: "Rp —", catatan: "Diumumkan saat daftar ulang" },
  { komponen: "Infak bulanan", nilai: "Rp —", catatan: "Keringanan tersedia untuk jalur afirmasi" },
];

export const alurPpdb: readonly { readonly judul: string; readonly teks: string }[] = [
  { judul: "Isi formulir online", teks: "Data calon siswa, orang tua/wali, dan nomor WhatsApp aktif." },
  { judul: "Unggah berkas", teks: "Kartu Keluarga, akta kelahiran, ijazah/SKL, dan pas foto (PDF/JPG)." },
  { judul: "Simpan bukti pendaftaran", teks: "Nomor pendaftaran muncul otomatis dan bisa dicetak." },
  { judul: "Ikuti tes & wawancara", teks: "Datang sesuai jadwal dengan membawa bukti pendaftaran." },
  { judul: "Cek pengumuman & daftar ulang", teks: "Siswa diterima melakukan daftar ulang di madrasah." },
];

export const faqPpdb: readonly { readonly tanya: string; readonly jawab: string }[] = [
  { tanya: "Apakah pendaftaran dipungut biaya?", jawab: "Tidak. Pendaftaran PPDB gratis. Rincian biaya setelah diterima diumumkan saat daftar ulang." },
  { tanya: "Bagaimana jika tidak punya komputer?", jawab: "Formulir bisa diisi dari HP. Panitia juga membuka meja bantuan di madrasah pada jam layanan." },
  { tanya: "Apakah lulusan SD (bukan MI) boleh mendaftar?", jawab: "Boleh. Lulusan SD maupun MI dapat mendaftar di semua jalur." },
  { tanya: "Bagaimana data pribadi calon siswa dilindungi?", jawab: "Data hanya dipakai untuk keperluan PPDB, disimpan di penyimpanan privat, dan hanya dapat diakses panitia sesuai UU No. 27/2022 tentang Pelindungan Data Pribadi." },
  { tanya: "Kapan hasil seleksi diumumkan?", jawab: "Pada 3 April 2027 melalui halaman Pengumuman di website ini." },
];
