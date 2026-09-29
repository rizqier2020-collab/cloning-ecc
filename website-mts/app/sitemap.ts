import type { MetadataRoute } from "next";
import { getAlbums, getBerita } from "@/lib/content/repository";
import { RUTE_STATIS } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo";


export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    ...RUTE_STATIS.map((path) => ({ url: `${base}${path === "/" ? "" : path}` })),
    ...getBerita().map((b) => ({ url: `${base}/informasi/berita/${b.slug}`, lastModified: b.data.tanggal })),
    ...getAlbums().map((a) => ({ url: `${base}/galeri/${a.slug}`, lastModified: a.data.tanggal })),
  ];
}
