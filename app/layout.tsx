import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Path2Better - Community-powered pathways forward",
  description: "Transparent support connecting neighbours in Peterborough to housing stability and employment opportunities through agency-verified campaigns.",
  keywords: ["crowdfunding", "homelessness", "Peterborough", "community support", "housing"],
  openGraph: {
    title: "Path2Better",
    description: "Community-powered pathways forward",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
