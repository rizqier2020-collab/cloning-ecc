import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy. Halaman dibuat statis (SSG/ISR) sehingga nonce per request
 * tidak mungkin; skrip inline hidrasi Next.js (self.__next_f.push) dan penanda html.js
 * membutuhkan 'unsafe-inline'. style-src juga 'unsafe-inline' karena atribut style
 * (mis. durasi Marquee). 'unsafe-eval' hanya untuk `next dev` (React dev tools/HMR).
 * frame-src hanya Google Maps (dicek juga oleh skema kontak.peta.embed).
 */
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "frame-src https://www.google.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // URL lama Guru & Staf (design guide §2.1) → lokasi baru di bawah Profil.
      { source: "/guru-staf", destination: "/profil/guru-staf", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: CSP },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
