import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Amiri } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const amiri = Amiri({
  subsets: ['arabic'],
  variable: '--font-amiri',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Labbayk — Hajj & Omra',
  description: 'Votre partenaire de confiance pour le Hajj et la Omra.',
  keywords: ['Hajj', 'Omra', 'pèlerinage', 'La Mecque', 'Médine', 'Labbayk'],
  authors: [{ name: 'Labbayk Voyages' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#FDFBF7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${amiri.variable}`}
    >
      <body className="safe-top">
        {children}
      </body>
    </html>
  );
}
