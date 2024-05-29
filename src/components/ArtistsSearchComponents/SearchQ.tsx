import useDebounce from '@/utils/hooks/useDebounce';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import RiSearch2Line from '~icons/ri/search-2-line';

interface Props {
  onQChanges: Function;
}

export const SearchQ: FC<Props> = props => {
  const [searchQ, setSearchQ] = useState<string>('');
  const debouncedValue = useDebounce(searchQ, 300);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const username = router.query.username as string;
    if (username !== undefined) {
      setSearchQ(username);
    }
  }, [router.isReady, router.query.username]);

  useEffect(() => {
    props.onQChanges(searchQ);
  }, [debouncedValue]);

  return (
    <section className="h-15 flex flex-row items-center gap-5 rounded-3xl bg-dot-primary p-3 px-5 outline-dot-primary group-focus:outline-2">
      <RiSearch2Line />
      <input
        onChange={e => setSearchQ(e.target.value)}
        type="search"
        placeholder="Input artist @tag..."
        value={searchQ}
        className=" group h-full bg-transparent text-zinc-400 outline-none placeholder:text-sm"
      />
    </section>
  );
};
