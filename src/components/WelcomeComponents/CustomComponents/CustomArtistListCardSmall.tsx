import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
import RiExternalLinkLine from '~icons/ri/external-link-line';
import Link from 'next/link';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ImageLoader } from '@/components/ImageLoader';
import { useRouter } from 'next/router';

interface Props {
  artist: ArtistProfile;
  className?: string;
}

export const CustomArtistListCardSmall: FC<Props> = props => {
  const router = useRouter();

  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }
  return (
    <>
      <section
        key={props.artist.userId}
        onClick={() => router.push(`/artist/${props.artist.username}`)}
        className={classNames(
          'group/main flex w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl bg-dot-primary transition-transform duration-200 ease-in-out md:hover:cursor-pointer md:hover:bg-dot-secondary',
          props.className
        )}
      >
        <div
          className={classNames(
            'flex w-full flex-row items-center justify-between p-2 px-5'
          )}
        >
          <div className={classNames('flex flex-row items-center gap-4')}>
            <Link
              href={props.artist.url}
              target="_blank"
              className="group relative"
            >
              <div className="relative z-10 overflow-hidden rounded-full">
                <ImageLoader
                  alt={'Avatar for ' + props.artist.username}
                  src={props.artist.images.avatar}
                  width={35}
                  height={35}
                  className={classNames(
                    'transition-opacity duration-200 ease-in-out group-hover:opacity-50 group-hover:blur-sm'
                  )}
                />
              </div>
              <RiExternalLinkLine className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-sm opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100" />
            </Link>
            <div className={classNames('flex flex-row items-center gap-4')}>
              <h1
                className={classNames(
                  'flex max-w-32 flex-row items-center gap-2 truncate text-ellipsis font-hubot-sans font-black'
                )}
              >
                {props.artist.country && (
                  <Image
                    alt={`${props.artist.country}`}
                    src={`https://flagcdn.com/${props.artist.country.toLowerCase()}.svg`}
                    width={24}
                    height={20}
                    className={'rounded-sm'}
                  />
                )}
                {props.artist.name}
              </h1>
              <p
                className={classNames(
                  'max-w-32 truncate text-ellipsis text-zinc-400'
                )}
              >
                @{props.artist.username}
              </p>
            </div>
          </div>
          <div className="flex translate-x-10 select-none flex-row items-center justify-end gap-5 transition-transform duration-200 ease-in-out md:group-hover/main:translate-x-0">
            <div
              className={classNames(
                'flex min-w-16 flex-row items-center justify-end gap-2'
              )}
            >
              <h1>{formatValue(props.artist.followersCount)}</h1>
              <p className="text-zinc-400">followers</p>
            </div>
            <RiArrowRightUpLine />
          </div>
        </div>
      </section>
    </>
  );
};
