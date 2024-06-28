import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import Link from 'next/link';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ImageLoader } from '../ImageLoader';
import { countryCodes } from '@/utils/CountryCode';
import { searchTagsArray } from '@/utils/Tags';
import CreateLinks from '../CreateLinks';

interface Props {
  artist: ArtistProfile;
  className?: string;
}

export const ArtistPageCard: FC<Props> = (props) => {
  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }

  return (
    <>
      <div
        className={classNames('test relative flex flex-col  ', {
          'justify-items-end gap-3': !props.artist.images.banner,
          'gap-5': props.artist.images.banner,
        })}
      >
        {props.artist.images.banner && (
          <>
            <div className='absolute w-full'>
              <ImageLoader
                src={props.artist.images.banner + '/mobile'}
                alt={'Profile Banner for ' + props.artist.username}
                width={600}
                height={200}
                unoptimized={true}
                hideLoader={true}
                className='z-10 h-44 w-full object-cover opacity-50 blur-3xl'
              />
            </div>
            <div className='relative'>
              <ImageLoader
                src={props.artist.images.banner + '/1500x500	'}
                alt={'Profile Banner for ' + props.artist.username}
                width={600}
                height={200}
                unoptimized={true}
                className='h-24 md:h-40 w-full object-cover'
              />
            </div>
          </>
        )}
        <div
          className={classNames('flex w-full flex-col gap-5 px-5 pb-5', {
            'mt-5': !props.artist.images.banner,
          })}
        >
          <div className='z-20 flex flex-row items-center justify-between gap-3'>
            <div className='z-20 flex w-full flex-row items-center justify-between gap-3'>
              <div className='z-20 flex w-full flex-row items-center justify-between gap-3'>
                <div className='flex flex-row items-center gap-3'>
                  <ImageLoader
                    alt={'Avatar for ' + props.artist.username}
                    src={props.artist.images.avatar}
                    width={75}
                    height={75}
                    className={
                      'absolute h-12 w-12 rounded-xl md:h-max md:w-max'
                    }
                  />
                  <div className='w-fit '>
                    <p className='block max-w-96 truncate line-clamp-2 rounded-md font-hubot-sans text-base md:text-xl'>
                      {props.artist.name}
                    </p>
                    <div className='flex flex-col gap-1 text-sm text-zinc-400 md:flex-row md:text-base'>
                      <Link
                        href={props.artist.url}
                        target='__blank'
                        className='transition-colors duration-150 ease-in-out md:hover:text-dot-link-primary'
                      >
                        @{props.artist.username}
                      </Link>
                      <div className='hidden flex-row gap-1 md:flex'>
                        {props.artist.website && (
                          <>
                            <p>•</p>
                            <Link
                              href={props.artist.website}
                              target='__blank'
                              className='transition-colors duration-150 ease-in-out md:hover:text-dot-link-primary'
                            >
                              {props.artist.website.replace(
                                /^(https?:\/\/)?(www\.)?/,
                                ''
                              )}
                            </Link>
                          </>
                        )}
                        <p>•</p>
                        <p className=''>
                          Account created{' '}
                          {new Date(props.artist.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row items-center gap-3 rounded-xl md:gap-5'>
                  <div>
                    <h1 className='hidden font-black font-hubot-sans text-2xl leading-tight md:block'>
                      {props.artist.followersCount}
                    </h1>

                    <h1 className='block font-black font-hubot-sans text-xl leading-tight md:hidden'>
                      {formatValue(props.artist.followersCount)}
                    </h1>

                    <p className='text-sm text-zinc-400 md:text-base'>
                      followers
                    </p>
                  </div>
                  <div>
                    <h1 className='hidden font-black font-hubot-sans text-2xl leading-tight md:block'>
                      {props.artist.tweetsCount}
                    </h1>

                    <h1 className='block font-black font-hubot-sans text-xl leading-tight md:hidden'>
                      {formatValue(props.artist.tweetsCount)}
                    </h1>
                    <p className='text-sm text-zinc-400 md:text-base'>tweets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {props.artist.bio && (
            <p className='whitespace-pre-line text-sm md:text-base'>
              <CreateLinks text={props.artist.bio} />
            </p>
          )}

          <div className='flex flex-row gap-2 flex-wrap'>
            {props.artist.country && props.artist.country !== undefined && (
              <div className='flex flex-row items-center gap-2 rounded-md bg-dot-secondary p-2 px-4 text-sm'>
                <Image
                  alt={`${props.artist.country}`}
                  src={`https://flagcdn.com/${props.artist.country.toLowerCase()}.svg`}
                  width={24}
                  height={20}
                  className={'h-4 w-6 rounded-sm '}
                />
                <p>
                  {countryCodes.map((country) => {
                    if (
                      props.artist.country === country.value.toLocaleLowerCase()
                    ) {
                      return country.title;
                    }
                  })}
                </p>
              </div>
            )}

            {props.artist.tags !== undefined &&
              props.artist.tags.length !== 0 && (
                <>
                  {props.artist.tags.map((tag, index) => (
                    <p
                      key={index}
                      className='rounded-md bg-dot-secondary p-2 px-4 text-sm transition-colors duration-200 ease-in-out '
                    >
                      {searchTagsArray.map((_tag) => {
                        if (
                          tag === _tag.toLocaleLowerCase().replace(/ /g, '')
                        ) {
                          return _tag;
                        }
                      })}
                    </p>
                  ))}
                </>
              )}
            {props.artist && (
              <div className='flex flex-row items-center gap-2 rounded-md bg-dot-secondary p-2 px-4 text-sm'>
                <p className='text-zinc-400'>
                  Profile updated{' '}
                  {new Date(props.artist.lastUpdatedAt).toLocaleDateString() +
                    ' ' +
                    new Date(props.artist.lastUpdatedAt).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
