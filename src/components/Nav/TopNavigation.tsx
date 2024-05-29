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
        {/* <div className="grid h-[60px] w-[60px] grid-cols-1 place-items-center justify-center rounded-2xl bg-dot-primary"> */}
        <DotcreatorsLogo />
        {/* </div> */}
        <div className="my-8 flex w-fit flex-row items-center justify-between gap-3 rounded-full bg-dot-primary p-3 text-sm">
          <Link
            className={classNames(
              'md:hover:bg-dot-secondary rounded-full p-2 px-5 transition-all duration-200 ease-in-out',
              { 'bg-dot-secondary': path === '/' }
            )}
            href="/"
          >
            Home
          </Link>
          <Link
            className={classNames(
              ' md:hover:bg-dot-secondary rounded-full p-2 px-5 transition-all duration-200 ease-in-out',
              { 'bg-dot-secondary': path === '/lists' }
            )}
            href="/lists"
          >
            Lists
          </Link>
          <Link
            href={'/suggest'}
            className={classNames(
              'text-dot-body bg-dot-button-primary flex flex-row items-center gap-2 rounded-full p-2 px-5 font-semibold transition-all duration-200 ease-in-out md:hover:bg-c-amber-light'
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
