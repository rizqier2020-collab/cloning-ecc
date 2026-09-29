import { PageIntro } from "@/components/ui/PageIntro";
import { strukturOrganisasi } from "@/content/profil";
import { getHalaman } from "@/lib/content/repository";
import { buatMetadata } from "@/lib/seo";

const halaman = getHalaman("struktur-organisasi");

export const metadata = buatMetadata({
  judul: halaman.data.judul,
  deskripsi: halaman.data.deskripsi,
  path: "/profil/struktur-organisasi",
});

export default function StrukturPage() {
  return (
    <>
      <PageIntro
        id="struktur-judul"
        judul={halaman.data.judul}
        remah={[{ label: "Profil", href: "/profil" }, { label: halaman.data.judul }]}
        lead={halaman.body.trim()}
      />
      <section className="section section--rule" aria-labelledby="bagan-judul">
        <div className="container">
          <h2 id="bagan-judul" className="label label--muted section-head">
            Bagan organisasi 2026/2027
          </h2>
          <ol className="org">
            {strukturOrganisasi.map((tier) => (
              <li className="org__tier" key={tier.tingkat}>
                <h3 className="label label--accent">{tier.tingkat}</h3>
                <ul className="org__units">
                  {tier.unit.map((u) => (
                    <li className="org__unit" key={u.jabatan}>
                      <span className="org__name">{u.nama}</span>
                      <span className="meta">{u.jabatan}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
