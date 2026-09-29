"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

interface CarouselProps {
  readonly id: string;
  readonly judul: string;
  readonly children: ReactNode;
}

const TOLERANSI_PX = 2;
const LANGKAH = 0.8;

/**
 * Baris foto yang bisa di-swipe (scroll-snap asli) + tombol ‹ › yang menggeser 80%
 * lebar. Di ujung, tombol memakai aria-disabled (bukan disabled) agar fokus tidak hilang.
 * Tanpa JS tombol disembunyikan (CSS) dan scroll asli tetap berfungsi.
 */
export function Carousel({ id, judul, children }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [diAwal, setDiAwal] = useState(true);
  const [diAkhir, setDiAkhir] = useState(false);

  const perbarui = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth - TOLERANSI_PX;
    setDiAwal(track.scrollLeft <= TOLERANSI_PX);
    setDiAkhir(track.scrollLeft >= max);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    perbarui();
    track.addEventListener("scroll", perbarui, { passive: true });
    window.addEventListener("resize", perbarui);
    return () => {
      track.removeEventListener("scroll", perbarui);
      window.removeEventListener("resize", perbarui);
    };
  }, [perbarui]);

  const geser = (arah: -1 | 1) => {
    const track = trackRef.current;
    if (!track || (arah === -1 ? diAwal : diAkhir)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: arah * track.clientWidth * LANGKAH, behavior: reduce ? "auto" : "smooth" });
  };

  const trackId = `track-${id}`;
  const judulId = `row-${id}`;

  return (
    <div className="carousel" data-carousel>
      <div className="carousel__head">
        <h3 id={judulId} className="carousel__title">
          {judul}
        </h3>
        <div className="carousel__controls">
          <button
            className="round-btn"
            type="button"
            aria-controls={trackId}
            aria-label={`Geser ke kiri: ${judul}`}
            aria-disabled={diAwal}
            onClick={() => geser(-1)}
          >
            ‹
          </button>
          <button
            className="round-btn"
            type="button"
            aria-controls={trackId}
            aria-label={`Geser ke kanan: ${judul}`}
            aria-disabled={diAkhir}
            onClick={() => geser(1)}
          >
            ›
          </button>
        </div>
      </div>
      {/* tabIndex agar jalur bisa digeser dengan panah keyboard */}
      <ul ref={trackRef} className="carousel__track" id={trackId} tabIndex={0} aria-labelledby={judulId}>
        {children}
      </ul>
    </div>
  );
}
