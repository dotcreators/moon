import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { TopNavigation } from './TopNavigation';
import StepController from '../ArtistsSuggestComponents/Steps/StepController';
import { useState } from 'react';
import classNames from 'classnames';

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
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSuggestModalOpened, setIsSuggestModalOpened] =
    useState<boolean>(false);

  return (
    <div className={`${hubotSans.variable} font-sans`} style={inter.style}>
      <dialog
        className="fixed top-0 z-20 h-full w-full overflow-y-auto overscroll-y-none bg-transparent backdrop-blur-lg backdrop-brightness-[25%]"
        open={isSuggestModalOpened}
      >
        <StepController />
      </dialog>
      <header>
        <TopNavigation onSuggestModalOpened={setIsSuggestModalOpened} />
      </header>
      <main
        className={classNames('h-screen w-full', {
          'overflow-y-hidden': isSuggestModalOpened,
        })}
      >
        {children}
      </main>
    </div>
  );
}
