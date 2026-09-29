"use client";

import { useState } from "react";

/**
 * Peta Google hanya dimuat setelah pengunjung menekan tombol (hemat kuota data
 * dan tanpa pelacak pihak ketiga saat halaman dibuka). Tanpa JS blok ini
 * disembunyikan; tautan "Lihat di Google Maps" tetap tersedia.
 */
export function MapEmbed({ src, judul }: { readonly src: string; readonly judul: string }) {
  const [tampil, setTampil] = useState(false);
  if (tampil) {
    return (
      <iframe
        className="map-frame"
        src={src}
        title={judul}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }
  return (
    <div className="map-embed ph ratio-wide">
      <button className="btn btn--line" type="button" onClick={() => setTampil(true)}>
        Tampilkan peta di sini
      </button>
    </div>
  );
}
