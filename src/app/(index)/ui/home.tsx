'use client';

import { Tabs } from '@/shared/types/tabs';
import { twJoin } from 'tailwind-merge';
import { Artist } from '@/shared/types/artist';
import { PinnedArtists } from '../components/pinned-artists';
import { ArtistsViewer } from '../components/artists-viewer';
import { HTMLAttributes, useEffect, useState } from 'react';
import useArtistStore from '@/shared/hooks/use-artist-store';
import usePinnedArtistStore from '@/shared/hooks/use-pinned-artist-store';
import useSearchStore, {
  parseSearchFilters,
} from '@/shared/hooks/use-search-store';
import { useRouter } from 'next/navigation';
import { $API } from '@/shared/utils/dotcreators-api';
import { Response } from '@/shared/types/response';
import { Search } from '@/shared/ui/search';
import { ModalWrapper } from '@/shared/ui/modal';
import { ArtistProfile } from '@/shared/ui/artist-profile';

function Home({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<Tabs>('profile');
  const [artistsData, setArtistsData] = useState<Response<Artist[]> | null>(
    null
  );

  const {
    selectedArtist,
    setSelectedArtist,
    setArtistsData: setArtistsStoreData,
  } = useArtistStore();
  const { pinnedArtists } = usePinnedArtistStore();
  const router = useRouter();
  const [isFiltersInitialized, setIsFiltersInitialized] =
    useState<boolean>(false);

  const {
    page,
    perPage,
    country,
    q,
    sortBy,
    tags,
    setTotalItems,
    setTotalPages,
    setFilters,
  } = useSearchStore();

  useEffect(() => {
    setFilters(parseSearchFilters(new URLSearchParams(window.location.search)));
    setIsFiltersInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedArtist && window.matchMedia('(max-width: 1023px)').matches) {
      setIsModalOpened(true);
    } else {
      setIsModalOpened(false);
    }
  }, [selectedArtist]);

  useEffect(() => {
    if (!isFiltersInitialized) return;

    let isCancelled = false;

    async function getArtistsProfilesPaginated() {
      setArtistsData(null);

      const query = new URLSearchParams();
      query.append('page', page.toString());
      query.append('perPage', perPage.toString());
      query.append('sortBy', sortBy.toString());

      if (q) query.append('username', q);
      if (country)
        query.append('country', country.toString().toLocaleLowerCase());
      if (tags && Array.isArray(tags)) {
        tags.forEach(tag =>
          query.append('tags', tag.toLowerCase().replace(/ /g, ''))
        );
      }

      try {
        const nextSearch = `?${query.toString()}`;
        if (window.location.search !== nextSearch) {
          router.replace(nextSearch, { scroll: false });
        }

        const a = await $API.getArtistsPaginated({
          q: q ?? undefined,
          page: page ?? undefined,
          country: country ?? undefined,
          perPage: perPage ?? undefined,
          sortBy: sortBy ?? undefined,
          tags: tags ?? undefined,
        });

        if (isCancelled) return;

        if (a.items && !a.errors) {
          setArtistsData(a);
          setTotalItems(a.totalItems);
          setTotalPages(a.totalPages);
          setSelectedTab('profile');
          if (!window.matchMedia('(max-width: 1023px)').matches) {
            setSelectedArtist(a.items[0] ?? null);
          }
          setArtistsStoreData(a.items);
        } else {
          setArtistsData(null);
        }
        setIsLoading(false);
      } catch (error) {
        if (isCancelled) return;
        console.error(error);
        setArtistsData(null);
        setIsLoading(false);
      }
    }

    getArtistsProfilesPaginated();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page, tags, sortBy, country, perPage, router, isFiltersInitialized]);

  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsLaptop(mediaQuery.matches);

    const handleResize = () => {
      setIsLaptop(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLaptop) setSelectedArtist(artistsData?.items[0] ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLaptop]);

  return (
    <div
      className={twJoin(
        'relative flex w-full flex-col gap-3',
        'laptop:grid-cols-2 laptop:grid laptop:max-w-[1280px] laptop:w-ffull',
        'laptop:mb-5 laptop:mx-auto laptop:gap-5',
        className
      )}
      {...props}
    >
      <ModalWrapper
        isShowed={isModalOpened}
        onClose={() => {
          setIsModalOpened(false);
          setSelectedArtist(null);
        }}
      >
        {selectedArtist && (
          <ArtistProfile.Detailed
            data={selectedArtist}
            className="overflow-hidden rounded-xl"
          />
        )}
      </ModalWrapper>

      <PinnedArtists
        data={pinnedArtists}
        className={twJoin('px-3 pt-3', 'laptop:mx-5 laptop:px-0')}
      />

      <section
        className={twJoin(
          'flex flex-col gap-3 px-3',
          'laptop:pr-0 laptop:pl-5 laptop:gap-5'
        )}
      >
        <Search
          key={isFiltersInitialized ? 'initialized' : 'default'}
          className={twJoin('bg-black-01')}
        />
        <div className="flex w-full flex-col">
          <ArtistsViewer.Default
            data={artistsData}
            selectedArtist={selectedArtist}
          />
          <Search.Pagination />
        </div>
      </section>

      <ArtistsViewer.Detailed
        data={selectedArtist}
        isLoading={isLoading}
        selectedTab={selectedTab}
        onTabsSelected={setSelectedTab}
        className={twJoin('hidden px-3', 'laptop:flex laptop:pr-5 laptop:pl-0')}
      />
    </div>
  );
}

export { Home };
