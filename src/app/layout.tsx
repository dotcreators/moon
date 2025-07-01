import { Metadata, Viewport } from 'next';
import './globals.css';
import 'uno.css';
import 'overlayscrollbars/overlayscrollbars.css';
import ClientLayout from './layout.client';

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
  keywords: ['dotcreators', 'pixel artist', 'pixel art'],
  metadataBase: new URL('https://dotcreators.xyz'),
  alternates: {
    canonical: 'https://dotcreators.xyz',
  },
  openGraph: {
    title: 'dotcreators',
    description,
    type: 'website',
    url: new URL('https://dotcreators.xyz'),
    images: [
      {
        width: 1280,
        height: 720,
        url: '/summary_large_image.webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dotcreators',
    description: description,
    images: ['/summary_large_image.webp'],
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
    'vk:image': '/summary_large_image.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}
