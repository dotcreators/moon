import classNames from 'classnames';
import Image from 'next/image';
import { FC, useState } from 'react';
import RiImage2Line from '~icons/ri/image-2-line';
import RiUserHeartLine from '~icons/ri/user-heart-line';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiExternalLinkLine from '~icons/ri/external-link-line';
import Link from 'next/link';
import RiLoader5Line from '~icons/ri/loader-5-line';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ImageLoader } from '../ImageLoader';

interface Props {
  place: number;
  artist: ArtistProfile;
  isSmall: boolean;
  className?: string;
}

export const ArtistListCard: FC<Props> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'group/main animation-all flex w-full flex-col justify-between gap-5 overflow-hidden bg-dark-inner p-2 px-5 duration-200 ease-in-out md:hover:cursor-pointer md:hover:bg-dark-inner-hover',
          props.className,
          { 'rounded-2xl ': !props.isSmall }
        )}
      >
        <div className="flex w-full flex-row items-center justify-between">
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
                  'flex max-w-96 flex-row items-center gap-2 truncate text-ellipsis font-hubot-sans font-black',
                  { 'text-sm': props.isSmall }
                )}
              >
                {props.artist.country && (
                  <Image
                    alt={`${props.artist.country}`}
                    src={`https://flagcdn.com/${props.artist.country.toLowerCase()}.svg`}
                    width={24}
                    height={20}
                    className={'h-5 w-7 rounded-md'}
                  />
                )}
                {props.artist.name}
              </h1>
              <p
                className={classNames('truncate text-ellipsis text-zinc-400', {
                  'text-sm': props.isSmall,
                })}
              >
                @{props.artist.username}
              </p>
            </div>
          </div>
          <div className="flex translate-x-10 flex-row items-center justify-end gap-5 transition-transform duration-200 ease-in-out md:group-hover/main:translate-x-0">
            <div
              className={classNames(
                'flex flex-row items-center justify-end gap-2',
                { 'min-w-20': !props.isSmall, 'min-w-16': [props.isSmall] }
              )}
            >
              <h1 className={classNames('', { 'text-sm': props.isSmall })}>
                {formatValue(props.artist.followersCount)}
              </h1>
              <p className="text-zinc-400">followers</p>
            </div>
            <div
              className={classNames(
                'flex flex-row items-center justify-end gap-2',
                { 'min-w-20': !props.isSmall, 'min-w-16': [props.isSmall] }
              )}
            >
              <h1 className={classNames('', { 'text-sm': props.isSmall })}>
                {formatValue(props.artist.tweetsCount)}
              </h1>
              <p className="text-zinc-400">posts</p>
            </div>
            <RiArrowDownSLine />
          </div>
        </div>

        {/* MoreInfo */}
        <div className={classNames({ hidden: !isOpen, block: isOpen })}>
          <ImageLoader
            alt={'Avatar for ' + props.artist.username}
            src={props.artist.images.avatar}
            width={75}
            height={75}
            className={'rounded-xl'}
          />
        </div>
      </section>
    </>
  );
};
