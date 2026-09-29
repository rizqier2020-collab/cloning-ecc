"use client";

import { useEffect, useRef } from "react";

const DURASI_MS = 1400;
const AMBANG_TERLIHAT = 0.6;

/**
 * Angka yang naik dari 0 ke nilai akhir saat 60% terlihat (sekali saja).
 * HTML awal berisi nilai akhir (tanpa JS tetap benar). Angka animasi aria-hidden;
 * nilai akhir tersedia untuk pembaca layar lewat .sr-only. Animasi menulis langsung
 * ke textContent (seperti mockup) agar tidak memicu render ulang React tiap frame.
 */
export function CountUp({ nilai }: { readonly nilai: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || !("IntersectionObserver" in window)) return;

    let frame = 0;
    const jalankan = () => {
      let mulai: number | null = null;
      const tick = (t: number) => {
        mulai ??= t;
        const p = Math.min((t - mulai) / DURASI_MS, 1);
        el.textContent = String(Math.round(nilai * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          jalankan();
        }
      },
      { threshold: AMBANG_TERLIHAT },
    );
    el.textContent = "0";
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = String(nilai);
    };
  }, [nilai]);

  return (
    <>
      <span ref={ref} aria-hidden="true" data-count={nilai}>
        {nilai}
      </span>
      <span className="sr-only">{nilai}</span>
    </>
  );
}
