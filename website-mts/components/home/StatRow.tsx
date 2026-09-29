import { CountUp } from "@/components/ui/CountUp";
import type { SiteConfig } from "@/lib/content/schemas";

/** <dl> angka statistik; angka numerik dianimasikan hitung naik. */
export function StatRow({ items }: { readonly items: SiteConfig["statistik"] }) {
  return (
    <dl className="stats">
      {items.map((s) => (
        <div className="stat" key={s.label}>
          <dt>{s.label}</dt>
          <dd>{typeof s.nilai === "number" ? <CountUp nilai={s.nilai} /> : s.nilai}</dd>
        </div>
      ))}
    </dl>
  );
}
