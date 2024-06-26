import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import TopNavigation from './TopNavigation';
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
      className={`${hubotSans.variable} relative flex flex-col font-sans`}
      style={inter.style}
    >
      <div className="fixed top-0 z-50 h-fit w-full mx-auto md:max-w-full md:absolute m-3 md:m-0">
        <TopNavigation />
      </div>

      <main className={classNames('mb-16 md:mb-32 min-h-screen w-full')}>
        {children}
      </main>
      <footer>
        <BottomNavigation />
      </footer>
    </div>
  );
}
