"use client";

import { useEffect } from "react";

const AMBANG = 0.2;

/**
 * Mengaktifkan scroll reveal untuk elemen `.reveal` di halaman. Status tersembunyi
 * (`html.reveal-ready`) hanya dipasang bila IntersectionObserver ada dan pengguna
 * tidak memilih reduced motion, sehingga tanpa JS konten langsung terlihat.
 */
export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        }
      },
      { threshold: AMBANG },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
  return null;
}
