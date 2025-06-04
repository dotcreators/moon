'use client';

import { hubotSans, inter } from '@/shared/utils/fonts';
import Navigation from '@/shared/ui/navigation';
import Footer from '@/shared/ui/footer';
import { twJoin } from 'tailwind-merge';
import Script from 'next/script';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://cloud.umami.is/script.js"
        defer={true}
        data-website-id={process.env.UNAMI_ANALYTICS}
      />
      <body
        className={twJoin(
          `${hubotSans.variable} font-sans antialiased`,
          'flex flex-col gap-3',
          'laptop:gap-5'
        )}
        style={inter.style}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
