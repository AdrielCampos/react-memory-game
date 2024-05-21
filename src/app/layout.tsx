import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/config/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jogo da Memória",
  description: "Jogo da memória com os missionários da INA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/favicon.jpg" sizes="any" />
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
