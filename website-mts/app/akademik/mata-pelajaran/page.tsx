import { PageIntro } from "@/components/ui/PageIntro";
import { kelompokMapel } from "@/content/akademik";
import { buatMetadata } from "@/lib/seo";

export const metadata = buatMetadata({
  judul: "Mata Pelajaran",
  deskripsi:
    "Mata pelajaran umum dan Pendidikan Agama Islam: Al-Qur'an Hadis, Akidah Akhlak, Fikih, SKI, dan Bahasa Arab, beserta alokasi jam per minggu.",
  path: "/akademik/mata-pelajaran",
});

export default function MataPelajaranPage() {
  return (
    <>
      <PageIntro
        id="mapel-judul"
        judul="Mata Pelajaran"
        remah={[{ label: "Akademik", href: "/akademik" }, { label: "Mata Pelajaran" }]}
        lead="Alokasi jam pelajaran (JP) per minggu. Satu JP = 40 menit."
      />
      {kelompokMapel.map((kelompok, i) => {
        const id = `kelompok-${i + 1}`;
        return (
          <section className="section section--rule" aria-labelledby={id} key={kelompok.judul}>
            <div className="container split">
              <div>
                <h2 id={id} className="h3">
                  {kelompok.judul}
                </h2>
                <p className="note mt-2">{kelompok.catatan}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th scope="col">Mata pelajaran</th>
                      <th scope="col" className="num">
                        JP/minggu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {kelompok.mapel.map((m) => (
                      <tr key={m.nama}>
                        <td>
                          <span className="font-bold">{m.nama}</span>
                          {m.keterangan ? <span className="block text-muted text-sm mt-1">{m.keterangan}</span> : null}
                        </td>
                        <td className="num">{m.jp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        );
      })}
      <p className="container note pb-16">Alokasi jam di atas adalah contoh dan mengikuti struktur kurikulum yang berlaku.</p>
    </>
  );
}
