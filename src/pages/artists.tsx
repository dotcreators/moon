import { ArtistListCard } from '@/components/ArtistsSearchComponents/ArtistListCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistsSearch } from '@/components/ArtistsSearchComponents/ArtistsSearch';
import useSWR from 'swr';
import ArtistListCardLoader from '@/components/ArtistsSearchComponents/ArtistListCardLoader';
import { useState, useEffect } from 'react';
import { Pagination } from '@/components/ArtistsSearchComponents/Pagination';
import RiEmotionUnhappyFill from '~icons/ri/emotion-unhappy-fill';
import { useSearchStore } from '@/store/useSearchStore';
import { NextSeo } from 'next-seo';

export default function artists() {
  const [searchString, setSearchString] = useState<string>('');
  const {
    searchFilter,
    updateSearchTotalPage,
    updateSearchIsNext,
    updateSearchPage,
  } = useSearchStore();

  const { data, error } = useSWR<{
    status: string;
    response: { data: ArtistProfile[]; has_next: boolean; total_pages: number };
  }>(
    `${process.env.API_URL}artists?${searchString}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  useEffect(() => {
    if (data) {
      updateSearchTotalPage(data.response.total_pages);
      updateSearchIsNext(data.response.has_next);
      updateSearchPage(searchFilter.page.currentPage);
    }
  }, [
    data,
    updateSearchTotalPage,
    updateSearchIsNext,
    updateSearchPage,
    searchFilter.page.currentPage,
  ]);

  console.log(searchFilter);

  return (
    <>
      <NextSeo
        title="Artists"
        description="Search wonderful pixel-related creators!"
      />
      <section className="relative m-auto md:grid flex h-fit w-full max-w-7xl flex-col md:grid-cols-4 items-start justify-center gap-5 pt-[100px] md:pt-32 p-3 md:p-0">
        <div className="md:sticky md:top-8 w-full">
          <ArtistsSearch onSearchStringChanges={setSearchString} />
        </div>
        <section className="col-span-3 flex w-full flex-col gap-5">
          <div className="divide-y divide-dot-secondary md:divide-none flex-col flex md:gap-3 rounded-xl overflow-hidden">
            {data && !error ? (
              data && data.response.data.length !== 0 ? (
                data.response.data.map(artist => (
                  <ArtistListCard key={artist.userId} artist={artist} />
                ))
              ) : (
                <div className="flex h-16 w-full flex-row items-center justify-center gap-3 rounded-2xl bg-dot-primary p-10 text-zinc-400">
                  <RiEmotionUnhappyFill className="text-xl" />
                  <p>No results found.</p>
                </div>
              )
            ) : (
              [...Array(25)].map((_, index) => (
                <ArtistListCardLoader key={index} />
              ))
            )}
          </div>
          <Pagination
            totalResults={data ? data.response.data.length : 0}
            className={'mt-2'}
          />
        </section>
      </section>
    </>
  );
}
