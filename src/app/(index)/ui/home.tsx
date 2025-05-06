'use client';

import useArtistStore from '@/shared/hooks/use-artist-store';
import usePinnedArtistStore from '@/shared/hooks/use-pinned-artist-store';
import { HTMLAttributes, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import ArtistProfilePinned from '@/shared/ui/artist-profile-pinned/ui/artist-profile-pinned';
import { Search } from '@/shared/ui/search';
import { ArtistProfile } from '@/shared/ui/artist-profile';
import { useDotctreatorsAPI } from '@/shared/hooks/use-dotcreators-api';

function Home({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [selectedTab, setSelectedTab] = useState<'profile' | 'trends' | null>(
    null
  );

  const { selectedArtist, setSelectedArtist } = useArtistStore();
  const { pinnedArtists } = usePinnedArtistStore();

  const artistsData = useDotctreatorsAPI({ endpoint: 'getArtistsPaginated' });

  useEffect(() => {
    if (artistsData) {
      setSelectedArtist(artistsData.items[0]);
      setSelectedTab('profile');
    }
  }, [artistsData, setSelectedArtist]);

  const handleOpen = (id: string): boolean => {
    return selectedArtist && id === selectedArtist.id ? true : false;
  };

  return (
    <div
      className={twJoin(
        'relative mx-auto mb-5 grid max-w-[1280px] grid-cols-2 px-5',
        className
      )}
      {...props}
    >
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
        <section className="relative flex flex-row gap-3">
          {!pinnedArtists
            ? Array.from({ length: 5 }).map((_, index) => (
                <ArtistProfilePinned.Skeleton
                  key={'pinned-artist-skeleton-' + index}
                />
              ))
            : pinnedArtists.map(artist => (
                <ArtistProfilePinned key={artist.id} data={artist} />
              ))}
        </section>
      </OverlayScrollbarsComponent>

      <section>
        <Search className="bg-black-01 py-5" />
        <div className="flex w-full flex-col gap-2">
          {!artistsData || !artistsData.items
            ? Array.from({ length: 25 }).map((_, index) => (
                <ArtistProfile.Skeleton key={index} />
              ))
            : artistsData.items.map(item => (
                <ArtistProfile
                  key={item.id}
                  data={item}
                  isOpen={handleOpen(item.id)}
                  withRanking={false}
                />
              ))}
          <Search.Pagination />
        </div>
      </section>
      <section className="sticky top-0 ml-5 flex h-fit flex-col gap-3 py-5">
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
          ) : selectedTab === 'profile' ? (
            <ArtistProfile.Detailed
              key={selectedArtist.id}
              data={selectedArtist!}
              handleClick={() => setSelectedArtist(null)}
              className="overflow-hidden rounded-xl"
            />
          ) : (
            <ArtistProfile.DetailedTrends
              key={selectedArtist.id}
              artistData={selectedArtist!}
              className="overflow-hidden rounded-xl"
            />
          )}
        </div>
      </section>
    </div>
  );
}

export { Home };
