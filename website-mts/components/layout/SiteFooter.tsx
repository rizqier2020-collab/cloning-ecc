import Link from "next/link";
import { NAV_FOOTER } from "@/lib/nav";
import { site } from "@/lib/site";

export function SiteFooter() {
  const tahun = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <Link className="wordmark" href="/">
          {site.namaPendek}
        </Link>
        <nav aria-label="Tautan footer">
          <ul className="footer-links">
            {NAV_FOOTER.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="footer-legal">
          NSM {site.nsm} · NPSN {site.npsn}
          <br />© {tahun} {site.nama}
        </p>
      </div>
    </footer>
  );
}
