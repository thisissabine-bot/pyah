import ZoekPagina from "@/components/docenten/ZoekPagina";
import { getAllDocenten } from "@/lib/docenten";

export const metadata = {
  title: "Yogadocenten aan huis | Private Yoga at Home",
  description:
    "Vind een gecertificeerde yogadocent die bij jou thuiskomt. Filter op stijl, stad en niveau.",
};

interface Props {
  searchParams: Promise<{ locatie?: string }>;
}

export default async function DocentenPage({ searchParams }: Props) {
  const { locatie } = await searchParams;
  const docenten = await getAllDocenten();
  return <ZoekPagina docenten={docenten} locatie={locatie ?? ""} />;
}
