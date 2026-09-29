import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/**
 * Markdown → HTML yang aman. HTML mentah di dalam Markdown dibuang (remark-rehype
 * tanpa allowDangerousHtml), lalu hasilnya disaring lagi oleh rehype-sanitize
 * (skema bawaan GitHub: tanpa script, atribut on*, atau tautan javascript:).
 */
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

export function renderMarkdown(markdown: string): string {
  if (!markdown.trim()) return "";
  return String(processor.processSync(markdown)).trim();
}
