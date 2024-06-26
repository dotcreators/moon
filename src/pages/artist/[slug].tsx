import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ArtistPageCard } from '@/components/ArtistPageComponents/ArtistPageCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { ArtistPageTrendGraph } from '@/components/ArtistPageComponents/ArtistPageTrendGraph';
import RiArrowLeftSLine from '~icons/ri/arrow-left-s-line';
import RiLineChartFill from '~icons/ri/line-chart-fill';
import { NextSeo } from 'next-seo';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function UserPage() {
  const [artist, setArtist] = useState<ArtistProfile | null>(null);
  const [artistTrend, setArtistTrend] = useState<ArtistTrend[] | null>(null);
  const router = useRouter();

  const { slug } = router.query;

  const { data: artistData, error: artistError } = useSWR<{
    status: string;
    response: {
      data: ArtistProfile[];
      has_next: boolean;
    };
  }>(
    slug
      ? `${process.env.API_URL}artists?limit=1&page=1&username=${slug}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (artistData && artistData.response) {
      console.log(artistData.response.data[0]);
      setArtist(artistData.response.data[0]);
    } else if (artistError) {
      console.log(artistError);
    }
  }, [artistData, artistError]);

  const {
    data: trendData,
    error: trendError,
    isLoading: isTrendsLoading,
  } = useSWR<{
    status: string;
    response: ArtistTrend[];
  }>(
    artist ? `${process.env.API_URL}trends/${artist.userId}?range=7` : null,
    fetcher
  );

  useEffect(() => {
    if (trendData && trendData.response) {
      setArtistTrend(trendData.response);
    } else if (trendError) {
      console.log(trendError);
    }
  }, [trendData, trendError]);

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
          // images: [
          //   {
          //     url: artist
          //       ? artist.images.avatar
          //       : 'https://dotcreators.xyz/summary_large_image.png',
          //     width: 1280,
          //     height: 720,
          //   },
          // ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />

      <section className="relative m-auto flex h-fit w-full max-w-7xl flex-col items-start justify-center gap-5 pt-[100px] md:pt-32 px-3 md:px-0">
        <div className="flex w-full flex-row items-center justify-between">
          <button
            onClick={() => router.back()}
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
        {artist && artistTrend && artistTrend.length > 1 ? (
          <ArtistPageTrendGraph artist={artist} trendData={artistTrend} />
        ) : (
          !isTrendsLoading && (
            <div className="flex h-48 w-full flex-row items-center justify-center gap-3 rounded-2xl bg-dot-primary p-10 text-zinc-400">
              <RiLineChartFill className="text-xl" />
              <p>
                Sorry, but there is currently no trend data recorded for this
                artist.
              </p>
            </div>
          )
        )}
      </section>
    </>
  );
}
