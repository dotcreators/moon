import BentoViewArtistsList from '@/components/BentoComponents/BentoViewArtistsList';
import BentoArtist from '@/components/BentoComponents/BentoArtist';
import BentoSuggestArtist from '@/components/BentoComponents/BentoSuggestArtist';
import BentoWeeklyArtist from '@/components/BentoComponents/BentoWeeklyArtist';
import LiveArtistsFeed from '@/components/LiveArtistsFeed';
import Hero from '@/components/Hero/Hero';
import FindCreators from '@/components/WelcomeComponents/FindCreators';
import TrackGrowingTrend from '@/components/WelcomeComponents/TrackGrowingTrend';
import ArtistsMarquee from '@/components/WelcomeComponents/ArtistsMarquee';

export default function Home() {
  return (
    <>
      <Hero />
      <section className="m-auto my-32 flex w-full max-w-6xl flex-col items-center justify-center gap-16">
        <FindCreators />
        <TrackGrowingTrend />
        {/* <LiveArtistsFeed />
        <section className="grid w-full grid-cols-3 gap-5">
          <BentoArtist />
          <BentoViewArtistsList />
          <BentoWeeklyArtist />
          <BentoSuggestArtist />
        </section> */}
      </section>
      <ArtistsMarquee />
    </>
  );
}
