import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import "./typography.css";
import "./layout.css";
import "./navigation.css";
import "./sections.css";
import "./buttons.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Private Yoga at Home | Yogadocent aan huis",
  description:
    "Vind een zorgvuldig geselecteerde yogadocent voor privélessen aan huis. Persoonlijk, professioneel en in jouw eigen omgeving.",
  icons: {
    icon: "/favicon-pyah.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${lato.variable} h-full antialiased`}>
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
