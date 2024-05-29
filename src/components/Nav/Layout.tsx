import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import TopNavigation from './TopNavigation';
import StepController from '../ArtistsSuggestComponents/Steps/StepController';
import { useState } from 'react';
import classNames from 'classnames';
import BottomNavigation from './BottomNavigation';

export const hubotSans = localFont({
  src: '../../../public/Hubot-Sans.woff2',
  variable: '--font-hubot-sans',
  weight: '700',
  declarations: [{ prop: 'font-stretch', value: '125%' }],
  display: 'block',
  preload: true,
});

export const inter = Inter({
  display: 'block',
  subsets: ['cyrillic', 'latin'],
  preload: true,
  weight: 'variable',
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${hubotSans.variable} relative font-sans`}
      style={inter.style}
    >
      <header className="absolute top-0 z-20 w-full">
        <TopNavigation />
      </header>
      <main className={classNames('mb-8 min-h-screen w-full')}>{children}</main>
      <footer>
        <BottomNavigation />
      </footer>
    </div>
  );
}
