import type { Metadata } from "next";

export const SITE_URL_DEFAULT = "https://mts-contoh-alhikmah.vercel.app";

/** Baca URL situs dari env (NEXT_PUBLIC_SITE_URL). URL rusak menggagalkan build. */
export function getSiteUrl(raw: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): string {
  const value = raw?.trim();
  if (!value) return SITE_URL_DEFAULT;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL tidak valid: "${value}"`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`NEXT_PUBLIC_SITE_URL harus diawali http(s)://, bukan "${value}"`);
  }
  return url.toString().replace(/\/+$/, "");
}

interface MetadataInput {
  readonly judul: string;
  readonly deskripsi: string;
  readonly path: string;
  readonly jenis?: "website" | "article";
  readonly terbit?: string;
}

/** Metadata per halaman: judul (dipakai template di layout), deskripsi, canonical, OG. */
export function buatMetadata({ judul, deskripsi, path, jenis = "website", terbit }: MetadataInput): Metadata {
  const base = { title: judul, description: deskripsi, url: path };
  return {
    title: judul,
    description: deskripsi,
    alternates: { canonical: path },
    openGraph:
      jenis === "article"
        ? { ...base, type: "article", publishedTime: terbit }
        : { ...base, type: "website" },
  };
}
