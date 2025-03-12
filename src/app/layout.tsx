import { Metadata } from 'next';
import { hubotSans, inter } from '@/shared/utils/fonts';
import './globals.css';
import 'uno.css';
import 'overlayscrollbars/overlayscrollbars.css';

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
