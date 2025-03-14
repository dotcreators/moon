import { Metadata, Viewport } from 'next';
import { hubotSans, inter } from '@/shared/utils/fonts';
import Navigation from '@/shared/ui/navigation';
import Footer from '@/shared/ui/footer';
import { twJoin } from 'tailwind-merge';
import './globals.css';
import 'uno.css';
import 'overlayscrollbars/overlayscrollbars.css';

const description =
  'Track, share and grow together with a community of talented pixel artists!';

export const viewport: Viewport = {
  themeColor: '#fa4545',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: {
    default: 'Home',
    template: '%s › dotcreators',
  },
  robots: { index: true, follow: true },
  description: description,
  keywords: description,
  metadataBase: new URL('https://dotcreators.xyz'),
  openGraph: {
    title: 'dotcreators',
    description,
    type: 'website',
    url: new URL('https://dotcreators.xyz'),
    images: [
      {
        width: 1280,
        height: 720,
        url: '/summary_large_image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dotcreators',
    description: description,
    images: ['/summary_large_image.png'],
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/favicon-180x180.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon-180x180.png',
    },
  ],
  other: {
    'vk:image': '/summary_large_image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twJoin(
          `${hubotSans.variable} font-sans antialiased`,
          'flex flex-col gap-5'
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
