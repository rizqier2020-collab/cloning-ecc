import { compareIso } from "./date";

/** Urutkan terbaru dulu. Tidak mengubah array asli. */
export function sortByDateDesc<T>(items: readonly T[], getDate: (item: T) => string): T[] {
  return [...items].sort((a, b) => compareIso(getDate(b), getDate(a)));
}

/** Urutkan terlama dulu. Tidak mengubah array asli. */
export function sortByDateAsc<T>(items: readonly T[], getDate: (item: T) => string): T[] {
  return [...items].sort((a, b) => compareIso(getDate(a), getDate(b)));
}

export const SEMUA = "semua";

function kunci(kategori: string): string {
  return kategori.trim().toLowerCase();
}

/** Saring berdasarkan kategori; "semua" mengembalikan seluruh item. */
export function filterByKategori<T>(
  items: readonly T[],
  kategori: string,
  getKategori: (item: T) => string,
): T[] {
  const target = kunci(kategori);
  if (target === SEMUA) return [...items];
  return items.filter((item) => kunci(getKategori(item)) === target);
}

/** Hitung item per kategori (kunci huruf kecil) plus total di "semua". */
export function countByKategori<T>(
  items: readonly T[],
  getKategori: (item: T) => string,
): Record<string, number> {
  return items.reduce<Record<string, number>>(
    (acc, item) => {
      const k = kunci(getKategori(item));
      return { ...acc, [k]: (acc[k] ?? 0) + 1 };
    },
    { [SEMUA]: items.length },
  );
}

interface AgendaLike {
  readonly mulai: string;
  readonly selesai?: string;
}

/**
 * Pisahkan agenda menjadi yang akan datang/sedang berjalan (terdekat dulu) dan yang
 * sudah selesai (terbaru dulu), relatif terhadap `hariIni` (ISO).
 */
export function pisahAgenda<T extends AgendaLike>(
  items: readonly T[],
  hariIni: string,
): { akanDatang: T[]; selesai: T[] } {
  const berakhir = (item: T) => item.selesai ?? item.mulai;
  const akanDatang = items.filter((item) => compareIso(berakhir(item), hariIni) >= 0);
  const selesai = items.filter((item) => compareIso(berakhir(item), hariIni) < 0);
  return {
    akanDatang: sortByDateAsc(akanDatang, (i) => i.mulai),
    selesai: sortByDateDesc(selesai, (i) => i.mulai),
  };
}

/**
 * pisahAgenda untuk entri konten (tanggal di `data`). Mengembalikan entri aslinya,
 * dipakai beranda dan halaman Agenda.
 */
export function pisahAgendaEntri<T extends { readonly data: AgendaLike }>(
  items: readonly T[],
  hariIni: string,
): { akanDatang: T[]; selesai: T[] } {
  const bungkus = items.map((entri) => ({ entri, mulai: entri.data.mulai, selesai: entri.data.selesai }));
  const hasil = pisahAgenda(bungkus, hariIni);
  return {
    akanDatang: hasil.akanDatang.map((b) => b.entri),
    selesai: hasil.selesai.map((b) => b.entri),
  };
}
