import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { useTrendsStore } from '@/store/useTrendsStore';
import { NextSeo } from 'next-seo';
import RiArrowLeftSLine from '~icons/ri/arrow-left-s-line';
import RiLineChartFill from '~icons/ri/line-chart-fill';
import useSWR from 'swr';
import { ArtistPageCard } from '@/components/Artists/ArtistProfile/ArtistPageCard';
import { SearchItem } from '@/components/Search/SearchContainer/SearchItem';
import { TrendGraph } from '@/components/Artists/TrendGraph';
import { filterDataRange } from '@/components/Other/FiltersData';

interface UserPageProps {
  artist: ArtistProfile | null;
}

export const getServerSideProps: GetServerSideProps<
  UserPageProps
> = async context => {
  try {
    const { slug } = context.query;
    const artistRes = await fetch(
      `${process.env.API_URL}artists/search?perPage=1&page=1&username=${slug}`
    );
    const artistData: {
      items: ArtistProfile[];
      page: number;
      perPage: number;
      totalItems: number;
      totalPages: number;
    } = await artistRes.json();

    return {
      props: {
        artist: artistData.items[0] || null,
      },
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        artist: null,
        artistTrend: null,
      },
    };
  }
};

const UserPage = ({ artist }: UserPageProps) => {
  const router = useRouter();
  const { slug } = router.query;

  const { trendsRange, updateTrendsRange } = useTrendsStore();

  const { data: trendsData, error } = useSWR<{
    items: ArtistTrend[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }>(
    artist
      ? `${process.env.API_URL}trends/search?twitterUserId=${artist.twitterUserId}&perPage=${trendsRange}&page=1`
      : null,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  function getDateRange(selectedFilter: string): 7 | 14 | 31 | 93 | 186 | 372 {
    if (selectedFilter === '7 days') return 7;
    else if (selectedFilter === '14 days') return 14;
    else if (selectedFilter === '1 month') return 31;
    else if (selectedFilter === '3 months') return 93;
    else if (selectedFilter === '6 months') return 186;
    else if (selectedFilter === '12 months') return 372;
    else return 7;
  }

  function getDateRangeFromStore(selectedFilter: number): string {
    if (selectedFilter === 7) return '7 days';
    else if (selectedFilter === 14) return '14 days';
    else if (selectedFilter === 31) return '1 month';
    else if (selectedFilter === 93) return '3 months';
    else if (selectedFilter === 186) return '6 months';
    else if (selectedFilter === 372) return '12 months';
    else return '7 days';
  }

  return (
    <>
      <NextSeo
        title={slug as string}
        description="Artist profile with basic Twitter account information, followers and posts trends."
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://dotcreators.xyz/',
          siteName: 'dotcreators',
        }}
      />

      <section className="relative m-auto flex h-fit w-full max-w-5xl flex-col items-start justify-center gap-5 px-3 pt-[100px] md:px-10 md:pt-32 lg:px-0">
        <div className="flex w-full flex-row items-center justify-between">
          <button
            onClick={() => {
              router.push('/artists');
            }}
            className="flex flex-row items-center gap-1 text-sm text-zinc-400 duration-300 ease-in-out md:hover:text-dot-white"
          >
            <RiArrowLeftSLine />
            <p>Back to artists</p>
          </button>
          <p className="text-sm text-zinc-400">
            Profile created:{' '}
            {artist && new Date(artist.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="w-full overflow-hidden rounded-2xl bg-dot-primary">
          {artist && <ArtistPageCard artist={artist} />}
        </div>
        <div className="w-full">
          <SearchItem
            title="Trends range"
            isDropdown={true}
            filtersData={filterDataRange}
            isMultiSelect={false}
            defaultSelectedValue={[getDateRangeFromStore(trendsRange)]}
            withResetButton={false}
            selectedValuesUpdate={(filter: string | string[]) => {
              updateTrendsRange(getDateRange(filter as string));
            }}
          />
        </div>
        {artist && trendsData && trendsData.items.length > 1 ? (
          <div className="z-20 flex w-full flex-col justify-between divide-y divide-dot-secondary rounded-2xl bg-dot-primary text-xs md:gap-5 md:divide-none md:divide-transparent md:bg-transparent">
            <div className="grow">
              <TrendGraph
                artistInfo={artist}
                trendData={trendsData.items}
                trendBy="followers"
                range={trendsRange}
                bgColor="bg-dot-primary"
                isSmall={false}
              />
            </div>
            <div className="grow">
              <TrendGraph
                artistInfo={artist}
                trendData={trendsData.items}
                trendBy="tweets"
                range={trendsRange}
                bgColor="bg-dot-primary"
                isSmall={false}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-[104px] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-dot-primary px-10 text-zinc-400 md:flex-row">
            <RiLineChartFill className="w-8 text-xl" />
            <p className="text-start text-sm md:text-base">
              We are still collecting information about author's growth trend.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default UserPage;
