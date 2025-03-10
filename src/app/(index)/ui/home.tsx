'use client';

import useArtistStore from '@/app/shared/hooks/use-artist-store';
import { Artist } from '@/app/shared/types/artist';
import { Response } from '@/app/shared/types/response';
import { ArtistProfile } from '@/app/shared/ui/artist-profile';
import { Search } from '@/app/shared/ui/search';
import { HTMLAttributes, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';

const API_URL = process.env.API_URL;

function Home({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [artistsData, setArtistsData] = useState<Artist[] | null>(null);
  const { selectedArtist } = useArtistStore();

  useEffect(() => {
    async function getArtistsData() {
      const r = await fetch(
        `${API_URL}/artists/search?page=1&perPage=55&sortBy=followers`
      );
      const data: Response<Artist[]> = await r.json();

      if (data.items && !data.errors) {
        setArtistsData(data.items);
      }
    }

    getArtistsData();
  }, []);

  const handleOpen = (id: string): boolean => {
    return selectedArtist && id === selectedArtist.id ? true : false;
  };

  return (
    <div
      className={twJoin(
        'relative mx-auto flex w-full max-w-[750px] flex-col px-5 pb-5',
        className
      )}
      {...props}
    >
      <Search className="bg-black-01 sticky top-0 z-[2] py-5" />
      <div className="flex w-full flex-col gap-2">
        {artistsData &&
          artistsData.map(item => (
            <ArtistProfile
              key={item.id}
              data={item}
              isOpen={handleOpen(item.id)}
            />
          ))}
      </div>
    </div>
  );
}

export { Home };
