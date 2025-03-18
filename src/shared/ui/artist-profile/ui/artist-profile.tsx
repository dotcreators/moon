import { HTMLAttributes, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { Artist } from '@/shared/types/artist';
import { Flag } from '@/shared/ui/flag';
import { trimValue } from '@/shared/utils/trim-value';
import Icon from '@/shared/ui/icon';
import Image from 'next/image';
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

const API_URL = process.env.API_URL;

type ArtistProfileProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  data: Artist;
};

function ArtistProfile({
  className,
  isOpen,
  data,
  ...props
}: ArtistProfileProps) {
  const { setSelectedArtist, selectedArtist } = useArtistStore();

  const handleClick = () => {
    setSelectedArtist(
      selectedArtist && selectedArtist.id === data.id ? null : data
    );
  };

  return (
    <section
      className={twJoin(
        'w-full overflow-hidden rounded-xl',
        isOpen && 'sticky bottom-5 z-[1]',
        // isOpen ? 'border-gray-01/20' : 'border-transparent',
        'transition-[max-height] duration-200 ease-in-out',
        className
      )}
      {...props}
    >
      {/* {!isOpen && ( */}
      <button
        onClick={() => handleClick()}
        className={twJoin(
          'group flex flex-row items-center justify-between gap-4',
          'w-full overflow-hidden px-4 py-2',
          'hover:cursor-pointer',
          'transition-colors duration-200 ease-in-out',
          isOpen
            ? 'bg-black-04 hover:bg-black-05'
            : 'bg-black-02 hover:bg-black-03'
        )}
      >
        <div className="flex max-w-[400px] flex-row items-center gap-4">
          <Image
            src={data.images.avatar}
            // alt={`Avatar for ${data.username}`}
            alt=""
            width={48}
            height={48}
            className={twJoin(
              'max-h-[36px] min-h-[36px] max-w-[36px] min-w-[36px] overflow-hidden rounded-full',
              isOpen ? 'bg-black-05' : 'bg-black-04'
            )}
          />
          {data.country && <Flag country={data.country} />}
          <p className="font-mona-sans max-w-[175px] truncate text-ellipsis">
            {data.name}
          </p>
          {/* <p className="text-gray-01/80 truncate text-ellipsis">
            @{data.username}
          </p> */}
        </div>
        <div
          className={twJoin(
            'flex flex-row items-center gap-4',

            'group-hover:translate-x-0',
            'transition-transform duration-200 ease-in-out',
            isOpen ? 'translate-x-0' : 'translate-x-8'
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <p>{trimValue(data.followersCount)}</p>
            <p className="text-gray-01/80">followers</p>
          </div>
          <div className="flex min-w-24 flex-row items-center justify-end gap-2">
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
    </section>
  );
}

type DetailedArtistProfileProps = Omit<ArtistProfileProps, 'isOpen'> & {
  handleClick: () => void;
};

function Detailed({
  className,
  data,
  handleClick,
  ...props
}: DetailedArtistProfileProps) {
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
          <BannerButton isImageExist={Boolean(data.images.banner)}>
            <Icon ico="i-ri-arrow-right-up-line" className="text-lg" />
          </BannerButton>
          {/* <BannerButton
            onClick={handleClick}
            isImageExist={Boolean(data.images.banner)}
          >
            <Icon ico="i-ri-close-fill" className="text-lg" />
          </BannerButton> */}
        </div>
        {data.images.banner && (
          <ImageLoader
            src={data.images.banner}
            alt={''}
            width={1280}
            height={720}
            onClick={handleClick}
            variant="03"
            className="h-42 max-h-42 min-h-42 rounded-xl hover:cursor-pointer"
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
            className="h-[72px] min-h-[72px] w-[72px] min-w-[72px] rounded-xl"
          />
          <div className="flex w-full flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="font-mona-sans max-w-[235px] truncate text-xl text-ellipsis">
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
                  <>
                    <span>•</span>
                    <Link
                      href={data.website}
                      target="_blank"
                      className={twJoin(
                        'truncate text-ellipsis',
                        'hover:text-red-01 transition-colors duration-200 ease-in-out'
                      )}
                    >
                      {data.website.replace(/https?:\/\/(www\.)?|\/$/g, '')}
                    </Link>
                  </>
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
        <div className="flex h-full w-full flex-row gap-6">
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
        <div className="flex h-full w-full flex-row gap-6">
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
ArtistProfile.Skeleton = Skeleton;
ArtistProfile.SkeletonDetailed = SkeletonDetailed;

export default ArtistProfile;
