import classNames from 'classnames';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import RiImage2Line from '~icons/ri/image-2-line';
import RiUserHeartLine from '~icons/ri/user-heart-line';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiExternalLinkLine from '~icons/ri/external-link-line';
import Link from 'next/link';
import RiLoader5Line from '~icons/ri/loader-5-line';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ImageLoader } from '../ImageLoader';
import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useSWR from 'swr';

interface Props {
  place: number;
  artist: ArtistProfile;
  isSmall: boolean;
  className?: string;
}

export const ArtistListCard: FC<Props> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [artistTrends, setArtistTrends] = useState<
    | { followersCount: number; tweetsCount: number; recordedAt: Date }[]
    | undefined
  >(undefined);

  const { data, error } = useSWR<{
    status: string;
    response: {
      followersCount: number;
      tweetsCount: number;
      recordedAt: Date;
    }[];
  }>(
    isOpen ? `${process.env.API_URL}trends/${props.artist.userId}` : null,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  useEffect(() => {
    if (data) setArtistTrends(data.response);
    if (error) console.error('Error fetching artist trends:', error);
  }, [data, error]);

  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }

  // const CustomTooltip = (
  //   payload:
  // ) => {
  //   if (payload.length) {
  //     return (
  //       <div className="custom-tooltip">
  //         <p className="label">{`asd : ${payload[0].value}`}</p>
  //         {/* <p className="intro">{asd}</p> */}
  //         <p className="desc">Anything you want can be displayed here.</p>
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  const CustomTooltip = (
    active: boolean,
    payload: { name: string; value: number; unit: string }[],
    label: string
  ) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">test</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <section
        onClick={() => (!isOpen ? setIsOpen(!isOpen) : '')}
        className={classNames(
          'group/main animation-all flex w-full flex-col justify-between gap-5 overflow-hidden bg-dark-inner duration-200 ease-in-out md:hover:bg-dark-inner-hover',
          props.className,
          {
            'rounded-2xl ': !props.isSmall,
            'p-5 md:hover:cursor-default': isOpen,
            'p-2 px-5 md:hover:cursor-pointer': !isOpen,
            'bg-dark-inner-hover': isOpen,
          }
        )}
      >
        <div
          className={classNames(
            'flex w-full flex-row items-center justify-between',
            { hidden: isOpen, block: !isOpen }
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
                  'flex max-w-96 flex-row items-center gap-2 truncate text-ellipsis font-hubot-sans font-black'
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
        <div
          className={classNames('flex flex-col gap-5', {
            hidden: !isOpen,
            block: isOpen,
          })}
        >
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-center gap-3">
              <ImageLoader
                alt={'Avatar for ' + props.artist.username}
                src={props.artist.images.avatar}
                width={75}
                height={75}
                className={'rounded-xl'}
              />
              <div>
                <Link
                  href={props.artist.url}
                  target="__blank"
                  className="flex w-fit flex-row items-center gap-2 rounded-md bg-dark-double-inner px-3 py-1 font-hubot-sans text-xl"
                >
                  {props.artist.country &&
                    props.artist.country !== undefined && (
                      <Image
                        alt={`${props.artist.country}`}
                        src={`https://flagcdn.com/${props.artist.country.toLowerCase()}.svg`}
                        width={24}
                        height={20}
                        className={'h-5 w-7 rounded-md'}
                      />
                    )}
                  {props.artist.name}
                  <RiArrowRightUpLine className="-ml-1 text-lg" />
                </Link>
                <p className="text-zinc-400 ">@{props.artist.username}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="h-fit place-self-start"
            >
              <RiArrowDownSLine className="rotate-180 text-xl" />
            </button>
          </div>
          <div className="flex w-full flex-row justify-between gap-5 text-xs">
            {artistTrends && artistTrends.length !== 0 ? (
              <>
                <div className="relative w-full rounded-2xl bg-dark-double-inner p-5">
                  <div className="mb-3 flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                      <h1
                        className={classNames(
                          'flex flex-row items-center gap-1 font-hubot-sans text-2xl leading-[0.8]',
                          {
                            'text-[#a3e635]':
                              props.artist.weeklyFollowersGrowingTrend &&
                              props.artist.weeklyFollowersGrowingTrend > 0.0,
                            'text-[#FA4545]':
                              props.artist.weeklyFollowersGrowingTrend &&
                              props.artist.weeklyFollowersGrowingTrend < 0.0,
                          }
                        )}
                      >
                        <RiArrowDownSLine
                          className={classNames({
                            'rotate-180':
                              props.artist.weeklyFollowersGrowingTrend &&
                              props.artist.weeklyFollowersGrowingTrend > 0.0,
                          })}
                        />
                        {props.artist.weeklyFollowersGrowingTrend &&
                          Math.abs(props.artist.weeklyFollowersGrowingTrend)}
                        %
                      </h1>
                      <p className="text-base text-zinc-400">grow trend</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <h1
                        className={classNames(
                          'flex flex-row items-center gap-1 font-hubot-sans text-2xl leading-[0.8]'
                        )}
                      >
                        {props.artist.followersCount}
                      </h1>
                      <p className="text-base text-zinc-400">followers</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart
                      data={artistTrends}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="followersCount"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={
                              props.artist.weeklyFollowersGrowingTrend &&
                              props.artist.weeklyFollowersGrowingTrend > 0.0
                                ? '#a3e635'
                                : '#FA4545'
                            }
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={
                              props.artist.weeklyFollowersGrowingTrend &&
                              props.artist.weeklyFollowersGrowingTrend > 0.0
                                ? '#a3e635'
                                : '#FA4545'
                            }
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="recordedAt"
                        tickFormatter={(value: string) =>
                          new Date(value).toLocaleDateString()
                        }
                      />
                      <YAxis />
                      <CartesianGrid
                        strokeDasharray="5 5"
                        strokeOpacity={0.3}
                      />
                      <Tooltip
                        contentStyle={{
                          color: '#FDFDFD',
                          backgroundColor: '#303030',
                          border: 'none',
                        }}
                        labelFormatter={(value: string) =>
                          new Date(value).toLocaleDateString()
                        }
                        formatter={(
                          value: number,
                          name: string,
                          props: any
                        ) => [value, 'Followers', props]}
                      />
                      <Area
                        type="bump"
                        dataKey="followersCount"
                        stroke={
                          props.artist.weeklyFollowersGrowingTrend &&
                          props.artist.weeklyFollowersGrowingTrend > 0.0
                            ? '#a3e635'
                            : '#FA4545'
                        }
                        strokeWidth={3}
                        fillOpacity={0.5}
                        fill="url(#followersCount)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="relative w-full rounded-2xl bg-dark-double-inner p-5">
                  <div className="mb-3 flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                      <h1
                        className={classNames(
                          'flex flex-row items-center gap-1 font-hubot-sans text-2xl leading-[0.8]',
                          {
                            'text-[#a3e635]':
                              props.artist.weeklyPostsGrowingTrend &&
                              props.artist.weeklyPostsGrowingTrend > 0.0,
                            'text-[#FA4545]':
                              props.artist.weeklyPostsGrowingTrend &&
                              props.artist.weeklyPostsGrowingTrend < 0.0,
                          }
                        )}
                      >
                        <RiArrowDownSLine
                          className={classNames({
                            'rotate-180':
                              props.artist.weeklyPostsGrowingTrend &&
                              props.artist.weeklyPostsGrowingTrend > 0.0,
                          })}
                        />
                        {props.artist.weeklyPostsGrowingTrend &&
                          Math.abs(props.artist.weeklyPostsGrowingTrend)}
                        %
                      </h1>
                      <p className="text-base text-zinc-400">grow trend</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <h1
                        className={classNames(
                          'flex flex-row items-center gap-1 font-hubot-sans text-2xl leading-[0.8]'
                        )}
                      >
                        {props.artist.tweetsCount}
                      </h1>
                      <p className="text-base text-zinc-400">tweets</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart
                      width={400}
                      height={250}
                      data={artistTrends}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorTweetsCount"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={
                              props.artist.weeklyPostsGrowingTrend &&
                              props.artist.weeklyPostsGrowingTrend > 0.0
                                ? '#a3e635'
                                : '#FA4545'
                            }
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={
                              props.artist.weeklyPostsGrowingTrend &&
                              props.artist.weeklyPostsGrowingTrend > 0.0
                                ? '#a3e635'
                                : '#FA4545'
                            }
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="recordedAt"
                        tickFormatter={(value: string) =>
                          new Date(value).toLocaleDateString()
                        }
                      />
                      <YAxis />
                      <CartesianGrid
                        strokeDasharray="5 5"
                        strokeOpacity={0.3}
                      />
                      <Tooltip
                        contentStyle={{
                          color: '#FDFDFD',
                          backgroundColor: '#303030',
                          border: 'none',
                        }}
                        labelFormatter={(value: string) =>
                          new Date(value).toLocaleDateString()
                        }
                        formatter={(
                          value: number,
                          name: string,
                          props: any
                        ) => [value, 'Posts', props]}
                      />
                      <Area
                        type="bump"
                        dataKey="tweetsCount"
                        stroke={
                          props.artist.weeklyPostsGrowingTrend &&
                          props.artist.weeklyPostsGrowingTrend > 0.0
                            ? '#a3e635'
                            : '#FA4545'
                        }
                        strokeWidth={3}
                        fillOpacity={0.5}
                        fill="url(#colorTweetsCount)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {props.artist.tags !== undefined &&
            props.artist.tags.length !== 0 && (
              <div className="flex flex-row gap-2">
                {props.artist.tags.map((tag, index) => (
                  <p
                    key={index}
                    className="rounded-md bg-dark-double-inner p-2 px-4 text-sm transition-colors duration-200 ease-in-out "
                  >
                    {tag}
                  </p>
                ))}
              </div>
            )}
        </div>
      </section>
    </>
  );
};
