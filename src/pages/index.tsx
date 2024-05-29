import BentoViewArtistsList from '@/components/BentoComponents/BentoViewArtistsList';
import BentoArtist from '@/components/BentoComponents/BentoArtist';
import BentoSuggestArtist from '@/components/BentoComponents/BentoSuggestArtist';
import BentoWeeklyArtist from '@/components/BentoComponents/BentoWeeklyArtist';
import LiveArtistsFeed from '@/components/LiveArtistsFeed';
import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <>
      <div className="mb-32">
        <Hero />
      </div>
      <section className="m-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10">
        <LiveArtistsFeed />
        <section className="grid w-full grid-cols-3 gap-5">
          <BentoArtist />
          <BentoViewArtistsList />
          <BentoWeeklyArtist />
          <BentoSuggestArtist />
        </section>
      </section>
    </>
  );
}
