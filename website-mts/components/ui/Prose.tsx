import { renderMarkdown } from "@/lib/markdown";

/** Render isi Markdown yang sudah disanitasi (lib/markdown.ts). */
export function Prose({ markdown, className = "" }: { readonly markdown: string; readonly className?: string }) {
  const html = renderMarkdown(markdown);
  if (!html) return null;
  return <div className={["prose", className].filter(Boolean).join(" ")} dangerouslySetInnerHTML={{ __html: html }} />;
}
