import { ContactGrid } from "@/components/home/ContactGrid";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { PageIntro } from "@/components/ui/PageIntro";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buatMetadata({
  judul: "Kontak",
  deskripsi: `Alamat, WhatsApp, email, media sosial, jam layanan, dan peta lokasi ${site.nama}.`,
  path: "/kontak",
});

export default function KontakPage() {
  const { alamat, kontak } = site;
  return (
    <>
      <PageIntro id="kontak-judul" judul="Kontak" lead="Kami melayani pertanyaan orang tua dan calon siswa pada jam layanan.">
        <div className="btn-row mt-8">
          <a className="btn btn--solid" href={kontak.whatsapp.tautan}>
            Chat WhatsApp <span aria-hidden="true">→</span>
          </a>
          <a className="btn btn--line" href={`mailto:${kontak.email}`}>
            Kirim email
          </a>
        </div>
      </PageIntro>
      <section className="section section--rule" aria-labelledby="saluran-judul">
        <div className="container">
          <h2 id="saluran-judul" className="label label--accent section-head">
            Saluran resmi
          </h2>
          <ContactGrid />
        </div>
      </section>
      <section className="section section--rule" aria-labelledby="peta-judul">
        <div className="container split">
          <div>
            <h2 id="peta-judul" className="label label--muted">
              Lokasi
            </h2>
            <address className="mt-4 not-italic text-muted">
              {alamat.jalan}
              <br />
              {alamat.kota}, {alamat.provinsi} {alamat.kodePos}
            </address>
            <p>
              <a className="link-arrow" href={kontak.peta.tautan}>
                Buka di Google Maps <span aria-hidden="true">&nbsp;→</span>
              </a>
            </p>
          </div>
          <MapEmbed src={kontak.peta.embed} judul={`Peta lokasi ${site.nama}`} />
        </div>
      </section>
    </>
  );
}
