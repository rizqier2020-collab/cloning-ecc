/**
 * Utilitas tanggal berformat Indonesia (id-ID).
 *
 * Semua tanggal konten disimpan sebagai string ISO "YYYY-MM-DD" (tanpa jam) sehingga
 * aman dikirim ke Client Component dan tidak bergeser karena zona waktu server.
 * Nama bulan ditulis sendiri agar hasilnya sama di Node, browser, dan CI.
 */

const BULAN_PANJANG = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
] as const;

const BULAN_PENDEK = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
] as const;

const ISO_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export type GayaTanggal = "pendek" | "panjang" | "titik" | "bulan-tahun";

interface BagianTanggal {
  readonly tahun: number;
  readonly bulan: number; // 1–12
  readonly hari: number;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function bagianValid(tahun: number, bulan: number, hari: number): boolean {
  if (bulan < 1 || bulan > 12 || hari < 1) return false;
  const hariTerakhir = new Date(Date.UTC(tahun, bulan, 0)).getUTCDate();
  return hari <= hariTerakhir;
}

/** Ubah nilai frontmatter (string ISO atau Date dari YAML) menjadi "YYYY-MM-DD", atau null. */
export function toIsoDate(value: unknown): string | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return `${value.getUTCFullYear()}-${pad2(value.getUTCMonth() + 1)}-${pad2(value.getUTCDate())}`;
  }
  if (typeof value !== "string") return null;
  const match = ISO_PATTERN.exec(value.trim());
  if (!match) return null;
  const [, y, m, d] = match;
  return bagianValid(Number(y), Number(m), Number(d)) ? value.trim() : null;
}

function pecah(iso: string): BagianTanggal {
  const valid = toIsoDate(iso);
  if (!valid) throw new Error(`Tanggal tidak valid: "${iso}" (format yang benar: YYYY-MM-DD)`);
  const [tahun, bulan, hari] = valid.split("-").map(Number);
  return { tahun, bulan, hari };
}

/** Format satu tanggal. Contoh gaya "pendek": "20 Sep 2026". */
export function formatTanggal(iso: string, gaya: GayaTanggal = "pendek"): string {
  const { tahun, bulan, hari } = pecah(iso);
  switch (gaya) {
    case "panjang":
      return `${hari} ${BULAN_PANJANG[bulan - 1]} ${tahun}`;
    case "titik":
      return `${pad2(hari)}.${pad2(bulan)}.${tahun}`;
    case "bulan-tahun":
      return `${BULAN_PENDEK[bulan - 1]} ${tahun}`;
    default:
      return `${hari} ${BULAN_PENDEK[bulan - 1]} ${tahun}`;
  }
}

/**
 * Format rentang tanggal secara ringkas:
 * "12–17 Okt 2026", "11 Jan – 13 Mar 2027", "28 Des 2026 – 2 Jan 2027".
 */
export function formatRentang(
  mulai: string,
  selesai?: string,
  gaya: "pendek" | "panjang" = "pendek",
): string {
  if (!selesai || selesai === mulai) return formatTanggal(mulai, gaya);
  const a = pecah(mulai);
  const b = pecah(selesai);
  const namaBulan = gaya === "panjang" ? BULAN_PANJANG : BULAN_PENDEK;
  if (a.tahun === b.tahun && a.bulan === b.bulan) {
    return `${a.hari}–${b.hari} ${namaBulan[b.bulan - 1]} ${b.tahun}`;
  }
  if (a.tahun === b.tahun) {
    return `${a.hari} ${namaBulan[a.bulan - 1]} – ${b.hari} ${namaBulan[b.bulan - 1]} ${b.tahun}`;
  }
  return `${formatTanggal(mulai, gaya)} – ${formatTanggal(selesai, gaya)}`;
}

/** Tanggal untuk baris agenda: hari 2 digit + label bulan-tahun. */
export function pecahTanggal(iso: string): { hari: string; bulan: string } {
  const { hari } = pecah(iso);
  return { hari: pad2(hari), bulan: formatTanggal(iso, "bulan-tahun") };
}

/** Pembanding untuk Array.prototype.sort (naik). */
export function compareIso(a: string, b: string): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

/** Tanggal hari ini (zona Asia/Jakarta) sebagai ISO, untuk memisahkan agenda saat build. */
export function hariIniIso(now: Date = new Date()): string {
  const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
  const wib = new Date(now.getTime() + WIB_OFFSET_MS);
  return `${wib.getUTCFullYear()}-${pad2(wib.getUTCMonth() + 1)}-${pad2(wib.getUTCDate())}`;
}
