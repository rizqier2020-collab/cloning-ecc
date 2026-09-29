import { HalamanMarkdown } from "@/components/ui/HalamanMarkdown";
import { getHalaman } from "@/lib/content/repository";
import { buatMetadata } from "@/lib/seo";

const halaman = getHalaman("visi-misi");

export const metadata = buatMetadata({ judul: halaman.data.judul, deskripsi: halaman.data.deskripsi, path: "/profil/visi-misi" });

export default function VisiMisiPage() {
  return <HalamanMarkdown halaman={halaman} induk={{ label: "Profil", href: "/profil" }} />;
}
