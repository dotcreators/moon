'use client';

import { Tabs } from '@/shared/types/tabs';
import { twJoin } from 'tailwind-merge';
import { Artist } from '@/shared/types/artist';
import { PinnedArtists } from '../components/pinned-artists';
import { ArtistsViewer } from '../components/artists-viewer';
import { HTMLAttributes, useEffect, useState } from 'react';
import useArtistStore from '@/shared/hooks/use-artist-store';
import usePinnedArtistStore from '@/shared/hooks/use-pinned-artist-store';
import useSearchStore from '@/shared/hooks/use-search-store';
import { useRouter } from 'next/navigation';
import { $API } from '@/shared/utils/dotcreators-api';
import { Response } from '@/shared/types/response';

function Home({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
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
  // const params: SearchParams = useParams();

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

  useEffect(() => {
    async function getArtistsProfilesPaginated() {
      setArtistsData(null);

      const query = new URLSearchParams();
      query.append('page', page.toString());
      query.append('perPage', perPage.toString());
      query.append('sortBy', sortBy.toString());

      if (q) query.append('username', q);
      if (country) query.append('country', country.toString());
      if (tags && Array.isArray(tags)) {
        tags.forEach(tag =>
          query.append('tags', tag.toLowerCase().replace(/ /g, ''))
        );
      }

      try {
        router.push(`?${query.toString()}`, { scroll: false });

        const a = await $API.getArtistsPaginated({
          q: q ?? undefined,
          page: page ?? undefined,
          country: country ?? undefined,
          perPage: perPage ?? undefined,
          sortBy: sortBy ?? undefined,
          tags: tags ?? undefined,
        });

        if (a.items && !a.errors) {
          setArtistsData(a);
          setTotalItems(a.totalItems);
          setTotalPages(a.totalPages);
          setSelectedTab('profile');
          setSelectedArtist(a.items[0]);
          setArtistsStoreData(a.items);
        } else {
          setArtistsData(null);
        }
      } catch (error) {
        console.error(error);
        setArtistsData(null);
      }
    }

    getArtistsProfilesPaginated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page, tags, sortBy, country, perPage, router]);

  return (
    <div
      className={twJoin(
        'relative mx-auto mb-5 grid max-w-[1280px] grid-cols-2 px-5',
        className
      )}
      {...props}
    >
      <PinnedArtists data={pinnedArtists} />
      <ArtistsViewer.Default
        data={artistsData}
        selectedArtist={selectedArtist}
      />
      <ArtistsViewer.Detailed
        data={selectedArtist}
        selectedTab={selectedTab}
        onTabsSelected={setSelectedTab}
      />
    </div>
  );
}

export { Home };
