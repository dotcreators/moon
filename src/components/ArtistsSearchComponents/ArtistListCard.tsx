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
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { ArtistTrendGraph } from './ArtistCardInfo/ArtistTrendGraph';
import { countryCodes } from '@/utils/CountryCode';
import RiExternalLinkFill from '~icons/ri/external-link-fill';
import RiTwitterFill from '~icons/ri/twitter-fill';
import CibItchIo from '~icons/cib/itch-io';
import { searchTagsArray } from '@/utils/Tags';

interface Props {
  place: number;
  artist: ArtistProfile;
  isSmall: boolean;
  className?: string;
}

export const ArtistListCard: FC<Props> = props => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [artistTrends, setArtistTrends] = useState<ArtistTrend[] | undefined>(
    undefined
  );

  const { data, error } = useSWR<{
    status: string;
    response: ArtistTrend[];
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

  const replaceTagsWithLinks = (text: string) => {
    const regex = / @(\w+)/g;
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        const tag = part;
        return (
          <Link
            key={index}
            target="__blank"
            href={`https://x.com/${tag}`}
            className="ml-1 text-dot-primary"
          >
            @{tag}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <>
      <section
        onClick={() => (!isOpen ? setIsOpen(!isOpen) : '')}
        className={classNames(
          'group/main flex w-full flex-col justify-between gap-5 overflow-hidden bg-dark-inner transition-transform duration-200 ease-in-out md:hover:bg-dark-inner-hover',
          props.className,
          {
            'rounded-2xl ': !props.isSmall,
            'md:hover:cursor-default': isOpen,
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
          <div className="flex translate-x-10 select-none flex-row items-center justify-end gap-5 transition-transform duration-200 ease-in-out md:group-hover/main:translate-x-0">
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
          className={classNames('relative flex flex-col gap-5 ', {
            hidden: !isOpen,
            block: isOpen,
          })}
        >
          {props.artist.images.banner !== undefined && (
            <>
              <ImageLoader
                src={props.artist.images.banner + '/1500x500	'}
                alt={'Profile Banner for ' + props.artist.username}
                width={600}
                height={200}
                unoptimized={true}
                className="h-48 w-full object-cover"
              />
              <div className="absolute w-full">
                <ImageLoader
                  src={props.artist.images.banner + '/mobile	'}
                  alt={'Profile Banner for ' + props.artist.username}
                  width={600}
                  height={200}
                  unoptimized={true}
                  hideLoader={true}
                  className="z-10 h-48 w-full object-cover opacity-65 blur-3xl"
                />
              </div>
            </>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-3 top-2.5 z-20 h-fit place-self-start rounded-xl bg-dark-inner/50 p-2 backdrop-blur-md transition-colors duration-200 ease-in-out md:hover:bg-dark-inner"
          >
            <RiArrowDownSLine className="rotate-180" />
          </button>
          <div className="flex w-full flex-col gap-5 px-5 pb-5">
            <div className="z-20 flex flex-row items-center justify-between gap-3">
              <div className="z-20 flex w-full flex-row items-center justify-between gap-3">
                <div className="flex flex-row items-center gap-3">
                  <ImageLoader
                    alt={'Avatar for ' + props.artist.username}
                    src={props.artist.images.avatar}
                    width={75}
                    height={75}
                    className={'absolute rounded-xl'}
                  />
                  <div className="w-fit ">
                    <p className="flex w-fit flex-row items-center gap-2 rounded-md font-hubot-sans text-xl">
                      {props.artist.name}
                    </p>
                    <div className="flex flex-row gap-1 text-zinc-400">
                      <Link
                        href={props.artist.url}
                        target="__blank"
                        className="transition-colors duration-150 ease-in-out md:hover:text-dot-primary"
                      >
                        @{props.artist.username}
                      </Link>
                      {props.artist.website && (
                        <>
                          <p>•</p>
                          <Link
                            href={props.artist.website}
                            target="__blank"
                            className="transition-colors duration-150 ease-in-out md:hover:text-dot-primary"
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
                <div className="flex flex-row items-center gap-5 rounded-xl">
                  <div>
                    <h1 className="font-hubot-sans text-2xl font-black leading-tight">
                      {props.artist.followersCount}
                    </h1>
                    <p className="text-zinc-400">followers</p>
                  </div>
                  <div>
                    <h1 className="font-hubot-sans text-2xl font-black">
                      {props.artist.tweetsCount}
                    </h1>
                    <p className="text-zinc-400">tweets</p>
                  </div>
                </div>
              </div>
            </div>

            {props.artist.bio && (
              <p className="whitespace-pre-line">
                {replaceTagsWithLinks(props.artist.bio)}
              </p>
            )}

            {artistTrends && artistTrends.length !== 0 && (
              <div className="z-20 flex w-full flex-row justify-between gap-5 text-xs">
                <>
                  <ArtistTrendGraph
                    key={'followersGraph'}
                    artistInfo={props.artist}
                    trendBy="followers"
                    trendData={artistTrends}
                  />
                  <ArtistTrendGraph
                    key={'tweetsGraph'}
                    artistInfo={props.artist}
                    trendBy="tweets"
                    trendData={artistTrends}
                  />
                </>
              </div>
            )}
            {props.artist.tags !== undefined &&
              props.artist.tags.length !== 0 && (
                <div className="flex flex-row gap-2">
                  {props.artist.tags.map((tag, index) => (
                    <p
                      key={index}
                      className="rounded-md bg-dark-double-inner p-2 px-4 text-sm transition-colors duration-200 ease-in-out "
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
                      <div className="flex flex-row items-center gap-2 rounded-md bg-dark-double-inner p-2 px-4 text-sm">
                        <Image
                          alt={`${props.artist.country}`}
                          src={`https://flagcdn.com/${props.artist.country.toLowerCase()}.svg`}
                          width={24}
                          height={20}
                          className={'h-4 w-6 rounded-sm '}
                        />
                        <p className=" ">
                          {countryCodes.map((country, index) => {
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
