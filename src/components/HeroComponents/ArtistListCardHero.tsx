import classNames from 'classnames';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ImageLoader } from '../ImageLoader';
import useSWR from 'swr';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { ArtistListCardTrendGraph } from '../ArtistsSearchComponents/ArtistListCardTrendGraph';
import { countryCodes } from '@/utils/CountryCode';
import { searchTagsArray } from '@/utils/Tags';
import RiLineChartFill from '~icons/ri/line-chart-fill';
import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
import CreateLinks from '../CreateLinks';

interface Props {
  artist: ArtistProfile;
  className?: string;
}

export const ArtistListCardHero: FC<Props> = props => {
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [artistTrends, setArtistTrends] = useState<ArtistTrend[] | undefined>(
    undefined
  );

  const { data, error } = useSWR<{
    status: string;
    response: ArtistTrend[];
  }>(
    `${process.env.API_URL}trends/${props.artist.userId}?range=7`,
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

  return (
    <>
      <section
        onClick={() => (!isOpen ? setIsOpen(!isOpen) : '')}
        className={classNames(
          'group/main flex w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl bg-dot-primary transition-transform duration-200 ease-in-out',
          props.className
        )}
      >
        <div className={classNames('relative flex flex-col gap-3 md:gap-5')}>
          {props.artist.images.banner !== undefined && (
            <>
              <div className="absolute w-full">
                <ImageLoader
                  src={props.artist.images.banner + '/mobile	'}
                  alt={'Profile Banner for ' + props.artist.username}
                  width={600}
                  height={200}
                  unoptimized={true}
                  hideLoader={true}
                  className="z-10 h-24 w-full object-cover opacity-50 blur-3xl md:h-48"
                />
              </div>
              <div className="relative">
                <ImageLoader
                  src={props.artist.images.banner + '/1500x500	'}
                  alt={'Profile Banner for ' + props.artist.username}
                  width={600}
                  height={200}
                  unoptimized={true}
                  className="h-24 w-full object-cover md:h-48"
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
          </div>

          <div className="flex w-full flex-col gap-3 px-3 pb-3 md:gap-5 md:px-5 md:pb-5">
            <div className="z-20 flex flex-row items-center justify-between gap-3">
              <div className="flex flex-row items-center gap-3">
                <ImageLoader
                  alt={'Avatar for ' + props.artist.username}
                  src={props.artist.images.avatar}
                  width={75}
                  height={75}
                  className={'absolute h-12 w-12 rounded-xl md:h-max md:w-max'}
                />
                <div className="w-fit">
                  <p className="flex w-fit flex-row items-center gap-2 rounded-md font-hubot-sans text-base md:text-xl">
                    {props.artist.name}
                  </p>
                  <div className="flex flex-col gap-1 text-sm text-zinc-400 md:flex-row md:text-base">
                    <Link
                      href={props.artist.url}
                      target="__blank"
                      className="max-w-32 transition-colors duration-150 ease-in-out md:max-w-52 md:hover:text-dot-link-primary lg:max-w-96"
                    >
                      @{props.artist.username}
                    </Link>
                    <div className="hidden flex-row gap-1 lg:flex">
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
                      <p>•</p>
                      <p className="">
                        Account created{' '}
                        {new Date(props.artist.joinedAt).toLocaleDateString()}
                      </p>
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
                  <p className="text-sm text-zinc-400 md:text-base">tweets</p>
                </div>
              </div>
            </div>

            {props.artist.bio && (
              <p className="whitespace-pre-line text-sm md:text-base">
                <CreateLinks text={props.artist.bio} />
              </p>
            )}

            {trendsLoading ? (
              <div className="flex w-full flex-row">
                <div className="h-[204px] w-full animate-pulse rounded-2xl bg-dot-tertiary/50" />
              </div>
            ) : artistTrends && artistTrends.length !== 0 ? (
              <div className="flex w-full flex-col justify-between gap-3 text-xs md:gap-5 lg:flex-row">
                <>
                  <ArtistListCardTrendGraph
                    key={'followersGraph'}
                    artistInfo={props.artist}
                    trendBy="followers"
                    range={7}
                    trendData={artistTrends}
                  />
                  <ArtistListCardTrendGraph
                    key={'tweetsGraph'}
                    artistInfo={props.artist}
                    trendBy="tweets"
                    range={7}
                    trendData={artistTrends}
                  />
                </>
              </div>
            ) : (
              <div className="flex h-[104px] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-dot-tertiary/50 px-10 text-zinc-400 md:flex-row">
                <RiLineChartFill className="w-8 text-xl" />
                <p className="text-start text-sm md:text-base">
                  Sorry, but there is currently no trend data recorded for this
                  artist.
                </p>
              </div>
            )}
            {props.artist.tags !== undefined &&
              props.artist.tags.length !== 0 && (
                <div className="flex flex-row flex-wrap gap-2">
                  {props.artist.tags.map((tag, index) => (
                    <p
                      key={index}
                      className="rounded-md bg-dot-secondary p-2 px-4 text-sm transition-colors duration-200 ease-in-out"
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
                  {props.artist.country &&
                    props.artist.country !== undefined && (
                      <div className="flex flex-row items-center gap-2 rounded-md bg-dot-secondary p-2 px-4 text-sm">
                        <Image
                          alt={`${props.artist.country}`}
                          src={`https://flagcdn.com/${props.artist.country.toLowerCase()}.svg`}
                          width={24}
                          height={20}
                          className={'h-4 w-6 rounded-sm'}
                        />
                        <p>
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
                </div>
              )}
          </div>
        </div>
      </section>
    </>
  );
};
