import { Artist } from '@/shared/types/artist';
import { Response } from '@/shared/types/response';
import { Tabs } from '@/shared/types/tabs';
import { ArtistProfile } from '@/shared/ui/artist-profile';
import { Search } from '@/shared/ui/search';
import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

type ArtistsViewerProps = HTMLAttributes<HTMLDivElement> & {
  data: Response<Artist[]> | null;
  selectedArtist: Artist | null;
};

function ArtistsViewer({
  data,
  selectedArtist,
  className,
  ...props
}: ArtistsViewerProps) {
  const handleOpen = (id: string): boolean => {
    return selectedArtist && id === selectedArtist.id ? true : false;
  };

  return (
    <section className={twJoin(className)} {...props}>
      <Search className="bg-black-01 py-5" />
      <div className="flex w-full flex-col gap-2">
        {!data || !data.items
          ? Array.from({ length: 25 }).map((_, index) => (
              <ArtistProfile.Skeleton key={index} />
            ))
          : data.items.map(item => (
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
  );
}

type ArtistsViewerDetailedProps = HTMLAttributes<HTMLDivElement> & {
  data: Artist | null;
  selectedTab: Tabs;
  onTabsSelected: (selectedTab: Tabs) => void;
};

function ArtistsViewerDetailed({
  data,
  selectedTab = 'profile',
  className,
  onTabsSelected,
  ...props
}: ArtistsViewerDetailedProps) {
  return (
    <section
      className={twJoin(
        'sticky top-0 ml-5 flex h-fit flex-col gap-3 pt-5',
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-row items-center gap-3">
          <div className="divide-black-03 flex w-full flex-row items-center divide-x-2 overflow-hidden rounded-full">
            <button
              onClick={() => onTabsSelected('profile')}
              className={twJoin(
                'h-12 grow cursor-pointer px-5 py-2',
                data && selectedTab === 'profile'
                  ? 'hover:bg-black-04 bg-black-03'
                  : 'hover:bg-black-03 bg-black-02',
                'transition-colors duration-200 ease-in-out'
              )}
            >
              Profile
            </button>
            <button
              onClick={() => onTabsSelected('trends')}
              className={twJoin(
                'h-12 grow cursor-pointer px-5 py-2',
                data && selectedTab === 'trends'
                  ? 'hover:bg-black-04 bg-black-03'
                  : 'hover:bg-black-03 bg-black-02',
                'transition-colors duration-200 ease-in-out'
              )}
            >
              Trends
            </button>
          </div>
        </div>

        {!data ? (
          <ArtistProfile.SkeletonDetailed />
        ) : selectedTab === 'profile' ? (
          <ArtistProfile.Detailed
            key={data.id}
            data={data!}
            className="overflow-hidden rounded-xl"
          />
        ) : (
          <ArtistProfile.DetailedTrends
            key={data.id}
            artistData={data!}
            className="overflow-hidden rounded-xl"
          />
        )}
      </div>
    </section>
  );
}

ArtistsViewer.Default = ArtistsViewer;
ArtistsViewer.Detailed = ArtistsViewerDetailed;

export { ArtistsViewer };
