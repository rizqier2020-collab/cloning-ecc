import type { Agenda } from "@/lib/content/repository";
import { formatRentang, pecahTanggal } from "@/lib/date";

function metaAgenda(a: Agenda): string {
  const bagian = [
    a.data.selesai ? formatRentang(a.data.mulai, a.data.selesai).replace(/ \d{4}$/, "") : null,
    a.data.waktu,
    a.data.tempat,
  ];
  return bagian.filter(Boolean).join(" · ");
}

/** Baris agenda: tanggal besar + bulan, judul, waktu/tempat miring. */
export function AgendaRows({ items, headingLevel = "h3" }: { readonly items: readonly Agenda[]; readonly headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="agenda">
      {items.map((a) => {
        const { hari, bulan } = pecahTanggal(a.data.mulai);
        return (
          <li key={a.slug} className="agenda__row" id={a.slug}>
            <p className="agenda__date">
              <time dateTime={a.data.mulai}>
                <span className="agenda__day">{hari}</span>
                <span className="label label--accent">{bulan}</span>
              </time>
            </p>
            <Heading className="h3 agenda__title">{a.data.judul}</Heading>
            <p className="meta agenda__meta">{metaAgenda(a)}</p>
          </li>
        );
      })}
    </ul>
  );
}
