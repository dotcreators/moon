import { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { Artist } from '@/shared/types/artist';
import { Flag } from '@/shared/ui/flag';
import { trimValue } from '@/shared/utils/trim-value';
import Icon from '@/shared/ui/icon';
import useArtistStore from '@/shared/hooks/use-artist-store';
import Link from 'next/link';
import { FormatBio } from '@/shared/ui/format-bio';
import { Trend } from '@/shared/types/trend';
import { Response } from '@/shared/types/response';
import { TrendChart } from '../../trend-chart';
import { Transition } from '@headlessui/react';
import { ProfileComponent } from '../components/profile-component';
import { COUNTRY_CODES } from '@/shared/constants/country-codes';
import { BannerButton } from '../components/banner-button';
import usePinnedArtistStore from '@/shared/hooks/use-pinned-artist-store';
import { PinnedArtist } from '@/shared/types/pinned-artist';
import ImageLoader from '../../image-loader';
import Select from '../../search/components/select';
import { SEARCH_FILTERS_DATA } from '../../search/components/search-filters-data';
import { BannerLink } from '../components/banner-link';

const API_URL = process.env.API_URL;

type ArtistProfileProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  data: Artist;
};

function ArtistProfile({
  className,
  isOpen,
  withRanking,
  data,
  ...props
}: ArtistProfileProps & { withRanking: boolean }) {
  const { setSelectedArtist } = useArtistStore();

  const handleClick = () => {
    setSelectedArtist(data);
  };

  const calculateRankingChange = useCallback(() => {
    return data.previousRanking - data.ranking;
  }, [data.previousRanking, data.ranking]);

  const showIcon = () => {
    if (data.rankingChange === 0) {
      return <Icon ico="i-ri-equal-line" className="!text-xl" />;
    } else if (data.rankingChange > 0) {
      return <Icon ico="i-ri-arrow-up-s-line" className="!text-xl" />;
    } else {
      return <Icon ico="i-ri-arrow-down-s-line" className="!text-xl" />;
    }
  };

  return (
    <section
      className={twJoin('relative flex flex-row items-center gap-2', className)}
      {...props}
    >
      {withRanking && calculateRankingChange() !== 0 && (
        <div
          className={twJoin(
            'absolute right-full mr-2',
            'bg-black-02 rounded-md px-2 py-1',
            'flex flex-row items-center justify-center gap-1',
            data.rankingChange === 0
              ? '!text-gray-01'
              : data.rankingChange > 0
                ? '!text-green-01'
                : '!text-red-01'
          )}
        >
          {showIcon()}

          <p className="text-sm tabular-nums">
            {/* {Math.abs(calculateRankingChange())} */}
            {Math.abs(data.rankingChange)}
            {/* {data.rankingChange} */}
          </p>
        </div>
      )}
      <div
        className={twJoin(
          'w-full overflow-hidden rounded-xl',
          isOpen && 'sticky bottom-5 z-[1]',
          'transition-[max-height] duration-200 ease-in-out'
        )}
      >
        <button
          onClick={() => handleClick()}
          className={twJoin(
            'group grid grid-cols-2 items-center',
            'w-full gap-3 overflow-hidden px-4 py-2',
            'transition-colors duration-200 ease-in-out',
            'hover:cursor-pointer',
            'tablet:gap-4',
            isOpen
              ? 'bg-black-04 hover:bg-black-05'
              : 'bg-black-02 hover:bg-black-03'
          )}
        >
          <div
            className={twJoin(
              'flex flex-row items-center gap-3',
              'tablet:gap-4 max-w-full'
            )}
          >
            <ImageLoader
              src={data.images.avatar}
              alt={`${data.username}`}
              width={48}
              height={48}
              variant="03"
              className={twJoin(
                'overflow-hidden rounded-full',
                'max-h-[28px] min-h-[28px] max-w-[28px] min-w-[28px]',
                'tablet:max-h-[36px] tablet:min-h-[36px] tablet:max-w-[36px] tablet:min-w-[36px]',
                isOpen ? 'bg-black-05' : 'bg-black-04'
              )}
            />
            {data.country && <Flag country={data.country} />}
            <p
              className={twJoin(
                'font-mona-sans min-w-0 flex-1 truncate text-start text-sm',
                'tablet:text-base'
              )}
            >
              {data.name}
            </p>
          </div>
          <div
            className={twJoin(
              'flex flex-row items-center justify-end gap-4',
              'group-hover:translate-x-0',
              'transition-transform duration-200 ease-in-out',
              isOpen ? 'translate-x-0' : 'translate-x-8',
              'flex-shrink-0'
            )}
          >
            <div
              className={twJoin(
                'flex flex-shrink-0 flex-row items-center gap-2 text-sm',
                'tablet:text-base'
              )}
            >
              <p>{trimValue(data.followersCount)}</p>
              <p className="text-gray-01/80">followers</p>
            </div>
            <div
              className={twJoin(
                'hidden min-w-24 flex-shrink-0 flex-row items-center justify-end gap-2 text-sm',
                'tablet:flex tablet:text-base',
                'laptop:hidden',
                'desktop:flex'
              )}
            >
              <p>{trimValue(data.tweetsCount)}</p>
              <p className="text-gray-01/80">posts</p>
            </div>
            <Icon
              ico="i-ri-arrow-down-s-line"
              className={twJoin(
                'text-xl',
                'transition-transform duration-200 ease-in-out',
                isOpen && '-rotate-90'
              )}
            />
          </div>
        </button>
      </div>
    </section>
  );
}

function Detailed({
  className,
  data,
  ...props
}: Omit<ArtistProfileProps, 'isOpen'>) {
  const [trendsData, setTrendsData] = useState<Trend[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    id: string;
    reason: string;
  } | null>(null);
  const {
    addPinnedArtists,
    pinnedArtists,
    removePinnedArtist,
    savePinnedArtists,
  } = usePinnedArtistStore();

  // TODO: move away data fetching
  useEffect(() => {
    async function getArtistsData() {
      const r = await fetch(
        `${API_URL}/trends/search?page=1&perPage=7&twitterUserId=${data.twitterUserId}`
      );
      const d: Response<Trend[]> = await r.json();

      if (d.errors) {
        setError(d.errors);
        setIsLoading(false);
        return;
      }

      if (d.items && !d.errors) {
        setTrendsData(d.items);
      }

      setIsLoading(false);
    }

    getArtistsData();
  }, [data]);

  const handlePinClick = (value: Artist) => {
    const p: PinnedArtist = {
      id: value.id,
      twitterUserId: value.twitterUserId,
      username: value.username,
      name: value.name ?? undefined,
      images: value.images,
    };

    if (!pinnedArtists) return;

    if (!pinnedArtists.some(x => x.id === value.id)) {
      addPinnedArtists(p);
    } else {
      removePinnedArtist(p);
    }

    savePinnedArtists();
  };

  return (
    <div
      className={twJoin('bg-black-02 flex w-full flex-col', className)}
      {...props}
    >
      <div className="relative flex flex-col">
        <div
          className={twJoin(
            'z-[1] flex w-fit grow flex-row gap-2',
            data.images.banner ? 'absolute top-3 right-3' : 'mx-3 mt-3 self-end'
          )}
        >
          <BannerButton
            onClick={() => handlePinClick(data)}
            isImageExist={Boolean(data.images.banner)}
          >
            {pinnedArtists && !pinnedArtists.some(x => x.id === data.id) ? (
              <Icon ico="i-ri-pushpin-fill" className={twJoin('text-lg')} />
            ) : (
              <Icon ico="i-ri-unpin-fill" className={twJoin('text-lg')} />
            )}
          </BannerButton>

          <BannerLink
            href={data.url}
            isImageExist={Boolean(data.images.banner)}
          >
            <Icon ico="i-ri-arrow-right-up-line" className="text-lg" />
          </BannerLink>
        </div>
        {data.images.banner && (
          <ImageLoader
            src={data.images.banner}
            alt={''}
            width={1280}
            height={720}
            variant="03"
            className={twJoin(
              'rounded-xl',
              'h-24 max-h-24 min-h-24',
              'tablet:h-32 tablet:max-h-32 tablet:min-h-32',
              'laptop:h-36 laptop:max-h-36 laptop:min-h-36',
              'desktop:h-42 desktop:max-h-42 desktop:min-h-42'
            )}
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-4 p-5">
        <div className="flex flex-row items-center gap-4">
          <ImageLoader
            src={data.images.avatar}
            alt={''}
            width={128}
            height={128}
            variant="03"
            className={twJoin(
              'rounded-xl',
              'tablet:h-[72px] tablet:min-h-[72px] tablet:w-[72px] tablet:min-w-[72px]',
              'laptop:h-[64px] laptop:min-h-[64px] laptop:w-[64px] laptop:min-w-[64px]',
              'desktop:h-[72px] desktop:min-h-[72px] desktop:w-[72px] desktop:min-w-[72px]'
            )}
          />

          <div className="flex w-full flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
              <p
                className={twJoin(
                  'font-mona-sans truncate text-2xl text-ellipsis',
                  'laptop:max-w-[150px]',
                  'desktop:max-w-[235px]'
                )}
              >
                {data.name}
              </p>
              <div className="text-gray-01/80 flex max-w-[270px] flex-row items-center gap-1">
                <Link
                  href={data.url}
                  target="_blank"
                  className="hover:text-red-01 transition-colors duration-200 ease-in-out"
                >
                  @{data.username}
                </Link>
                {data.website && (
                  <div className="laptop:hidden desktop:flex flex gap-1">
                    <span>•</span>
                    <Link
                      href={data.website}
                      target="_blank"
                      className={twJoin(
                        'truncate text-ellipsis',
                        'hover:text-red-01 max-w-[150px] transition-colors duration-200 ease-in-out'
                      )}
                    >
                      {data.website.replace(/https?:\/\/(www\.)?|\/$/g, '')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-6">
              <div className="flex flex-col">
                <p className="font-mona-sans text-2xl">
                  {trimValue(data.followersCount)}
                </p>
                <p className="text-gray-01/80">followers</p>
              </div>
              <div className="flex flex-col">
                <p className="font-mona-sans text-2xl">
                  {trimValue(data.tweetsCount)}
                </p>
                <p className="text-gray-01/80">tweets</p>
              </div>
            </div>
          </div>
        </div>
        {data.website && (
          <div className="desktop:hidden laptop:flex hidden">
            <p className="text-gray-01 text-sm">
              Website:{' '}
              <Link
                href={data.website}
                target="_blank"
                className={twJoin(
                  'text-red-01 truncate text-base text-ellipsis',
                  'hover:text-red-01 transition-colors duration-200 ease-in-out'
                )}
              >
                {data.website.replace(/https?:\/\/(www\.)?|\/$/g, '')}
              </Link>
            </p>
          </div>
        )}
        {data.bio && <FormatBio text={data.bio} className="my-2" />}
        <ArtistProfile.Trends
          artistData={data}
          isLoading={isLoading}
          error={error}
          data={trendsData}
        />
        {(data.tags || data.country) && <Components data={data} />}
      </div>
    </div>
  );
}

type ComponentsProps = HTMLAttributes<HTMLDivElement> & { data: Artist };

function Components({ className, data, ...props }: ComponentsProps) {
  return (
    <div className={twJoin(className)} {...props}>
      {(data.country || data.tags) && (
        <div className="flex flex-row items-center gap-3">
          {data.country && (
            <ProfileComponent>
              <Flag country={data.country} />
              <p>
                {
                  COUNTRY_CODES.find(
                    x => x.value.toLowerCase() === data.country.toLowerCase()
                  )?.title
                }
              </p>
            </ProfileComponent>
          )}
          {data.tags &&
            data.tags.map(item => (
              <ProfileComponent key={`${item}`}>
                <p>
                  {item.slice(0, 1).toUpperCase() + item.slice(1, item.length)}
                </p>
              </ProfileComponent>
            ))}
        </div>
      )}
    </div>
  );
}

type TrendsArtistProfileProps = HTMLAttributes<HTMLDivElement> & {
  artistData: Artist;
  data: Trend[] | null;
  isLoading: boolean;
  error?: {
    id: string;
    reason: string;
  } | null;
};

function Trends({
  className,
  artistData,
  isLoading,
  data,
  ...props
}: TrendsArtistProfileProps) {
  return (
    <div
      className={twJoin('relative z-[1] h-[248px] w-full', className)}
      {...props}
    >
      <Transition
        as={'div'}
        show={isLoading}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={twJoin('absolute inset-0 z-[1]')}
      >
        <div className="desktop:gap-5 flex h-full w-full flex-row gap-3">
          {[0, 1].map(i => (
            <div
              key={`loader-${i}`}
              className="bg-black-03 relative h-full w-full animate-pulse rounded-xl"
            >
              <Icon
                ico="i-ri-loader-5-fill"
                className={twJoin(
                  'text-gray-01 absolute animate-spin text-2xl',
                  'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                )}
              />
            </div>
          ))}
        </div>
      </Transition>

      <Transition
        as={'div'}
        show={!isLoading && !!data}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={twJoin('absolute inset-0 z-[1]')}
      >
        <div className="desktop:gap-5 flex h-full w-full flex-row gap-3">
          <TrendChart
            artistData={artistData}
            data={data!}
            range={7}
            trendBy="followers"
            className="w-full"
          />
          <TrendChart
            artistData={artistData}
            data={data!}
            range={7}
            trendBy="tweets"
            className="w-full"
          />
        </div>
      </Transition>
    </div>
  );
}

type TrendsRange = '7' | '14' | '31' | '93' | '186' | '372';

function DetailedTrends({
  className,
  artistData,
  ...props
}: HTMLAttributes<HTMLDivElement> & { artistData: Artist }) {
  const [trendsData, setTrendsData] = useState<Trend[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<{
    id: string;
    reason: string;
  } | null>(null);
  const [trendsRange, setTrendsRange] = useState<TrendsRange>('14');

  useEffect(() => {
    async function getArtistsData() {
      setIsLoading(true);

      const r = await fetch(
        `${API_URL}/trends/search?page=1&perPage=${trendsRange}&twitterUserId=${artistData.twitterUserId}`
      );
      const d: Response<Trend[]> = await r.json();

      if (d.errors) {
        setError(d.errors);
        setIsLoading(false);
        return;
      }

      if (d.items && !d.errors) {
        setTrendsData(d.items);
      }

      setIsLoading(false);
    }

    getArtistsData();
  }, [artistData, trendsRange]);

  return (
    <div
      className={twJoin('bg-black-02 flex flex-col gap-5 p-5', className)}
      {...props}
    >
      <Select.Item
        items={SEARCH_FILTERS_DATA.trendsRange}
        label="Trends range"
        variant="02"
        isDefaultValueNode={true}
        selectedValue={trendsRange ? [trendsRange] : []}
        onSelectedItem={(value: string | string[]) => {
          setTrendsRange(
            Array.isArray(value)
              ? (value[0] as TrendsRange)
              : (value as TrendsRange)
          );
        }}
      />

      <div className={twJoin('relative z-[1] h-[512px] w-full')}>
        <Transition
          as={'div'}
          show={isLoading}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={twJoin('absolute inset-0 z-[1]')}
        >
          <div className="flex h-full w-full flex-col gap-6">
            {[0, 1].map(i => (
              <div
                key={`loader-${i}`}
                className="bg-black-03 relative h-full w-full animate-pulse rounded-xl"
              >
                <Icon
                  ico="i-ri-loader-5-fill"
                  className={twJoin(
                    'text-gray-01 absolute animate-spin text-2xl',
                    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  )}
                />
              </div>
            ))}
          </div>
        </Transition>

        <Transition
          as={'div'}
          show={!isLoading && !!trendsData}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={twJoin('absolute inset-0 z-[1]')}
        >
          <div className="flex h-full w-full flex-col gap-6">
            <TrendChart
              artistData={artistData}
              data={trendsData!}
              range={7}
              trendBy="followers"
              className="w-full"
            />
            <TrendChart
              artistData={artistData}
              data={trendsData!}
              range={7}
              trendBy="tweets"
              className="w-full"
            />
          </div>
        </Transition>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-black-02 flex h-[52px] w-full flex-row items-center justify-between gap-4 rounded-xl px-4">
      <div className="flex animate-pulse flex-row items-center gap-4">
        <div className="bg-black-03 h-[36px] w-[36px] rounded-full" />
        <div className="bg-black-03 h-[24px] w-[150px] rounded-full" />
      </div>
      <div className="flex animate-pulse flex-row items-center gap-4">
        <div className="bg-black-03 h-[24px] w-[100px] rounded-full" />
        <div className="bg-black-03 h-[24px] w-[70px] rounded-full" />
      </div>
    </div>
  );
}

function SkeletonDetailed() {
  return (
    <div className="bg-black-02 flex h-[500px] w-full flex-col items-center gap-4 overflow-hidden rounded-xl">
      <div className="flex w-full animate-pulse flex-row items-center gap-4">
        <div className="bg-black-03 h-42 max-h-42 min-h-42 w-full rounded-xl" />
      </div>
      <div className="flex w-full animate-pulse flex-row items-center justify-between gap-4 px-5">
        <div className="flex flex-row items-center gap-4">
          <div className="bg-black-03 h-[75px] w-[75px] rounded-xl" />
          <div className="flex flex-col gap-2">
            <div className="bg-black-03 h-[24px] w-[150px] rounded-full" />
            <div className="bg-black-03 h-[24px] w-[70px] rounded-full" />
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="bg-black-03 h-[24px] w-[100px] rounded-full" />
            <div className="bg-black-03 h-[24px] w-[70px] rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-black-03 h-[24px] w-[100px] rounded-full" />
            <div className="bg-black-03 h-[24px] w-[70px] rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex w-full animate-pulse flex-row items-center gap-4 px-5">
        <div className="flex w-full flex-col gap-2">
          <div className="bg-black-03 h-[24px] w-full rounded-full" />
          <div className="bg-black-03 h-[24px] w-full rounded-full" />
          <div className="bg-black-03 h-[24px] w-1/2 rounded-full" />
        </div>
      </div>
    </div>
  );
}

ArtistProfile.Detailed = Detailed;
ArtistProfile.Trends = Trends;
ArtistProfile.DetailedTrends = DetailedTrends;
ArtistProfile.Skeleton = Skeleton;
ArtistProfile.SkeletonDetailed = SkeletonDetailed;

export default ArtistProfile;
