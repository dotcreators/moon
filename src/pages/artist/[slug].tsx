import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ArtistPageCard } from '@/components/ArtistPageComponents/ArtistPageCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { ArtistPageTrendGraph } from '@/components/ArtistPageComponents/ArtistPageTrendGraph';
import RiArrowLeftSLine from '~icons/ri/arrow-left-s-line';
import Link from 'next/link';
import RiCalendarFill from '~icons/ri/calendar-fill';

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

  const { data: trendData, error: trendError } = useSWR<{
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
    <section className="relative m-auto flex h-fit w-full max-w-7xl flex-col items-start justify-center gap-5 pt-32">
      <div className="flex w-full flex-row items-center justify-between">
        <Link
          href="/lists"
          className="flex flex-row items-center gap-1 text-sm text-zinc-400 duration-300 ease-in-out md:hover:text-dot-white"
        >
          <RiArrowLeftSLine />
          <p>Back to artists</p>
        </Link>
        <p className="text-sm text-zinc-400">
          Profile created:{' '}
          {artist && new Date(artist.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="w-full overflow-hidden rounded-2xl bg-dot-primary">
        {artist && <ArtistPageCard artist={artist} />}
      </div>
      {artist && artistTrend && (
        <ArtistPageTrendGraph artist={artist} trendData={artistTrend} />
      )}
    </section>
  );
}
