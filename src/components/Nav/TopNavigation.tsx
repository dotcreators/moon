import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';

interface Props {
  onSuggestModalOpened: Function;
}

export const TopNavigation: FC<Props> = props => {
  const path = usePathname();
  const [isSuggestModalOpened, setIsSuggestModalOpened] =
    useState<boolean>(false);

  return (
    <>
      <header className="fixed inset-x-0 top-5 z-40 mx-auto flex w-fit flex-row gap-1 rounded-full bg-dark-inner-hover/50 p-3 px-4 text-sm backdrop-blur-xl backdrop:brightness-200">
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
        <button
          className={classNames(
            'rounded-full p-1 px-5 transition-all duration-200 ease-in-out md:hover:bg-dark-double-inner'
          )}
          onClick={() => {
            setIsSuggestModalOpened(!isSuggestModalOpened);
            props.onSuggestModalOpened(!isSuggestModalOpened);
          }}
        >
          Suggest artist
        </button>
      </header>
    </>
  );
};
