import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import type { z } from "zod";

export interface Entry<T> {
  readonly slug: string;
  readonly data: T;
  /** Isi Markdown mentah (belum dirender). */
  readonly body: string;
  /** Path berkas relatif terhadap folder kerja, untuk pesan galat. */
  readonly file: string;
}

/** Galat konten yang menggagalkan build dengan pesan yang menunjuk berkas & field. */
export class ContentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentValidationError";
  }
}

/**
 * YAML frontmatter dibaca dengan CORE_SCHEMA (tanpa konversi tanggal otomatis).
 * Skema bawaan js-yaml mengubah "2026-02-30" menjadi 2 Maret tanpa galat; dengan
 * CORE_SCHEMA tanggal tetap string lalu divalidasi ketat oleh zod.
 */
const tolakJavaScript = (): never => {
  throw new Error('front matter JavaScript tidak diizinkan; gunakan YAML ("---")');
};

/**
 * Engine "js"/"javascript" bawaan gray-matter menjalankan `---js` dengan eval.
 * Konten hanya boleh berupa data, jadi keduanya dimatikan (pertahanan berlapis).
 */
const MATTER_OPTIONS = {
  engines: {
    yaml: (source: string) => (yaml.load(source, { schema: yaml.CORE_SCHEMA }) ?? {}) as object,
    js: tolakJavaScript,
    javascript: tolakJavaScript,
  },
};

function bacaFrontmatter(raw: string, file: string): { data: unknown; content: string } {
  try {
    return matter(raw, MATTER_OPTIONS);
  } catch (err) {
    const pesan = err instanceof Error ? err.message : String(err);
    throw new ContentValidationError(`Konten tidak valid di ${relatif(file)}:\n  - (frontmatter): ${pesan}`);
  }
}

const DATE_PREFIX = /^\d{4}-\d{2}(?:-\d{2})?-/;

/** "2026-09-20-juara-mtq.md" → "juara-mtq"; "2026-06-wisuda.md" → "wisuda". */
export function slugDariNamaBerkas(namaBerkas: string): string {
  return namaBerkas.replace(/\.md$/, "").replace(DATE_PREFIX, "");
}

function relatif(file: string): string {
  return path.relative(process.cwd(), file) || file;
}

function formatIssues(issues: readonly z.core.$ZodIssue[]): string {
  return issues
    .map((issue) => {
      const field = issue.path.length ? issue.path.join(".") : "(frontmatter)";
      return `  - ${field}: ${issue.message}`;
    })
    .join("\n");
}

/** Baca & validasi satu berkas Markdown. */
export function loadFile<S extends z.ZodType>(file: string, schema: S): Entry<z.output<S>> {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = bacaFrontmatter(raw, file);
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ContentValidationError(
      `Konten tidak valid di ${relatif(file)}:\n${formatIssues(result.error.issues)}`,
    );
  }
  const parsed = result.data as z.output<S> & { slug?: string };
  return {
    slug: parsed.slug ?? slugDariNamaBerkas(path.basename(file)),
    data: parsed,
    body: content,
    file: relatif(file),
  };
}

/** Baca semua *.md di satu folder, validasi frontmatter, dan pastikan slug unik. */
export function loadCollection<S extends z.ZodType>(dir: string, schema: S): Entry<z.output<S>>[] {
  if (!fs.existsSync(dir)) {
    throw new ContentValidationError(`Folder konten tidak ditemukan: ${relatif(dir)}`);
  }
  const files = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .sort();

  const entries = files.map((name) => loadFile(path.join(dir, name), schema));

  const seen = new Map<string, string>();
  for (const entry of entries) {
    const existing = seen.get(entry.slug);
    if (existing) {
      throw new ContentValidationError(
        `slug "${entry.slug}" dipakai lebih dari satu berkas: ${existing} dan ${entry.file}. ` +
          `Ganti nama berkas atau isi field "slug" yang berbeda.`,
      );
    }
    seen.set(entry.slug, entry.file);
  }
  return entries;
}
