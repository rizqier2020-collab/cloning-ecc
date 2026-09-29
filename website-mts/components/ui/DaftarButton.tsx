import Link from "next/link";

interface DaftarButtonProps {
  readonly href: string;
  readonly eksternal: boolean;
}

/**
 * Tombol "Daftar online". Tautan eksternal (Linktree/Google Form) dibuka di tab baru
 * tanpa memberi akses window.opener; path internal memakai Link biasa.
 */
export function DaftarButton({ href, eksternal }: DaftarButtonProps) {
  if (eksternal) {
    return (
      <a className="btn btn--solid" href={href} target="_blank" rel="noopener noreferrer">
        Daftar online <span aria-hidden="true">↗</span>
        <span className="sr-only"> (membuka halaman pendaftaran di tab baru)</span>
      </a>
    );
  }
  return (
    <Link className="btn btn--solid" href={href}>
      Daftar online <span aria-hidden="true">→</span>
    </Link>
  );
}
