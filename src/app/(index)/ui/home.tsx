'use client';

import { Tabs } from '@/shared/types/tabs';
import { twJoin } from 'tailwind-merge';
import { Artist } from '@/shared/types/artist';
import { PinnedArtists } from '../components/pinned-artists';
import { ArtistsViewer } from '../components/artists-viewer';
import { useDotcreatorsAPI } from '@/shared/hooks/use-dotcreators-api';
import { HTMLAttributes, useEffect, useState } from 'react';
import useArtistStore from '@/shared/hooks/use-artist-store';
import usePinnedArtistStore from '@/shared/hooks/use-pinned-artist-store';

function Home({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [selectedTab, setSelectedTab] = useState<Tabs>(null);
  const { selectedArtist, setSelectedArtist } = useArtistStore();
  const { pinnedArtists } = usePinnedArtistStore();

  const artistsData = useDotcreatorsAPI<Artist[]>({
    endpoint: 'getArtistsPaginated',
  });

  useEffect(() => {
    if (artistsData) {
      setSelectedArtist(artistsData.items[0]);
      setSelectedTab('profile');
    }
  }, [artistsData, setSelectedArtist]);

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
        onTabsSelected={setSelectedTab}
        selectedTab={selectedTab}
      />
    </div>
  );
}

export { Home };
