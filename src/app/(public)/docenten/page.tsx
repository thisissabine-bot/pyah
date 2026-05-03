import ZoekPagina from "@/components/docenten/ZoekPagina";
import { getAllDocenten } from "@/lib/docenten";

export const metadata = {
  title: "Yogadocenten aan huis | Private Yoga at Home",
  description:
    "Vind een gecertificeerde yogadocent die bij jou thuiskomt. Filter op stijl, stad en niveau.",
};

export default async function DocentenPage() {
  const docenten = await getAllDocenten();
  return <ZoekPagina docenten={docenten} />;
}
