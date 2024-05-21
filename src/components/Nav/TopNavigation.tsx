import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavigation() {
  const path = usePathname();

  return (
    <>
      <header className="mx-auto flex max-w-7xl flex-row justify-between gap-3 bg-dark-bg py-8 text-sm">
        <section className="flex flex-row gap-2 rounded-full bg-dark-inner-hover/50 p-2 px-3 backdrop-blur-xl backdrop:brightness-200">
          <Link
            className={classNames(
              'rounded-full p-1 px-5 transition-all duration-200 ease-in-out md:hover:bg-dark-double-inner',
              { 'bg-dark-double-inner': path === '/' }
            )}
            href="/"
          >
            Home
          </Link>
          <Link
            className={classNames(
              'rounded-full p-1 px-5 transition-all duration-200 ease-in-out md:hover:bg-dark-double-inner',
              { 'bg-dark-double-inner': path === '/lists' }
            )}
            href="/lists"
          >
            Lists
          </Link>
        </section>
        <Link
          href={'/suggest'}
          className={classNames(
            'flex flex-row items-center rounded-full bg-c-amber-dark p-2 px-5 font-bold text-dark-bg transition-all duration-200 ease-in-out md:hover:bg-c-amber-light'
          )}
        >
          Suggest artist
        </Link>
      </header>
    </>
  );
}
