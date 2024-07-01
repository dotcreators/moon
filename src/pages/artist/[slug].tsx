import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ArtistPageCard } from '@/components/ArtistPageComponents/ArtistPageCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { ArtistPageTrendGraph } from '@/components/ArtistPageComponents/ArtistPageTrendGraph';
import RiArrowLeftSLine from '~icons/ri/arrow-left-s-line';
import RiLineChartFill from '~icons/ri/line-chart-fill';
import { NextSeo } from 'next-seo';

interface UserPageProps {
  artist: ArtistProfile | null;
  artistTrend: ArtistTrend[] | null;
}

export const getServerSideProps: GetServerSideProps<
  UserPageProps
> = async context => {
  try {
    const { slug } = context.query;
    const artistRes = await fetch(
      `${process.env.API_URL}artists?limit=1&page=1&username=${slug}`
    );
    const artistData: {
      status: string;
      response: {
        data: ArtistProfile[];
        has_next: boolean;
        total_pages: number;
      };
    } = await artistRes.json();

    console.log(artistData.response.data[0].userId);

    let trendData = null;
    if (artistData.response.data[0].userId) {
      const trendRes = await fetch(
        `${process.env.API_URL}trends/${artistData.response.data[0].userId}?range=7`
      );

      if (trendRes.ok) trendData = await trendRes.json();
    }

    return {
      props: {
        artist: artistData.response.data[0] || null,
        artistTrend: trendData.response || null,
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

const UserPage = ({ artist, artistTrend }: UserPageProps) => {
  const router = useRouter();
  const { slug } = router.query;

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

      <section className="relative m-auto flex h-fit w-full max-w-7xl flex-col items-start justify-center gap-5 px-3 pt-[100px] md:px-10 md:pt-32 lg:px-0">
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
          <div className="flex h-[104px] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-dot-primary px-10 text-zinc-400 md:flex-row">
            <RiLineChartFill className="w-8 text-xl" />
            <p className="text-start text-sm md:text-base">
              Sorry, but there is currently no trend data recorded for this
              artist.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default UserPage;
