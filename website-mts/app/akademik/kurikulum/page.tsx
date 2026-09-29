import { HalamanMarkdown } from "@/components/ui/HalamanMarkdown";
import { getHalaman } from "@/lib/content/repository";
import { buatMetadata } from "@/lib/seo";

const halaman = getHalaman("kurikulum");

export const metadata = buatMetadata({ judul: halaman.data.judul, deskripsi: halaman.data.deskripsi, path: "/akademik/kurikulum" });

export default function KurikulumPage() {
  return <HalamanMarkdown halaman={halaman} induk={{ label: "Akademik", href: "/akademik" }} />;
}
