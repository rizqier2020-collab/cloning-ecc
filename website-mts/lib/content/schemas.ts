import { z } from "zod";
import { toIsoDate } from "../date";
import { PPDB_STATUS } from "../ppdb";

// Pesan galat zod dalam Bahasa Indonesia.
z.config(z.locales.id());

/** Tanggal "YYYY-MM-DD" (string atau Date dari YAML) → string ISO. */
export const isoDate = z.unknown().transform((value, ctx) => {
  const iso = toIsoDate(value);
  if (iso === null) {
    ctx.addIssue({
      code: "custom",
      message: `tanggal tidak valid (${JSON.stringify(value)}); gunakan format YYYY-MM-DD`,
    });
    return z.NEVER;
  }
  return iso;
});

const teks = z.string().trim().min(1, "wajib diisi");
const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug hanya huruf kecil, angka, dan tanda hubung");

/** Foto: path lokal di folder public/images, mis. "/images/galeri/wisuda.webp". */
const pathGambar = z
  .string()
  .regex(
    /^\/images\/[a-z0-9][a-z0-9/_-]*\.(?:webp|avif|jpe?g|png)$/,
    'path gambar harus di folder public/images, mis. "/images/berita/nama-foto.webp"',
  )
  .refine((v) => !v.includes(".."), { message: 'path gambar tidak boleh berisi ".."' });

export const RASIO = ["tall", "portrait", "square", "wide"] as const;
export type Rasio = (typeof RASIO)[number];

export const KATEGORI_BERITA = ["Berita", "Kegiatan", "Prestasi"] as const;
export const beritaSchema = z.object({
  judul: teks,
  tanggal: isoDate,
  kategori: z.enum(KATEGORI_BERITA),
  ringkasan: teks,
  sampul: pathGambar.optional(),
  alt: teks,
  slug: slug.optional(),
});

export const KATEGORI_PENGUMUMAN = ["Umum", "Akademik", "Keuangan", "PPDB"] as const;
export const pengumumanSchema = z.object({
  judul: teks,
  tanggal: isoDate,
  kategori: z.enum(KATEGORI_PENGUMUMAN),
  penting: z.boolean().default(false),
  slug: slug.optional(),
});

export const KATEGORI_AGENDA = ["Akademik", "Ujian", "Libur", "Kegiatan"] as const;
export const agendaSchema = z
  .object({
    judul: teks,
    mulai: isoDate,
    selesai: isoDate.optional(),
    waktu: teks.optional(),
    tempat: teks.optional(),
    kategori: z.enum(KATEGORI_AGENDA).default("Kegiatan"),
    slug: slug.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.selesai && data.selesai < data.mulai) {
      ctx.addIssue({
        code: "custom",
        path: ["selesai"],
        message: "tanggal selesai tidak boleh sebelum tanggal mulai",
      });
    }
  });

export const TINGKAT_PRESTASI = [
  "Kecamatan",
  "Kabupaten/Kota",
  "Provinsi",
  "Nasional",
  "Internasional",
] as const;
export const prestasiSchema = z.object({
  judul: teks,
  tanggal: isoDate,
  tingkat: z.enum(TINGKAT_PRESTASI),
  peraih: teks,
  penyelenggara: teks.optional(),
  berita: slug.optional(),
  slug: slug.optional(),
});

export const KATEGORI_GALERI = ["akademik", "keagamaan", "ekstrakurikuler", "prestasi"] as const;
export type KategoriGaleri = (typeof KATEGORI_GALERI)[number];
export const galeriSchema = z.object({
  judul: teks,
  kategori: z.enum(KATEGORI_GALERI),
  tempat: teks,
  tanggal: isoDate,
  sampul: pathGambar.optional(),
  alt: teks,
  rasio: z.enum(RASIO).default("square"),
  foto: z
    .array(
      z.object({
        src: pathGambar.optional(),
        alt: teks,
        keterangan: teks.optional(),
        rasio: z.enum(RASIO).optional(),
      }),
    )
    .min(1, "album minimal berisi 1 foto"),
  slug: slug.optional(),
});

export const KELOMPOK_GURU = ["pimpinan", "umum", "pai", "tendik"] as const;
export type KelompokGuru = (typeof KELOMPOK_GURU)[number];
export const guruSchema = z.object({
  nama: teks,
  kelompok: z.enum(KELOMPOK_GURU),
  jabatan: teks,
  mulai_mengajar: z.number().int().min(1950).max(2100).optional(),
  foto: pathGambar.optional(),
  alt: teks,
  urutan: z.number().int().default(100),
  slug: slug.optional(),
});

export const programSchema = z.object({
  judul: teks,
  urutan: z.number().int().min(1),
  ringkasan: teks,
  slug: slug.optional(),
});

export const ekstrakurikulerSchema = z.object({
  nama: teks,
  urutan: z.number().int().min(1),
  jadwal: teks,
  pembina: teks,
  ringkasan: teks,
  slug: slug.optional(),
});

export const unduhanSchema = z.object({
  judul: teks,
  keterangan: teks,
  tanggal: isoDate,
  berkas: z
    .string()
    .regex(/^\/unduhan\/[a-z0-9][a-z0-9-]*\.pdf$/, 'berkas harus berupa "/unduhan/nama-berkas.pdf"')
    .optional(),
  ukuran: teks.optional(),
  slug: slug.optional(),
});

export const halamanSchema = z.object({
  judul: teks,
  deskripsi: teks,
});

/* ---------- Konfigurasi situs (content/site.ts) ---------- */

const statistikSchema = z.object({
  label: teks,
  nilai: z.union([z.number().int().nonnegative(), teks]),
});

export const siteConfigSchema = z.object({
  nama: teks,
  namaPendek: teks,
  jenjang: teks,
  kota: teks,
  deskripsi: teks,
  nsm: z.string().regex(/^\d{12}$/, "NSM harus 12 digit"),
  npsn: z.string().regex(/^\d{8}$/, "NPSN harus 8 digit"),
  tahunBerdiri: z.number().int().min(1900).max(2100),
  alamat: z.object({ jalan: teks, kota: teks, provinsi: teks, kodePos: teks }),
  kontak: z.object({
    whatsapp: z.object({ tampil: teks, tautan: z.url({ protocol: /^https$/ }) }),
    email: z.email(),
    telepon: teks.optional(),
    instagram: z.object({ tampil: teks, tautan: z.url({ protocol: /^https$/ }) }),
    youtube: z.object({ tampil: teks, tautan: z.url({ protocol: /^https$/ }) }),
    peta: z.object({ tautan: z.url({ protocol: /^https$/ }), embed: z.url({ protocol: /^https$/ }) }),
    jamLayanan: z.array(teks).min(1),
  }),
  statistik: z.array(statistikSchema).min(1).max(4),
  keunggulan: z.array(teks).min(1),
  ppdb: z
    .object({
      tahunAjaran: z.string().regex(/^\d{4}\/\d{4}$/, "format tahun ajaran: 2027/2028"),
      status: z.enum(PPDB_STATUS),
      pendaftaran: z.object({ mulai: isoDate, selesai: isoDate }),
      pengumumanHasil: isoDate.optional(),
      kuota: z.number().int().positive(),
      rombel: z.number().int().positive(),
      pendaftaranUrl: z
        .string()
        .refine(
          (url) => url.startsWith("/") || /^https:\/\/[^\s/]+\.[^\s]+$/.test(url),
          "tautan pendaftaran harus https://… (mis. Linktree/Google Form) atau path internal /…",
        )
        .optional(),
      brosur: z.string().startsWith("/unduhan/").optional(),
    })
    .superRefine((ppdb, ctx) => {
      if (ppdb.pendaftaran.selesai < ppdb.pendaftaran.mulai) {
        ctx.addIssue({
          code: "custom",
          path: ["pendaftaran", "selesai"],
          message: "akhir pendaftaran tidak boleh sebelum awal pendaftaran",
        });
      }
    }),
});

export type SiteConfigInput = z.input<typeof siteConfigSchema>;
export type SiteConfig = z.output<typeof siteConfigSchema>;
