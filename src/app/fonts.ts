import { Hubot_Sans, Inter } from 'next/font/google';

export const hubotSans = Hubot_Sans({
  variable: '--font-hubot',
  weight: '700',
  display: 'block',
  subsets: ['latin'],
  preload: true,
});

export const inter = Inter({
  display: 'block',
  subsets: ['cyrillic', 'latin'],
  preload: true,
  weight: 'variable',
});
