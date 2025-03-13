'use client';

import useArtistStore from '@/shared/hooks/use-artist-store';
import usePinnedArtistStore from '@/shared/hooks/use-pinned-artist-store';
import useSearchStore from '@/shared/hooks/use-search-store';
import { Artist } from '@/shared/types/artist';
import { Response } from '@/shared/types/response';
import { useRouter } from 'next/navigation';
import { HTMLAttributes, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import ArtistProfilePinned from '@/shared/ui/artist-profile-pinned/ui/artist-profile-pinned';
import { Search } from '@/shared/ui/search';
import { ArtistProfile } from '@/shared/ui/artist-profile';

const API_URL = process.env.API_URL;

function Home({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [artistsData, setArtistsData] = useState<Artist[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<'profile' | 'trends' | null>(
    null
  );
  const { selectedArtist, setSelectedArtist } = useArtistStore();
  const {
    page,
    perPage,
    country,
    q,
    sortBy,
    tags,
    setTotalItems,
    setTotalPages,
  } = useSearchStore();
  const { pinnedArtists } = usePinnedArtistStore();
  const router = useRouter();

  useEffect(() => {
    async function getArtistsData() {
      setArtistsData(null);
      const query = new URLSearchParams();

      query.append('page', page.toString());
      query.append('perPage', perPage.toString());
      query.append('sortBy', sortBy.toString());

      if (q) query.append('username', q);
      if (country) query.append('country', country.toString());
      if (tags)
        tags.forEach(tag =>
          query.append('tags', tag.toLowerCase().replace(/ /g, ''))
        );

      router.push(`?${query.toString()}`, { scroll: false });

      const r = await fetch(`${API_URL}/artists/search?${query.toString()}`);
      const data: Response<Artist[]> = await r.json();

      if (data.items && !data.errors) {
        setArtistsData(data.items);
        setSelectedArtist(data.items[0]);
        setSelectedTab('profile');
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
      }
    }

    getArtistsData();
  }, [
    q,
    page,
    tags,
    sortBy,
    router,
    country,
    perPage,
    setTotalItems,
    setTotalPages,
    setSelectedArtist,
  ]);

  const handleOpen = (id: string): boolean => {
    return selectedArtist && id === selectedArtist.id ? true : false;
  };

  const handleClick = () => {
    setSelectedArtist(null);
  };

  return (
    <div
      className={twJoin(
        'relative mx-auto mb-5 grid max-w-[1280px] grid-cols-2 px-5',
        className
      )}
      {...props}
    >
      {pinnedArtists && pinnedArtists.length > 0 && (
        <OverlayScrollbarsComponent
          element="div"
          className="col-span-2 pt-5"
          options={{
            scrollbars: {
              dragScroll: true,
              visibility: 'hidden',
            },
          }}
          defer
        >
          <div className="relative flex flex-row gap-3">
            {pinnedArtists.map(artist => (
              <ArtistProfilePinned key={artist.id} data={artist} />
            ))}
          </div>
        </OverlayScrollbarsComponent>
      )}
      <div>
        <Search className="bg-black-01 sticky top-0 z-[2] py-5" />
        <div className="flex w-full flex-col gap-2">
          {!artistsData
            ? Array.from({ length: 25 }).map((_, index) => (
                <ArtistProfile.Skeleton key={index} />
              ))
            : artistsData.map(item => (
                <ArtistProfile
                  key={item.id}
                  data={item}
                  isOpen={handleOpen(item.id)}
                />
              ))}
          <Search.Pagination />
        </div>
      </div>
      <div className="sticky top-0 ml-5 flex h-fit flex-col gap-3 py-5">
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-row items-center gap-3">
            <div className="divide-black-03 flex w-full flex-row items-center divide-x-2 overflow-hidden rounded-full">
              <button
                onClick={() => setSelectedTab('profile')}
                className={twJoin(
                  'h-12 grow cursor-pointer px-5 py-2',
                  selectedArtist && selectedTab === 'profile'
                    ? 'hover:bg-black-04 bg-black-03'
                    : 'hover:bg-black-03 bg-black-02',
                  'transition-colors duration-200 ease-in-out'
                )}
              >
                Profile
              </button>
              <button
                onClick={() => setSelectedTab('trends')}
                className={twJoin(
                  'h-12 grow cursor-pointer px-5 py-2',
                  selectedArtist && selectedTab === 'trends'
                    ? 'hover:bg-black-04 bg-black-03'
                    : 'hover:bg-black-03 bg-black-02',
                  'transition-colors duration-200 ease-in-out'
                )}
              >
                Trends
              </button>
            </div>
          </div>

          {!selectedArtist ? (
            <ArtistProfile.SkeletonDetailed />
          ) : (
            <ArtistProfile.Detailed
              key={selectedArtist.id}
              data={selectedArtist!}
              handleClick={handleClick}
              className="overflow-hidden rounded-xl"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { Home };
