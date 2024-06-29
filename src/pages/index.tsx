import { Hero } from '@/components/HeroComponents/Hero';
import { NextSeo } from 'next-seo';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistsMarquee } from '@/components/WelcomeComponents/ArtistsMarquee';
import { TrackGrowingTrend } from '@/components/WelcomeComponents/TrackGrowingTrend';
import useSWR from 'swr';
import FindCreators from '@/components/WelcomeComponents/FindCreators';
import StartExploring from '@/components/WelcomeComponents/StartExploring';

export default function Home() {
  const { data: artistProfiles } = useSWR<{
    status: string;
    response: { data: ArtistProfile[]; has_next: boolean };
  }>(
    `${process.env.API_URL}artists?page=1&limit=30`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    { refreshInterval: -1 }
  );

  const { data: randomArtist } = useSWR<{
    status: string;
    response: ArtistProfile;
  }>(
    `${process.env.API_URL}artists/random`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  return (
    <>
      <NextSeo
        title="Home"
        description="Track, share and grow together with community of talented pixel-related artists!"
      />
      <Hero artist={randomArtist?.response} />
      <div className="mt-16 md:mt-16 lg:mt-32">
        <ArtistsMarquee artists={artistProfiles?.response.data} />
      </div>
      <section className="m-auto my-16 flex w-full max-w-7xl flex-col items-center justify-center gap-8 md:my-16 md:gap-16 md:px-10 lg:my-32 lg:px-0">
        <FindCreators />
        <TrackGrowingTrend artist={randomArtist?.response} />
      </section>
      <StartExploring />
    </>
  );
}
