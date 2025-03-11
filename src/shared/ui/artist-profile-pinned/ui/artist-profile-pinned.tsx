import { PinnedArtist } from '@/shared/types/pinned-artist';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';
import { Icon } from '@/shared/ui/icon';
import usePinnedArtistStore from '@/shared/hooks/use-pinned-artist-store';

type ArtistProfilePinnedProps = HTMLAttributes<HTMLDivElement> & {
  data: PinnedArtist;
};

function ArtistProfilePinned({
  className,
  data,
  ...props
}: ArtistProfilePinnedProps) {
  const { removePinnedArtist } = usePinnedArtistStore();
  return (
    <div className="group relative min-w-max cursor-pointer">
      <button
        onClick={() => removePinnedArtist(data)}
        className={twJoin(
          'bg-red-01 absolute -top-2 -right-2 z-[2] flex rounded-full p-1',
          'border-black-01 cursor-pointer border-4',
          'scale-0 rotate-45 group-hover:scale-100 group-hover:rotate-0',
          'transform-gpu transition-all duration-100 ease-in-out'
        )}
      >
        <Icon ico="i-ri-close-line" />
      </button>
      <article
        className={twJoin(
          'bg-black-02 relative z-[1] flex flex-row items-center gap-3 p-4 px-6',
          'overflow-hidden rounded-xl',
          'group-hover:bg-black-03 transition-colors duration-200 ease-in-out',
          className
        )}
        {...props}
      >
        <Image
          src={data.images.avatar}
          alt={''}
          width={25}
          height={25}
          draggable={false}
          className="bg-black-03 absolute left-0 -z-[1] h-full w-[100px] opacity-75 blur-3xl"
        />
        <Image
          src={data.images.avatar}
          alt={''}
          width={91}
          height={91}
          draggable={false}
          className="bg-black-03 h-[52px] w-[52px] rounded-xl"
        />
        <div className="flex flex-col">
          <p className="font-hubot max-w-[235px] truncate text-lg leading-tight text-ellipsis">
            {data.name}
          </p>
          <p className="text-gray-01/80 flex max-w-[270px] flex-row items-center gap-1 text-sm">
            @{data.username}
          </p>
        </div>
      </article>
    </div>
  );
}

export default ArtistProfilePinned;
