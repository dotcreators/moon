import { Metadata } from 'next';
import './globals.css';
import 'uno.css';
import 'overlayscrollbars/overlayscrollbars.css';
import { hubotSans, inter } from './fonts';

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
