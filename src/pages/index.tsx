import Hero from '@/components/HeroComponents/Hero';
import FindCreators from '@/components/WelcomeComponents/FindCreators';
import TrackGrowingTrend from '@/components/WelcomeComponents/TrackGrowingTrend';
import ArtistsMarquee from '@/components/WelcomeComponents/ArtistsMarquee';
import StartExploring from '@/components/WelcomeComponents/StartExploring';
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home"
        description="Track, share and grow together with community of talented pixel-related artists!"
      />
      <Hero />
      <div className="mt-32">
        <ArtistsMarquee />
      </div>
      <section className="m-auto my-32 flex w-full max-w-7xl flex-col items-center justify-center gap-16">
        <FindCreators />
        <TrackGrowingTrend />
      </section>
      <StartExploring />
    </>
  );
}
