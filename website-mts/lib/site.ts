import { siteConfig } from "@/content/site";
import { siteConfigSchema, type SiteConfig } from "./content/schemas";

/** Validasi konfigurasi situs; konfigurasi rusak menggagalkan build dengan pesan jelas. */
export function parseSiteConfig(input: unknown): SiteConfig {
  const result = siteConfigSchema.safeParse(input);
  if (!result.success) {
    const detail = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Konfigurasi situs tidak valid di content/site.ts:\n${detail}`);
  }
  return result.data;
}

/** Identitas, kontak, statistik, dan status PPDB yang sudah divalidasi. */
export const site: SiteConfig = parseSiteConfig(siteConfig);
