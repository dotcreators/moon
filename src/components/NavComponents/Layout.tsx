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
      <div className="fixed top-0 z-50 mx-auto h-fit w-full pt-5 md:absolute md:max-w-full md:pt-0">
        <TopNavigation />
      </div>

      <main className={classNames('mb-20 w-full md:mb-12 md:min-h-screen')}>
        {children}
      </main>
      <footer>
        <BottomNavigation />
      </footer>
    </div>
  );
}
