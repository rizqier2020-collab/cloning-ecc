import { formatRentang, formatTanggal } from "./date";

export const PPDB_STATUS = ["belum-dibuka", "dibuka", "ditutup"] as const;
export type PpdbStatus = (typeof PPDB_STATUS)[number];

export interface PpdbConfig {
  readonly tahunAjaran: string;
  readonly status: PpdbStatus;
  readonly pendaftaran: { readonly mulai: string; readonly selesai: string };
  readonly pengumumanHasil?: string;
  readonly kuota: number;
  readonly rombel: number;
  /** Diisi di Tahap 3 saat formulir online sudah ada, mis. "/ppdb/daftar". */
  readonly formulirUrl?: string;
}

export interface PpdbInfo {
  readonly judul: string;
  readonly statusLabel: string;
  readonly periode: string;
  /** Isi bar pengumuman di bawah hero beranda. */
  readonly bar: { readonly bagian: readonly string[]; readonly cta: string };
  /** Blok status formulir di halaman PPDB. */
  readonly formulir: {
    readonly judul: string;
    readonly teks: string;
    readonly bisaDaftar: boolean;
    readonly href?: string;
  };
}

/** Terjemahkan konfigurasi PPDB menjadi teks tampilan sesuai status. */
export function getPpdbInfo(ppdb: PpdbConfig): PpdbInfo {
  const judul = `PPDB ${ppdb.tahunAjaran}`;
  const { mulai, selesai } = ppdb.pendaftaran;
  const periodePendek = formatRentang(mulai, selesai);
  const periode = formatRentang(mulai, selesai, "panjang");

  if (ppdb.status === "dibuka") {
    const bisaDaftar = Boolean(ppdb.formulirUrl);
    return {
      judul,
      statusLabel: "Dibuka",
      periode,
      bar: { bagian: [`${judul} dibuka`, periodePendek], cta: "Daftar" },
      formulir: {
        judul: `Formulir pendaftaran online dibuka sampai ${formatTanggal(selesai, "panjang")}`,
        teks: bisaDaftar
          ? "Isi formulir dari HP atau komputer. Siapkan scan Kartu Keluarga, akta kelahiran, ijazah/SKL, dan pas foto."
          : "Formulir online segera tersedia di halaman ini. Sementara itu, hubungi panitia lewat WhatsApp untuk informasi pendaftaran.",
        bisaDaftar,
        href: bisaDaftar ? ppdb.formulirUrl : undefined,
      },
    };
  }

  if (ppdb.status === "ditutup") {
    return {
      judul,
      statusLabel: "Ditutup",
      periode,
      bar: {
        bagian: [
          `${judul} ditutup`,
          ppdb.pengumumanHasil
            ? `Pengumuman hasil ${formatTanggal(ppdb.pengumumanHasil)}`
            : "Terima kasih atas minat Anda",
        ],
        cta: "Lihat info",
      },
      formulir: {
        judul: "Pendaftaran online sudah ditutup",
        teks: "Hasil seleksi diumumkan di halaman Pengumuman. Informasi PPDB tahun berikutnya akan disampaikan di website ini.",
        bisaDaftar: false,
      },
    };
  }

  return {
    judul,
    statusLabel: "Segera dibuka",
    periode,
    bar: { bagian: [`${judul} segera dibuka`, periodePendek], cta: "Info" },
    formulir: {
      judul: `Formulir pendaftaran online dibuka ${formatTanggal(mulai, "panjang")}`,
      teks: `Pendaftaran berlangsung ${periode}. Pelajari syarat dan jadwal di bawah ini, lalu siapkan berkasnya lebih awal.`,
      bisaDaftar: false,
    },
  };
}
