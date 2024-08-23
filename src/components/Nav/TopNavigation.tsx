import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RiAddFill from '~icons/ri/add-fill';
import RiAddLargeLine from '~icons/ri/add-large-line';
import { DotcreatorsLogoResponsive } from '../Other/DotcreatorsLogoResponsive';

export default function TopNavigation() {
  const path = usePathname();

  return (
    <>
      <header className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between gap-3 md:px-10 lg:px-0">
        <Link href="/" className="hidden md:flex">
          <DotcreatorsLogoResponsive width={30} height={28} />
        </Link>

        {/* Mobile */}
        <div className="mx-3 flex w-full flex-row items-center justify-between gap-3 rounded-full border border-dot-white/5 bg-dot-primary/70 p-3 px-5 text-sm backdrop-blur-xl md:hidden md:p-5">
          <Link href="/" className="ml-2">
            <DotcreatorsLogoResponsive width={25} height={23} />
          </Link>
          <div className="flex w-fit flex-row">
            <Link
              className={classNames(
                'flex flex-row items-center gap-1 rounded-full p-2 px-4'
              )}
              href="/artists"
            >
              Artists
            </Link>

            <Link
              className={classNames(
                'text-bold flex flex-row items-center gap-1 rounded-full bg-dot-rose p-2 px-4 text-dot-body'
              )}
              href="/suggest"
            >
              <RiAddLargeLine />
              Suggest
            </Link>
          </div>
        </div>

        {/* Desktop */}
        <div className="my-8 hidden w-fit flex-row items-center justify-between gap-3 rounded-full bg-dot-primary p-3 text-sm md:flex">
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
              'rounded-full p-2 px-5 transition-all duration-200 ease-in-out md:hover:bg-dot-secondary',
              { 'bg-dot-secondary': path === '/artists' }
            )}
            href="/artists"
          >
            Artists
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
