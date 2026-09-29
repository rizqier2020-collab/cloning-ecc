import { jadwalPpdb } from "@/content/ppdb";
import { formatRentang, formatTanggal } from "@/lib/date";

function Rentang({ mulai, selesai }: { readonly mulai: string; readonly selesai?: string }) {
  if (!selesai) return <time dateTime={mulai}>{formatTanggal(mulai)}</time>;
  const teks = formatRentang(mulai, selesai);
  const [awal, akhir] = teks.includes(" – ") ? teks.split(" – ") : [teks, ""];
  return akhir ? (
    <>
      <time dateTime={mulai}>{awal}</time> – <time dateTime={selesai}>{akhir}</time>
    </>
  ) : (
    <time dateTime={`${mulai}/${selesai}`}>{teks}</time>
  );
}

/** Tiga langkah PPDB bertanggal dengan garis hitam di atas. */
export function PpdbSteps({ tampilKeterangan = false, headingLevel = "h3" }: { readonly tampilKeterangan?: boolean; readonly headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ol className="steps">
      {jadwalPpdb.map((langkah, i) => (
        <li className="step" key={langkah.judul}>
          <span className="step__num" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <Heading className="h3">{langkah.judul}</Heading>
            <p className="meta">
              <Rentang mulai={langkah.mulai} selesai={langkah.selesai} />
            </p>
            {tampilKeterangan && langkah.keterangan ? <p className="note">{langkah.keterangan}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
