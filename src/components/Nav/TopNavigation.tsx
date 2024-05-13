import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';

interface Props {
  isSuggestModalOpened: boolean;
  onSuggestModalOpened: Function;
}

export const TopNavigation: FC<Props> = ({
  onSuggestModalOpened,
  isSuggestModalOpened,
}) => {
  const path = usePathname();
  // const [isSuggestModalOpened, setIsSuggestModalOpened] =
  //   useState<boolean>(false);

  return (
    <>
      <header className="fixed inset-x-0 top-10 z-40 mx-auto flex max-w-7xl flex-row justify-between gap-3 text-sm">
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
        <button
          className={classNames(
            'rounded-full bg-c-amber-dark p-2 px-5 transition-all duration-200 ease-in-out md:hover:bg-c-amber-light'
          )}
          onClick={() => {
            onSuggestModalOpened(!isSuggestModalOpened);
          }}
        >
          Suggest artist
        </button>
      </header>
    </>
  );
};
