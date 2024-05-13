import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { TopNavigation } from './TopNavigation';
import { StepController } from '../ArtistsSuggestComponents/Steps/StepController';
import { useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

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
      <StepController
        onModalOpen={isSuggestModalOpened}
        setModalOpen={setIsSuggestModalOpened}
      />

      <header>
        <TopNavigation
          onSuggestModalOpened={setIsSuggestModalOpened}
          isSuggestModalOpened={isSuggestModalOpened}
        />
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
