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
  /**
   * Tautan pendaftaran: Linktree/Google Form (https://…) atau path internal ("/…").
   * Hanya dipakai saat status "dibuka".
   */
  readonly pendaftaranUrl?: string;
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
    /** true bila tautan mengarah ke situs lain (dibuka di tab baru). */
    readonly eksternal: boolean;
  };
}

/**
 * Host yang boleh dipakai sebagai tautan pendaftaran eksternal (https saja).
 * Tambahkan host baru di sini bila madrasah memakai layanan lain (lihat README).
 */
export const PENDAFTARAN_HOST: readonly string[] = ["linktr.ee", "forms.gle", "docs.google.com", "s.id"];

/** Path internal "/…"; "//host" dan "/\host" (protocol-relative) bukan path internal. */
const PATH_INTERNAL = /^\/(?![/\\])/;

function parseUrl(href: string, base?: string): URL | null {
  try {
    return new URL(href, base);
  } catch {
    return null;
  }
}

/**
 * Tautan pendaftaran sah: path internal (yang juga tidak dianggap eksternal oleh
 * isEksternal), atau https ke host di PENDAFTARAN_HOST tanpa username/password.
 */
export function isTautanPendaftaranValid(href: string): boolean {
  if (PATH_INTERNAL.test(href)) return !isEksternal(href);
  const url = parseUrl(href);
  return (
    url !== null &&
    url.protocol === "https:" &&
    url.username === "" &&
    url.password === "" &&
    PENDAFTARAN_HOST.includes(url.hostname)
  );
}

/** Status efektif: "dibuka" yang sudah lewat tanggal selesai dianggap "ditutup". */
function statusEfektif(ppdb: PpdbConfig, hariIni: string): PpdbStatus {
  if (ppdb.status === "dibuka" && hariIni > ppdb.pendaftaran.selesai) return "ditutup";
  return ppdb.status;
}

interface Konteks {
  readonly ppdb: PpdbConfig;
  readonly judul: string;
  readonly periode: string;
  readonly periodePendek: string;
}

function infoDibuka({ ppdb, judul, periode, periodePendek }: Konteks): PpdbInfo {
  const href = ppdb.pendaftaranUrl;
  const bisaDaftar = Boolean(href);
  return {
    judul,
    statusLabel: "Dibuka",
    periode,
    bar: { bagian: [`${judul} dibuka`, periodePendek], cta: "Daftar" },
    formulir: {
      judul: `Formulir pendaftaran online dibuka sampai ${formatTanggal(ppdb.pendaftaran.selesai, "panjang")}`,
      teks: bisaDaftar
        ? "Tombol di bawah membuka halaman pendaftaran berisi Google Form. Isi dari HP atau komputer, dan siapkan foto Kartu Keluarga, akta kelahiran, ijazah/SKL, dan pas foto."
        : "Formulir online segera tersedia di halaman ini. Sementara itu, hubungi panitia lewat WhatsApp untuk informasi pendaftaran.",
      bisaDaftar,
      href,
      eksternal: isEksternal(href),
    },
  };
}

function infoDitutup({ ppdb, judul, periode }: Konteks): PpdbInfo {
  return {
    judul,
    statusLabel: "Ditutup",
    periode,
    bar: {
      bagian: [
        `${judul} ditutup`,
        ppdb.pengumumanHasil ? `Pengumuman hasil ${formatTanggal(ppdb.pengumumanHasil)}` : "Terima kasih atas minat Anda",
      ],
      cta: "Lihat info",
    },
    formulir: {
      judul: "Pendaftaran online sudah ditutup",
      teks: "Hasil seleksi diumumkan di halaman Pengumuman. Informasi PPDB tahun berikutnya akan disampaikan di website ini.",
      bisaDaftar: false,
      eksternal: false,
    },
  };
}

function infoBelumDibuka({ ppdb, judul, periode, periodePendek }: Konteks): PpdbInfo {
  return {
    judul,
    statusLabel: "Segera dibuka",
    periode,
    bar: { bagian: [`${judul} segera dibuka`, periodePendek], cta: "Info" },
    formulir: {
      judul: `Formulir pendaftaran online dibuka ${formatTanggal(ppdb.pendaftaran.mulai, "panjang")}`,
      teks: `Pendaftaran berlangsung ${periode}. Pelajari syarat dan jadwal di bawah ini, lalu siapkan berkasnya lebih awal.`,
      bisaDaftar: false,
      eksternal: false,
    },
  };
}

const INFO_PER_STATUS: Record<PpdbStatus, (k: Konteks) => PpdbInfo> = {
  dibuka: infoDibuka,
  ditutup: infoDitutup,
  "belum-dibuka": infoBelumDibuka,
};

/**
 * Terjemahkan konfigurasi PPDB menjadi teks tampilan sesuai status.
 * `hariIni` (ISO, lihat hariIniIso) mencegah tombol Daftar basi setelah periode berakhir;
 * status "belum-dibuka" tetap diubah manual.
 */
export function getPpdbInfo(ppdb: PpdbConfig, hariIni: string): PpdbInfo {
  const { mulai, selesai } = ppdb.pendaftaran;
  return INFO_PER_STATUS[statusEfektif(ppdb, hariIni)]({
    ppdb,
    judul: `PPDB ${ppdb.tahunAjaran}`,
    periode: formatRentang(mulai, selesai, "panjang"),
    periodePendek: formatRentang(mulai, selesai),
  });
}

const ASAL_INTERNAL = "https://internal.invalid";

/**
 * Tautan ke situs lain dibuka di tab baru. Diurai dengan URL terhadap asal tiruan:
 * hanya yang tetap di asal yang sama ("/…") dianggap internal, sehingga "//host"
 * selalu eksternal (konsisten dengan validasi skema).
 */
export function isEksternal(href: string | undefined): boolean {
  if (!href) return false;
  const url = parseUrl(href, ASAL_INTERNAL);
  return url === null || url.origin !== ASAL_INTERNAL;
}
