import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DocentProfiel from "@/components/docenten/DocentProfiel";
import { getDocent, getAllSlugs } from "@/lib/docenten";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ terug?: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const docent = await getDocent(slug);
  if (!docent) return {};
  return {
    title: `${docent.naam} — Privé yogadocent in ${docent.locatie} | PYAH`,
    description: docent.bio.slice(0, 160),
  };
}

export default async function DocentProfielPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { terug } = await searchParams;
  const docent = await getDocent(slug);

  if (!docent) notFound();

  return <DocentProfiel docent={docent} terug={terug ?? ""} />;
}
