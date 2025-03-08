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
        'w-full overflow-hidden rounded-xl border',
        isOpen && 'sticky top-5 bottom-5 z-[1]',
        isOpen ? 'border-gray-01/20' : 'border-transparent', // or shadow-[0_0_35px_rgba(0,0,0,1)]
        'transition-shadow duration-200 ease-in-out',
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
      {!data.images.banner ? (
        <div
          onClick={() => handleClick()}
          className={twJoin('bg-black-03 h-36 w-full hover:cursor-pointer')}
        />
      ) : (
        <Image
          onClick={() => handleClick()}
          src={data.images.banner}
          // alt={`Banner for ${data.username}`}
          alt={''}
          width={1280}
          height={720}
          className="bg-black-03 h-36 object-cover hover:cursor-pointer"
        />
      )}
      <div className="flex w-full flex-col gap-4 p-5">
        <div className="flex flex-row items-center gap-4">
          <Image
            src={data.images.avatar}
            // alt={`Avatar for ${data.username}`}
            alt={''}
            width={81}
            height={81}
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
    <div className={twJoin('w-full', className)} {...props}>
      {isLoading ? (
        <></>
      ) : (
        data && (
          <div className="flex w-full flex-row gap-6">
            <TrendChart
              artistData={artistData}
              data={data}
              range={7}
              trendBy="followers"
              className="w-full"
            />
            <TrendChart
              artistData={artistData}
              data={data}
              range={7}
              trendBy="tweets"
              className="w-full"
            />
          </div>
        )
      )}
    </div>
  );
}

ArtistProfile.Detailed = Detailed;
ArtistProfile.Trends = Trends;

export { ArtistProfile };
