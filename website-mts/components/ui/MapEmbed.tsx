"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Peta Google hanya dimuat setelah pengunjung menekan tombol (hemat kuota data
 * dan tanpa pelacak pihak ketiga saat halaman dibuka). Tanpa JS blok ini
 * disembunyikan; tautan "Lihat di Google Maps" tetap tersedia.
 *
 * iframe di-sandbox (skrip peta + popup "Buka di Maps" saja) dan src dibatasi ke
 * www.google.com/maps oleh skema konfigurasi dan CSP frame-src. Setelah tombol
 * ditekan, fokus dipindah ke iframe agar fokus keyboard tidak hilang bersama tombol.
 */
export function MapEmbed({ src, judul }: { readonly src: string; readonly judul: string }) {
  const [tampil, setTampil] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (tampil) frameRef.current?.focus();
  }, [tampil]);

  if (tampil) {
    return (
      <iframe
        ref={frameRef}
        className="map-frame"
        src={src}
        title={judul}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
        referrerPolicy="strict-origin-when-cross-origin"
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
