'use client';

import useArtistStore from '@/app/shared/hooks/use-artist-store';
import { Artist } from '@/app/shared/types/artist';
import { Response } from '@/app/shared/types/response';
import { ArtistProfile } from '@/app/shared/ui/artist-profile';
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
        'mx-auto flex max-w-[900px] flex-col gap-[16px] p-5',
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
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
