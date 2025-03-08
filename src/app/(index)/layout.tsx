import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'uno.css';

export const hubotSans = localFont({
  src: '../../../public/hubot-sans.woff2',
  variable: '--font-hubot',
  weight: '700',
  display: 'block',
  preload: true,
});

export const inter = Inter({
  display: 'block',
  subsets: ['cyrillic', 'latin'],
  preload: true,
  weight: 'variable',
});

export const metadata: Metadata = {
  title: 'dotcreators',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hubotSans.variable} font-sans antialiased`}
        style={inter.style}
      >
        {children}
      </body>
    </html>
  );
}
