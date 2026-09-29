/**
 * Skrip inline yang berjalan sinkron saat HTML diurai (sebelum paint).
 * Di klien tipenya "text/plain" agar React tidak memperingatkan/menjalankannya ulang.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
