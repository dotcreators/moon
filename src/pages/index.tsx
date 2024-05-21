import BentoViewArtistsList from '@/components/BentoComponents/BentoViewArtistsList';
import BentoArtist from '@/components/BentoComponents/BentoArtist';
import BentoSuggestArtist from '@/components/BentoComponents/BentoSuggestArtist';
import BentoWeeklyArtist from '@/components/BentoComponents/BentoWeeklyArtist';
import LiveArtistsFeed from '@/components/LiveArtistsFeed';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <>
      <section className="m-auto mt-10 flex w-full max-w-7xl flex-col items-center justify-center">
        <Hero />
        <LiveArtistsFeed />
        <section className="m-5 grid w-full grid-cols-3 gap-5">
          <BentoArtist />
          <BentoViewArtistsList />
          <BentoWeeklyArtist />
          <BentoSuggestArtist />
        </section>
      </section>
    </>
  );
}
