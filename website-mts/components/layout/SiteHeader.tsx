"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getAriaCurrent, NAV_PPDB, NAV_UTAMA } from "@/lib/nav";

const MENU_ID = "menu-utama";

/**
 * Header situs. Di beranda memakai varian overlay transparan di atas hero.
 * Menu HP: aria-expanded/aria-controls, Esc menutup dan mengembalikan fokus,
 * mengetuk tautan menutup panel. Tanpa JS, CSS menampilkan menu sebagai daftar.
 */
export function SiteHeader({ wordmark }: { readonly wordmark: string }) {
  const pathname = usePathname();
  /**
   * Path tempat menu dibuka. Menu hanya terbuka selama path tidak berubah, jadi
   * navigasi (termasuk tombol Kembali) otomatis menutup panel tanpa efek tambahan.
   */
  const [dibukaDi, setDibukaDi] = useState<string | null>(null);
  const open = dibukaDi === pathname;
  const setOpen = (buka: boolean) => setDibukaDi(buka ? pathname : null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDibukaDi(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const tutup = () => setOpen(false);

  return (
    <header className={`site-header${isHome ? " site-header--overlay" : ""}`}>
      <div className="container site-header__bar">
        <Link className="wordmark" href="/" aria-current={isHome ? "page" : undefined} onClick={tutup}>
          {wordmark}
        </Link>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen(!open)}
        >
          <span className="menu-toggle__bars" aria-hidden="true" />
          <span className="sr-only">Menu</span>
        </button>
        <nav className={`site-nav${open ? " is-open" : ""}`} id={MENU_ID} aria-label="Menu utama">
          <ul className="nav__list">
            {NAV_UTAMA.flatMap((item) => [
              <li key={item.href}>
                <Link
                  className="nav__link"
                  href={item.href}
                  aria-current={getAriaCurrent(item.href, pathname)}
                  onClick={tutup}
                >
                  {item.label}
                </Link>
              </li>,
              ...(item.sub ?? []).map((sub) => (
                <li key={sub.href} className="nav__item--sub">
                  <Link
                    className="nav__link nav__sub"
                    href={sub.href}
                    aria-current={getAriaCurrent(sub.href, pathname)}
                    onClick={tutup}
                  >
                    {sub.label}
                  </Link>
                </li>
              )),
            ])}
            <li>
              <Link
                className="nav__cta"
                href={NAV_PPDB.href}
                aria-current={getAriaCurrent(NAV_PPDB.href, pathname)}
                onClick={tutup}
              >
                {NAV_PPDB.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
