export interface NavItem {
  readonly label: string;
  readonly href: string;
  /** Subtautan yang hanya tampil di panel menu HP. */
  readonly sub?: readonly { readonly label: string; readonly href: string }[];
}

export const NAV_UTAMA: readonly NavItem[] = [
  { label: "Profil", href: "/profil", sub: [{ label: "Guru & Staf", href: "/profil/guru-staf" }] },
  { label: "Akademik", href: "/akademik" },
  {
    label: "Informasi",
    href: "/informasi",
    sub: [
      { label: "Berita", href: "/informasi/berita" },
      { label: "Agenda", href: "/informasi/agenda" },
    ],
  },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export const NAV_PPDB = { label: "Daftar PPDB", href: "/ppdb" } as const;

export const NAV_FOOTER: readonly { label: string; href: string }[] = [
  { label: "Profil", href: "/profil" },
  { label: "Guru & Staf", href: "/profil/guru-staf" },
  { label: "Akademik", href: "/akademik" },
  { label: "Informasi", href: "/informasi" },
  { label: "Galeri", href: "/galeri" },
  { label: "PPDB", href: "/ppdb" },
  { label: "Unduhan", href: "/informasi/unduhan" },
  { label: "Kontak", href: "/kontak" },
];

/** Buang query, hash, dan garis miring di akhir. "" → "/". */
export function normalisasiPath(path: string): string {
  const tanpaQuery = path.split(/[?#]/)[0] ?? "";
  const tanpaSlash = tanpaQuery.replace(/\/+$/, "");
  return tanpaSlash === "" ? "/" : tanpaSlash;
}

/**
 * Nilai aria-current untuk tautan menu: "page" untuk halaman persis,
 * "true" untuk induk bagian (mis. PROFIL saat di /profil/guru-staf).
 */
export function getAriaCurrent(
  href: string,
  pathname: string | null | undefined,
): "page" | "true" | undefined {
  if (pathname == null) return undefined;
  const target = normalisasiPath(href);
  const current = normalisasiPath(pathname);
  if (current === target) return "page";
  if (target !== "/" && current.startsWith(`${target}/`)) return "true";
  return undefined;
}
