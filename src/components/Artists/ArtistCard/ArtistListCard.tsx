import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiExternalLinkLine from '~icons/ri/external-link-line';
import Link from 'next/link';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import useSWR from 'swr';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { countryCodes } from '@/utils/CountryCode';
import { searchTagsArray } from '@/utils/Tags';
import RiLineChartFill from '~icons/ri/line-chart-fill';
import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
import { TrendGraph } from '../TrendGraph';
import { ImageLoader } from '@/components/Other/ImageLoader';
import CreateLinks from '@/components/Other/CreateLinks';

interface Props {
  artist: ArtistProfile;
  className?: string;
}

export const ArtistListCard: FC<Props> = props => {
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [artistTrends, setArtistTrends] = useState<ArtistTrend[] | undefined>(
    undefined
  );

  const { data, error } = useSWR<{
    status: string;
    response: ArtistTrend[];
  }>(
    isOpen
      ? `${process.env.API_URL}trends/search?twitterUserId=${props.artist.twitterUserId}&perPage=7&page=1`
      : null,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  useEffect(() => {
    if (data) {
      setArtistTrends(data.response);
      setTrendsLoading(false);
    }
    if (error) console.error('Error fetching artist trends:', error);
  }, [data, error]);

  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section
        key={props.artist.twitterUserId}
        onClick={() => (!isOpen ? handleToggle() : '')}
        className={classNames(
          'group/main flex h-full w-full flex-col justify-between gap-5 overflow-hidden bg-dot-primary transition-transform duration-200 ease-in-out md:rounded-2xl md:hover:bg-dot-secondary',
          props.className,
          {
            'md:hover:cursor-default': isOpen,
            'md:hover:cursor-pointer': !isOpen,
            'bg-dot-secondary': isOpen,
          }
        )}
      >
        <div
          className={classNames(
            'flex min-h-[51px] w-full flex-row items-center justify-between p-2 px-3 md:min-h-max md:px-5',
            { hidden: isOpen, block: !isOpen }
          )}
        >
          <div
            className={classNames('flex flex-row items-center gap-2 md:gap-4')}
          >
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
                    'h-[24px] w-[24px] transition-opacity duration-200 ease-in-out group-hover:opacity-50 group-hover:blur-sm md:h-max md:w-max'
                  )}
                />
              </div>
              <RiExternalLinkLine className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-sm opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100" />
            </Link>
            <div className={classNames('flex flex-row items-center gap-4')}>
              <h1
                className={classNames(
                  'flex max-w-32 flex-row items-center gap-2 truncate text-ellipsis font-hubot-sans font-black md:max-w-52 lg:max-w-96'
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
                <p className="truncate text-ellipsis">{props.artist.name}</p>
              </h1>
              <p
                className={classNames(
                  'hidden truncate text-ellipsis text-zinc-400 md:block md:max-w-32 lg:max-w-48'
                )}
              >
                @{props.artist.username}
              </p>
            </div>
          </div>
          <div className="flex translate-x-10 select-none flex-row items-center justify-end gap-5 transition-transform duration-200 ease-in-out md:group-hover/main:translate-x-0">
            <div
              className={classNames(
                'flex min-w-8 flex-row items-center justify-end gap-2'
              )}
            >
              <h1>{formatValue(props.artist.followersCount)}</h1>
              <p className="text-zinc-400">followers</p>
            </div>
            <div
              className={classNames(
                'hidden min-w-8 flex-row items-center justify-end gap-2 md:flex'
              )}
            >
              <h1>{formatValue(props.artist.tweetsCount)}</h1>
              <p className="text-zinc-400">posts</p>
            </div>
            <RiArrowDownSLine />
          </div>
        </div>

        {/* MoreInfo */}
        {isOpen && (
          <div
            className={classNames('test relative flex flex-col', {
              'justify-items-end gap-3': !props.artist.images.banner,
              'gap-5': props.artist.images.banner,
            })}
          >
            {props.artist.images.banner && (
              <>
                <div className="absolute w-full">
                  <ImageLoader
                    src={props.artist.images.banner + '/mobile	'}
                    alt={'Profile Banner for ' + props.artist.username}
                    width={600}
                    height={200}
                    unoptimized={true}
                    hideLoader={true}
                    className="z-10 h-44 w-full object-cover opacity-50 blur-3xl"
                  />
                </div>
                <div className="relative cursor-pointer" onClick={handleToggle}>
                  <ImageLoader
                    src={props.artist.images.banner + '/1500x500	'}
                    alt={'Profile Banner for ' + props.artist.username}
                    width={600}
                    height={200}
                    unoptimized={true}
                    className="h-24 w-full object-cover md:h-40"
                  />
                </div>
              </>
            )}
            <div
              className={classNames('flex flex-row items-center gap-1.5', {
                'absolute right-3 top-2.5 z-20': props.artist.images.banner,
                'mx-5 mt-5 place-self-end': !props.artist.images.banner,
              })}
            >
              <Link
                href={`/artist/${props.artist.username}`}
                className={classNames(
                  'h-fit rounded-xl bg-dot-primary/50 p-2 backdrop-blur-md transition-colors duration-200 ease-in-out md:hover:bg-dot-primary'
                )}
              >
                <RiArrowRightUpLine />
              </Link>
              <button
                onClick={handleToggle}
                className={classNames(
                  'h-fit rounded-xl bg-dot-primary/50 p-2 backdrop-blur-md transition-colors duration-200 ease-in-out md:hover:bg-dot-primary'
                )}
              >
                <RiArrowDownSLine className="rotate-180" />
              </button>
            </div>
            <div
              className={classNames(
                'flex w-full flex-col gap-3 px-3 pb-3 md:gap-5 md:px-5 md:pb-5'
              )}
            >
              <div className="z-20 flex flex-row items-center justify-between gap-3">
                <div className="z-20 flex w-full flex-row items-center justify-between gap-3">
                  <div className="flex flex-row items-center gap-3">
                    <ImageLoader
                      alt={'Avatar for ' + props.artist.username}
                      src={props.artist.images.avatar}
                      width={75}
                      height={75}
                      className={
                        'absolute h-12 w-12 rounded-xl md:h-max md:w-max'
                      }
                    />
                    <div className="w-fit">
                      <p className="line-clamp-2 block max-w-32 truncate rounded-md font-hubot-sans text-base md:max-w-96 md:text-xl">
                        {props.artist.name}
                      </p>
                      <div className="flex flex-col gap-1 text-sm text-zinc-400 md:flex-row md:text-base">
                        <Link
                          href={props.artist.url}
                          target="__blank"
                          className="transition-colors duration-150 ease-in-out md:hover:text-dot-link-primary"
                        >
                          @{props.artist.username}
                        </Link>
                        <div className="hidden flex-row gap-1 md:flex">
                          {props.artist.website && (
                            <>
                              <p>•</p>
                              <Link
                                href={props.artist.website}
                                target="__blank"
                                className="max-w-48 truncate transition-colors duration-150 ease-in-out md:hover:text-dot-link-primary"
                              >
                                {props.artist.website.replace(
                                  /^(https?:\/\/)?(www\.)?/,
                                  ''
                                )}
                              </Link>
                            </>
                          )}
                          <div className="hidden flex-row items-center gap-1 lg:flex">
                            <p>•</p>
                            <p className="">
                              Account created{' '}
                              {new Date(
                                props.artist.joinedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-3 rounded-xl md:gap-5">
                    <div>
                      <h1 className="hidden font-hubot-sans text-2xl font-black leading-tight md:block">
                        {props.artist.followersCount}
                      </h1>

                      <h1 className="block font-hubot-sans text-xl font-black leading-tight md:hidden">
                        {formatValue(props.artist.followersCount)}
                      </h1>

                      <p className="text-sm text-zinc-400 md:text-base">
                        followers
                      </p>
                    </div>
                    <div>
                      <h1 className="hidden font-hubot-sans text-2xl font-black leading-tight md:block">
                        {props.artist.tweetsCount}
                      </h1>

                      <h1 className="block font-hubot-sans text-xl font-black leading-tight md:hidden">
                        {formatValue(props.artist.tweetsCount)}
                      </h1>
                      <p className="text-sm text-zinc-400 md:text-base">
                        tweets
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {props.artist.bio && (
                <p className="whitespace-pre-line text-sm md:text-base">
                  <CreateLinks text={props.artist.bio} />
                </p>
              )}
              <AnimatePresence>
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.3 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  {trendsLoading ? (
                    <div className="flex w-full flex-row">
                      <div className="h-[204px] w-full animate-pulse rounded-2xl bg-dot-tertiary/50" />
                    </div>
                  ) : artistTrends && artistTrends.length !== 0 ? (
                    <section className="flex flex-col gap-3">
                      <div className="z-20 flex w-full flex-col justify-between gap-3 text-xs lg:flex-row">
                        <TrendGraph
                          artistInfo={props.artist}
                          trendData={artistTrends}
                          trendBy="followers"
                          range={7}
                          isSmall={true}
                        />
                        <TrendGraph
                          artistInfo={props.artist}
                          trendData={artistTrends}
                          trendBy="tweets"
                          range={7}
                          isSmall={true}
                        />
                      </div>

                      {/* Uncomment later */}
                      {/* <Link
                        href={`/artist/${props.artist.username}`}
                        className="flex flex-row items-center justify-between rounded-xl bg-dot-tertiary/50 p-3 px-5 text-zinc-400 transition-colors duration-200 ease-in-out md:gap-1 md:hover:bg-dot-quaternary/50 md:hover:text-dot-white"
                      >
                        <p className="inline-flex items-center gap-3 text-sm md:gap-2">
                          <RiLineChartFill className="block w-8 text-base" />
                          Growing trend statistics more than week available on
                          the artist profile page
                        </p>
                        <RiArrowRightUpLine className="block w-8 text-base" />
                      </Link> */}
                    </section>
                  ) : (
                    <div className="flex h-[104px] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-dot-tertiary/50 px-10 text-zinc-400 md:flex-row">
                      <RiLineChartFill className="w-8 text-xl" />
                      <p className="text-start text-sm md:text-base">
                        We are still collecting information about author's
                        growth trend.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-row flex-wrap gap-2">
                {props.artist.country && props.artist.country !== undefined && (
                  <div className="flex flex-row items-center gap-2 rounded-md bg-dot-tertiary p-2 px-4 text-sm">
                    <Image
                      alt={`${props.artist.country}`}
                      src={`https://flagcdn.com/${props.artist.country.toLowerCase()}.svg`}
                      width={24}
                      height={20}
                      className={'h-4 w-6 rounded-sm'}
                    />
                    <p className=" ">
                      {countryCodes.map(country => {
                        if (
                          props.artist.country ===
                          country.value.toLocaleLowerCase()
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
                          className="rounded-md bg-dot-tertiary p-2 px-4 text-sm transition-colors duration-200 ease-in-out"
                        >
                          {searchTagsArray.map(_tag => {
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
                  <div className="flex flex-row items-center gap-2 rounded-md bg-dot-tertiary p-2 px-4 text-sm">
                    <p className="text-zinc-400">
                      Profile updated{' '}
                      {new Date(props.artist.updatedAt).toLocaleDateString() +
                        ' ' +
                        new Date(props.artist.updatedAt).toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
