import { site } from "@/lib/site";

/** Pasangan label/nilai kontak madrasah. */
export function ContactGrid() {
  const { kontak, alamat } = site;
  return (
    <dl className="contact-grid">
      <div className="contact-item">
        <dt className="label label--accent">WhatsApp</dt>
        <dd>
          <a href={kontak.whatsapp.tautan}>{kontak.whatsapp.tampil}</a>
        </dd>
      </div>
      <div className="contact-item">
        <dt className="label label--accent">Email</dt>
        <dd>
          <a href={`mailto:${kontak.email}`}>{kontak.email}</a>
        </dd>
      </div>
      <div className="contact-item">
        <dt className="label label--accent">Instagram</dt>
        <dd>
          <a href={kontak.instagram.tautan}>{kontak.instagram.tampil}</a>
        </dd>
      </div>
      <div className="contact-item">
        <dt className="label label--accent">YouTube</dt>
        <dd>
          <a href={kontak.youtube.tautan}>{kontak.youtube.tampil}</a>
        </dd>
      </div>
      <div className="contact-item">
        <dt className="label label--accent">Alamat · Google Maps</dt>
        <dd>
          {alamat.jalan}, {alamat.kota}
          <br />
          <a className="link-arrow" href={kontak.peta.tautan}>
            Lihat di Google Maps <span aria-hidden="true">&nbsp;→</span>
          </a>
        </dd>
      </div>
      <div className="contact-item">
        <dt className="label label--accent">Jam layanan</dt>
        <dd>
          {kontak.jamLayanan.map((baris, i) => (
            <span key={baris}>
              {i > 0 ? <br /> : null}
              {baris}
            </span>
          ))}
        </dd>
      </div>
    </dl>
  );
}
