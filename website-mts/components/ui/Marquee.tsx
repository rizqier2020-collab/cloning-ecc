"use client";

import { type CSSProperties, type ReactNode, useState } from "react";

interface MarqueeProps {
  /** Isi yang digeser; dirender dua kali (salinan kedua aria-hidden). */
  readonly children: ReactNode;
  /** Versi utuh untuk pembaca layar (mis. <p> atau <ul> dengan kelas sr-only). */
  readonly srContent: ReactNode;
  readonly groupClassName?: string;
  readonly className?: string;
  readonly durasi?: string;
  readonly jarak?: string;
}

/**
 * Teks/strip berjalan. Berhenti saat hover/fokus (CSS) dan lewat tombol Jeda/Putar
 * (WCAG 2.2.2). Dengan reduced motion, CSS menghentikan animasi dan menyembunyikan
 * salinan kedua sehingga isi menjadi daftar statis.
 */
export function Marquee({
  children,
  srContent,
  groupClassName = "",
  className = "",
  durasi = "45s",
  jarak = "1.25rem",
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const style = { "--marquee-dur": durasi, "--marquee-gap": jarak } as CSSProperties;
  const group = ["marquee__group", groupClassName].filter(Boolean).join(" ");

  return (
    <div className={["marquee", className, paused ? "is-paused" : ""].filter(Boolean).join(" ")} style={style}>
      {srContent}
      <div className="marquee__track" aria-hidden="true">
        <div className={group}>{children}</div>
        <div className={group} aria-hidden="true">
          {children}
        </div>
      </div>
      <button
        className="marquee__toggle"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? "Putar" : "Jeda"}
      </button>
    </div>
  );
}
