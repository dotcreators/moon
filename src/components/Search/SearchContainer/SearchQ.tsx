import useDebounce from '@/utils/hooks/useDebounce';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import RiSearch2Line from '~icons/ri/search-2-line';

interface Props {
  onQChanges: (query: string) => void;
  classNames?: string;
}

export const SearchQ: FC<Props> = props => {
  const [searchQ, setSearchQ] = useState<string>('');
  const debouncedValue = useDebounce(searchQ, 500);
  const router = useRouter();

  useEffect(() => {
    const updateSearchQFromRouter = () => {
      if (!router.isReady) return;

      const username = router.query.username as string;
      if (username !== undefined) {
        setSearchQ(username);
      }
    };

    updateSearchQFromRouter();
  }, [router.isReady, router.query.username]);

  useEffect(() => {
    props.onQChanges(searchQ);
  }, [debouncedValue, props.onQChanges]);

  return (
    <section
      className={classNames(
        'flex h-14 w-full flex-row items-center gap-5 rounded-3xl bg-dot-primary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose',
        props.classNames
      )}
    >
      <RiSearch2Line className="w-6" />
      <input
        onChange={e => setSearchQ(e.target.value)}
        type="search"
        placeholder="Search..."
        value={searchQ}
        className="h-full w-full bg-transparent outline-none placeholder:text-sm placeholder:text-zinc-400"
      />
    </section>
  );
};
