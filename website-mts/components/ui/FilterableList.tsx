"use client";

import { type ReactNode, useState } from "react";

export interface FilterOption {
  readonly value: string;
  readonly label: string;
}

export interface FilterItem {
  readonly key: string;
  readonly kategori: string;
  readonly node: ReactNode;
}

interface FilterableListProps {
  readonly options: readonly FilterOption[];
  readonly items: readonly FilterItem[];
  /** Kata benda untuk status jumlah, mis. "kegiatan" → "9 kegiatan". */
  readonly satuan: string;
  readonly ariaLabel: string;
  readonly listClassName: string;
  readonly itemClassName: string;
}

const SEMUA = "semua";

/**
 * Tombol saring kategori (aria-pressed) + daftar. Item yang tidak cocok diberi
 * atribut `hidden`; jumlah diumumkan lewat role="status". Tanpa JS bar filter
 * disembunyikan oleh CSS dan semua item tampil.
 */
export function FilterableList({
  options,
  items,
  satuan,
  ariaLabel,
  listClassName,
  itemClassName,
}: FilterableListProps) {
  const [aktif, setAktif] = useState(SEMUA);
  const cocok = (kategori: string) => aktif === SEMUA || kategori === aktif;
  const jumlah = items.filter((i) => cocok(i.kategori)).length;

  return (
    <>
      <div className="filter-bar">
        <ul className="filter" aria-label={ariaLabel}>
          {[{ value: SEMUA, label: "Semua" }, ...options].map((opt) => (
            <li key={opt.value}>
              <button
                className="filter__btn"
                type="button"
                data-filter={opt.value}
                aria-pressed={aktif === opt.value}
                onClick={() => setAktif(opt.value)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
        <p className="filter-status label label--muted" role="status" aria-live="polite">
          {jumlah} {satuan}
        </p>
      </div>
      <ul className={listClassName}>
        {items.map((item) => (
          <li key={item.key} className={itemClassName} data-kategori={item.kategori} hidden={!cocok(item.kategori)}>
            {item.node}
          </li>
        ))}
      </ul>
    </>
  );
}
