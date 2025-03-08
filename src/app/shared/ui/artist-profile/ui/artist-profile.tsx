import { HTMLAttributes, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { Artist } from '@/app/shared/types/artist';
import { Flag } from '@/app/shared/ui/flag';
import { trimValue } from '@/app/shared/utils/trim-value';
import { Icon } from '@/app/shared/ui/icon/ui/icon';
import Image from 'next/image';
import useArtistStore from '@/app/shared/hooks/use-artist-store';
import Link from 'next/link';
import { FormatBio } from '@/app/shared/ui/format-bio';
import { Trend } from '@/app/shared/types/trend';
import { Response } from '@/app/shared/types/response';
import { TrendChart } from '../../trend-chart';
import { Transition } from '@headlessui/react';
import { BannerButton } from '../components/banner-button';
import { ProfileComponent } from '../components/profile-component';
import { COUNTRY_CODES } from '@/app/shared/constants/country-codes';

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
        'w-full overflow-hidden rounded-xl border-[1.5px]',
        isOpen && 'sticky top-5 bottom-5 z-[1]',
        isOpen ? 'border-gray-01/20' : 'border-transparent',
        'transition-[max-height] duration-200 ease-in-out',
        className
      )}
      {...props}
    >
      {!isOpen && (
        <button
          onClick={() => handleClick()}
          className={twJoin(
            'group flex flex-row items-center justify-between gap-4',
            'bg-black-02 w-full overflow-hidden px-4 py-2',
            'hover:bg-black-03 hover:cursor-pointer',
            'transition-colors duration-200 ease-in-out'
          )}
        >
          <div className="flex flex-row items-center gap-4">
            <Image
              src={data.images.avatar}
              alt={`Avatar for ${data.username}`}
              width={48}
              height={48}
              className="bg-black-02 max-h-[36px] max-w-[36px] overflow-hidden rounded-full"
            />
            {data.country && <Flag country={data.country} />}
            <p className="font-hubot max-w-[250px] truncate text-ellipsis">
              {data.name}
            </p>
            <p className="text-gray-01/80">@{data.username}</p>
          </div>
          <div
            className={twJoin(
              'flex flex-row items-center gap-4',
              'translate-x-8',
              'group-hover:translate-x-0',
              'transition-transform duration-200 ease-in-out'
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
            <Icon ico="i-ri-arrow-down-s-line" className={twJoin('text-xl')} />
          </div>
        </button>
      )}

      {isOpen && (
        <ArtistProfile.Detailed data={data} handleClick={handleClick} />
      )}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={twJoin('bg-black-02 flex w-full flex-col', className)}
      {...props}
    >
      <div className="flex flex-col">
        <div
          className={twJoin(
            'flex flex-row justify-end gap-2',
            data.images.banner ? 'absolute top-3 right-3 left-3' : 'mx-5 mt-5'
          )}
        >
          <BannerButton isImageExist={Boolean(data.images.banner)}>
            <Icon ico="i-ri-pushpin-fill" className="text-lg" />
          </BannerButton>
          <BannerButton isImageExist={Boolean(data.images.banner)}>
            <Icon ico="i-ri-arrow-right-up-line" className="text-xl" />
          </BannerButton>
          <BannerButton
            onClick={handleClick}
            isImageExist={Boolean(data.images.banner)}
          >
            <Icon
              ico="i-ri-arrow-down-s-line"
              className={twJoin('rotate-180 text-xl')}
            />
          </BannerButton>
        </div>
        {data.images.banner && (
          <Image
            onClick={() => handleClick()}
            src={data.images.banner}
            // alt={`Banner for ${data.username}`}
            alt={''}
            width={1280}
            height={720}
            draggable={false}
            className="bg-black-03 h-36 object-cover hover:cursor-pointer"
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-4 p-5">
        <div className="flex flex-row items-center gap-4">
          <Image
            src={data.images.avatar}
            // alt={`Avatar for ${data.username}`}
            alt={''}
            width={128}
            height={128}
            draggable={false}
            className="bg-black-03 h-[81px] w-[81px] rounded-xl"
          />
          <div className="flex w-full flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="font-hubot max-w-[450px] truncate text-xl text-ellipsis">
                {data.name}
              </p>
              <div className="text-gray-01/80 flex flex-row items-center gap-1">
                <Link href={data.url} target="_blank">
                  @{data.username}
                </Link>
                {data.website && (
                  <>
                    <span>•</span>
                    <Link href={data.website} target="_blank">
                      {data.website.replace(/https?:\/\/(www\.)?|\/$/g, '')}
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-6">
              <div className="flex flex-col">
                <p className="font-hubot text-2xl">{data.followersCount}</p>
                <p className="text-gray-01/80">followers</p>
              </div>
              <div className="flex flex-col">
                <p className="font-hubot text-2xl">{data.tweetsCount}</p>
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
                    {item.slice(0, 1).toUpperCase() +
                      item.slice(1, item.length)}
                  </p>
                </ProfileComponent>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

type TrendsArtistProfileProps = HTMLAttributes<HTMLDivElement> & {
  artistData: Artist;
  data: Trend[] | null;
  isLoading: boolean;
  error: {
    id: string;
    reason: string;
  } | null;
};

function Trends({
  className,
  artistData,
  isLoading,
  data,
  error,
  ...props
}: TrendsArtistProfileProps) {
  console.log(error);

  return (
    <div
      className={twJoin('relative z-[1] h-[248px] w-full', className)}
      {...props}
    >
      {/* Индикатор загрузки */}
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

export default Trends;

ArtistProfile.Detailed = Detailed;
ArtistProfile.Trends = Trends;

export { ArtistProfile };
