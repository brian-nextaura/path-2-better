import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from 'next/font/google';
import "./globals.css";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const dmSerif = DM_Serif_Display({ 
  weight: ['400'],
  subsets: ['latin'], 
  variable: '--font-serif' 
});

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
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
