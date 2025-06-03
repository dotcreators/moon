import { PinnedArtist } from '@/shared/types/pinned-artist';
import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';
import usePinnedArtistStore from '@/shared/hooks/use-pinned-artist-store';
import ImageLoader from '../../image-loader';
import useArtistStore from '@/shared/hooks/use-artist-store';
import { $API } from '@/shared/utils/dotcreators-api';

type ArtistProfilePinnedProps = HTMLAttributes<HTMLDivElement> & {
  data: PinnedArtist;
};

function ArtistProfilePinned({
  className,
  data,
  ...props
}: ArtistProfilePinnedProps) {
  const { removePinnedArtist } = usePinnedArtistStore();
  const { selectedArtist, setSelectedArtist } = useArtistStore();
  const { updatePinnedArtist, savePinnedArtists } = usePinnedArtistStore();

  const handlePinnedProfileClick = async (twitterUserId: string) => {
    if (selectedArtist && selectedArtist.twitterUserId !== twitterUserId) {
      setSelectedArtist(null);
      const p = await $API.getArtistProfile(twitterUserId);
      if (p) {
        setSelectedArtist(p);
        updatePinnedArtist({
          id: p.id,
          images: p.images,
          twitterUserId: p.twitterUserId,
          username: p.username,
          name: p.name ?? undefined,
        });
        savePinnedArtists();
      }
    }
  };

  return (
    <div className="group relative min-w-max cursor-pointer">
      <button
        onClick={() => removePinnedArtist(data)}
        className={twJoin(
          'bg-red-01 absolute -top-2 -right-2 z-[2] flex rounded-full p-1',
          'border-black-01 cursor-pointer border-4',
          'transform-gpu transition-all duration-100 ease-in-out',
          selectedArtist && selectedArtist.id === data.id
            ? 'scale-100'
            : 'scale-0 group-hover:scale-100'
        )}
      >
        <Icon ico="i-ri-close-line" />
      </button>
      <article
        onClick={() => handlePinnedProfileClick(data.twitterUserId)}
        className={twJoin(
          'bg-black-02 relative z-[1] flex flex-row items-center gap-2 p-3 px-4',
          'overflow-hidden rounded-xl border border-transparent',
          'group-hover:bg-black-03 group-hover:border-white-01/20 transition-colors duration-200 ease-in-out',
          selectedArtist &&
            selectedArtist.id === data.id &&
            'border-white-01/20',
          className
        )}
        {...props}
      >
        <div className="absolute left-0 -z-[1] opacity-75 blur-3xl">
          <ImageLoader
            src={data.images.avatar}
            alt={''}
            width={25}
            height={25}
            variant="03"
            className="h-full w-[100px] min-w-[100px]"
          />
        </div>
        <ImageLoader
          src={data.images.avatar}
          alt={''}
          width={91}
          height={91}
          variant="03"
          className="h-[36px] min-h-[36px] w-[36px] min-w-[36px] rounded-lg"
        />
        <div className="flex flex-col">
          <p className="font-mona-sans max-w-[135px] truncate text-sm leading-tight text-ellipsis">
            {data.name}
          </p>
          <p className="text-gray-01/80 flex max-w-[135px] flex-row items-center gap-1 truncate text-xs text-ellipsis">
            @{data.username}
          </p>
        </div>
      </article>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-black-02 flex h-[60px] w-[150px] flex-row items-center gap-2 rounded-xl p-3 px-4">
      <div className="bg-black-03 h-[36px] w-[36px] animate-pulse rounded-lg" />
      <div className="flex animate-pulse flex-col gap-1">
        <div className="bg-black-03 h-[15px] w-[60px] rounded-full" />
        <div className="bg-black-03 h-[15px] w-[30px] rounded-full" />
      </div>
    </div>
  );
}

ArtistProfilePinned.Skeleton = Skeleton;

export default ArtistProfilePinned;
