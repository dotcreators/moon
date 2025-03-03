import { ArtistProfile } from '@/utils/models/ArtistProfile';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import RiEmotionUnhappyFill from '~icons/ri/emotion-unhappy-fill';
import RiInformationLine from '~icons/ri/information-line';
import { useSearchStore } from '@/store/useSearchStore';
import { NextSeo } from 'next-seo';
import { ArtistsSearch } from '@/components/Search/ArtistsSearch';
import { ArtistListCard } from '@/components/Artists/ArtistCard/ArtistListCard';
import ArtistListCardSkeletonLoader from '@/components/Artists/ArtistCard/ArtistListCardSkeletonLoader';
import { Pagination } from '@/components/Search/Pagination';

export default function artists() {
  const [searchString, setSearchString] = useState<string>('');
  const {
    searchFilter,
    updateSearchTotalPage,
    updateSearchIsNext,
    updateSearchPage,
  } = useSearchStore();

  const { data, error } = useSWR<{
    items: ArtistProfile[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }>(
    `${process.env.API_URL}artists/search?${searchString}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  console.log(`${process.env.API_URL}artists/search?${searchString}`);
  console.log(data);

  useEffect(() => {
    if (data) {
      updateSearchTotalPage(data.totalPages);
      updateSearchIsNext(data.page < data.totalPages);
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
            <div className="flex h-[52px] flex-row items-center gap-3 rounded-xl bg-dot-amber/10 p-3 px-5 text-sm md:text-base">
              <RiInformationLine className="text-xl text-dot-amber" />
              Showing trending artists with more than 300 followers
            </div>
          )}
          {searchFilter.sortBy.toLocaleLowerCase() === 'new' && (
            <div className="flex h-[52px] flex-row items-center gap-3 rounded-xl bg-dot-amber/10 p-3 px-5 text-sm md:text-base">
              <RiInformationLine className="text-xl text-dot-amber" />
              Trend information will be available within 7 days
            </div>
          )}
          <div className="flex flex-col divide-y divide-dot-secondary overflow-hidden rounded-xl md:gap-3 md:divide-none">
            {data && !error ? (
              data && data.items.length !== 0 ? (
                data.items.map(artist => (
                  <ArtistListCard key={artist.twitterUserId} artist={artist} />
                ))
              ) : (
                <div className="flex h-16 w-full flex-row items-center justify-center gap-3 rounded-2xl bg-dot-primary p-10 text-zinc-400">
                  <RiEmotionUnhappyFill className="text-xl" />
                  <p>No results found.</p>
                </div>
              )
            ) : (
              [...Array(25)].map((_, index) => (
                <ArtistListCardSkeletonLoader key={index} />
              ))
            )}
          </div>
          <Pagination
            totalResults={data ? data.items.length : 0}
            className={'mt-2'}
          />
        </section>
      </section>
    </>
  );
}
