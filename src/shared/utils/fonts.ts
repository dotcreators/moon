import { Inter, Mona_Sans } from 'next/font/google';

export const hubotSans = Mona_Sans({
  variable: '--font-mona-sans',
  display: 'block',
  subsets: ['latin'],
  preload: true,
  axes: ['wdth'],
});

export const inter = Inter({
  display: 'block',
  subsets: ['cyrillic', 'latin'],
  preload: true,
  weight: 'variable',
});
