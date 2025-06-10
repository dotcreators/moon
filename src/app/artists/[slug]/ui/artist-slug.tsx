'use client';

import { Artist } from '@/shared/types/artist';
import { ArtistProfile } from '@/shared/ui/artist-profile';
import { twJoin } from 'tailwind-merge';

type ArtistSlugProps = { data: Artist };

function ArtistSlug({ data }: ArtistSlugProps) {
  return (
    <div
      className={twJoin(
        'relative flex w-full flex-col gap-3 px-3 pt-3',
        'laptop:mx-auto laptop:gap-5 laptop:px-5 laptop:max-w-[1280px]'
      )}
    >
      <ArtistProfile.Detailed data={data} isSlug={true} />
      <ArtistProfile.DetailedTrends artistData={data} className="rounded-2xl" />
    </div>
  );
}

export { ArtistSlug };
