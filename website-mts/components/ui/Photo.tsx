import Image from "next/image";
import type { Rasio } from "@/lib/content/schemas";

export type NadaFoto = "default" | "bw" | "color";

interface PhotoProps {
  /** Path foto asli di public/images. Kosong → placeholder bergaris. */
  readonly src?: string;
  /** Teks alternatif (wajib, dari frontmatter `alt`). */
  readonly alt: string;
  /** Label kecil di tengah placeholder, mis. "[ foto berita ]". */
  readonly label?: string;
  readonly tone?: NadaFoto;
  readonly ratio?: Rasio;
  readonly sizes?: string;
  readonly priority?: boolean;
  readonly className?: string;
}

const TONE_CLASS: Record<NadaFoto, string> = { default: "", bw: "ph--bw", color: "ph--color" };

/**
 * Foto atau placeholder bergaris diagonal (kelas `.ph` dari wireframe).
 * Begitu `src` diisi, komponen yang sama merender next/image di bingkai rasio
 * yang sama, jadi efek zoom/monokrom tetap berlaku tanpa mengubah halaman.
 */
export function Photo({
  src,
  alt,
  label = "[ foto ]",
  tone = "default",
  ratio = "square",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className = "",
}: PhotoProps) {
  const classes = ["ph", TONE_CLASS[tone], `ratio-${ratio}`, className].filter(Boolean);
  if (src) {
    return (
      <div className={[...classes, "ph--photo"].join(" ")}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
    );
  }
  return (
    <div className={classes.join(" ")} role="img" aria-label={`${alt} (placeholder)`}>
      {label}
    </div>
  );
}
