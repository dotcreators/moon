import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DotcreatorsLogo from '../DotcreatorsLogo';
import RiAddFill from '~icons/ri/add-fill';

export default function TopNavigation() {
  const path = usePathname();

  return (
    <>
      <header className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between gap-3">
        <Link href="/">
          <DotcreatorsLogo />
        </Link>
        <div className="my-8 flex w-fit flex-row items-center justify-between gap-3 rounded-full bg-dot-primary p-3 text-sm">
          <Link
            className={classNames(
              'rounded-full p-2 px-5 transition-all duration-200 ease-in-out md:hover:bg-dot-secondary',
              { 'bg-dot-secondary': path === '/' }
            )}
            href="/"
          >
            Home
          </Link>
          <Link
            className={classNames(
              ' rounded-full p-2 px-5 transition-all duration-200 ease-in-out md:hover:bg-dot-secondary',
              { 'bg-dot-secondary': path === '/lists' }
            )}
            href="/lists"
          >
            Artists list
          </Link>
          <Link
            href={'/suggest'}
            className={classNames(
              'flex flex-row items-center gap-2 rounded-full bg-dot-button-primary p-2 px-5 font-semibold text-dot-body transition-all duration-200 ease-in-out md:hover:bg-dot-rose-light'
            )}
          >
            Suggest artist
            <RiAddFill />
          </Link>
        </div>
      </header>
    </>
  );
}
