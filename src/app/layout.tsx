import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export const metadata: Metadata = {
  title: 'HBZ Studio — Monolithic Contemporary Architecture & Spatial Planning',
  description: 'HBZ is a contemporary architectural practice focused on spatial presence, mineral permanence, and monolithic architectural design across commercial headquarters and private residences.',
  keywords: ['Architecture Studio', 'Spatial Planning', 'Turnkey House Construction', 'Monolithic Architecture', 'Contemporary Design'],
  authors: [{ name: 'HBZ Studio' }],
  openGraph: {
    title: 'HBZ Studio — Architecture of Enduring Presence',
    description: 'Contemporary architectural practice based in London, Tokyo, and Zurich.',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ContactModal />
      </body>
    </html>
  );
}
