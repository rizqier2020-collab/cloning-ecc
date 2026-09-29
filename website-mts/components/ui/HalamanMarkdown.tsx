import { PageIntro } from "@/components/ui/PageIntro";
import { Prose } from "@/components/ui/Prose";
import type { Halaman } from "@/lib/content/repository";

interface HalamanMarkdownProps {
  readonly halaman: Halaman;
  readonly induk: { readonly label: string; readonly href: string };
}

/** Subhalaman teks: remah + judul display + isi Markdown dalam kolom editorial. */
export function HalamanMarkdown({ halaman, induk }: HalamanMarkdownProps) {
  const id = "halaman-judul";
  return (
    <>
      <PageIntro
        id={id}
        judul={halaman.data.judul}
        remah={[induk, { label: halaman.data.judul }]}
        lead={halaman.data.deskripsi}
      />
      <div className="section section--rule">
        <div className="container">
          <Prose markdown={halaman.body} />
        </div>
      </div>
    </>
  );
}
