import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Private Yoga at Home | Yogadocent aan huis",
  description:
    "Vind een zorgvuldig geselecteerde yogadocent voor privélessen aan huis. Persoonlijk, professioneel en in jouw eigen omgeving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${dmSans.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/zan4wgj.css" />
      </head>
      <body className="min-h-full flex flex-col text-pyah-donker">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
