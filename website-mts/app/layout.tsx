import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InlineScript } from "@/components/ui/InlineScript";
import { getSiteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.nama} — ${site.jenjang} di ${site.kota}`,
    template: `%s | ${site.nama}`,
  },
  description: site.deskripsi,
  applicationName: site.nama,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.nama,
    locale: "id_ID",
    type: "website",
    title: site.nama,
    description: site.deskripsi,
    url: "/",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fdfcfa",
};

/** Menandai bahwa JS aktif sebelum paint, sama seperti mockup (html.js). */
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <InlineScript html={JS_FLAG} />
      </head>
      <body>
        <a className="skip-link" href="#konten">
          Langsung ke konten utama
        </a>
        <SiteHeader wordmark={site.namaPendek} />
        <main id="konten">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
