import { PinnedArtist } from '@/shared/types/pinned-artist';
import ArtistProfilePinned from '@/shared/ui/artist-profile-pinned/ui/artist-profile-pinned';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

type PinnedArtistsProps = HTMLAttributes<HTMLDivElement> & {
  data: PinnedArtist[] | null;
};

function PinnedArtists({ data, className, ...props }: PinnedArtistsProps) {
  return (
    <OverlayScrollbarsComponent
      defer
      element="div"
      className={twJoin('col-span-2', className)}
      options={{
        scrollbars: {
          dragScroll: true,
          visibility: 'hidden',
        },
      }}
      {...props}
    >
      <section className="relative flex flex-row gap-3">
        {!data
          ? Array.from({ length: 5 }).map((_, index) => (
              <ArtistProfilePinned.Skeleton
                key={'pinned-artist-skeleton-' + index}
              />
            ))
          : data.map(artist => (
              <ArtistProfilePinned key={artist.id} data={artist} />
            ))}
      </section>
    </OverlayScrollbarsComponent>
  );
}

export { PinnedArtists };
