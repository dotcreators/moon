import { ArtistListCard } from '@/components/ArtistsSearchComponents/ArtistListCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistsSearch } from '@/components/ArtistsSearchComponents/ArtistsSearch';
import useSWR from 'swr';
import ArtistListCardLoader from '@/components/ArtistsSearchComponents/ArtistListCardLoader';
import { useState, useEffect } from 'react';
import { Pagination } from '@/components/ArtistsSearchComponents/Pagination';
import RiEmotionUnhappyFill from '~icons/ri/emotion-unhappy-fill';
import RiInformationLine from '~icons/ri/information-line';
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

  return (
    <>
      <NextSeo
        title="Artists"
        description="Discover wonderful creators using our filters or suggest an artist yourself!"
      />
      <section className="relative m-auto flex h-fit w-full max-w-7xl flex-col items-start justify-center gap-5 p-3 pt-[100px] md:p-0 md:px-10 md:pt-32 lg:grid lg:grid-cols-4 lg:px-0">
        <div className="w-full lg:sticky lg:top-8">
          <ArtistsSearch onSearchStringChanges={setSearchString} />
        </div>
        <section className="col-span-3 flex w-full flex-col gap-5 md:p-1">
          {searchFilter.sortBy.toLocaleLowerCase() === 'trending' && (
            <div className="bg-dot-amber/10 flex h-[52px] flex-row items-center gap-3 rounded-xl p-3 px-5 text-sm md:text-base">
              <RiInformationLine className="text-dot-amber text-xl" />
              Showing trending artists with more than 300 followers
            </div>
          )}
          <div className="flex flex-col divide-y divide-dot-secondary overflow-hidden rounded-xl md:gap-3 md:divide-none">
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
