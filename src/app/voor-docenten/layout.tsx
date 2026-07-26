import DocentHeader from "@/components/layout/DocentHeader";
import DocentFooter from "@/components/layout/DocentFooter";

export default function VoorDocentenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocentHeader />
      <main className="flex-1">{children}</main>
      <DocentFooter />
    </>
  );
}
