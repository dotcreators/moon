import SuggestArtistController from '@/components/ArtistsSuggestComponents/SuggestArtistController';
import { NextSeo } from 'next-seo';

export default function Suggest() {
  return (
    <>
      <NextSeo
        title="Suggest artist"
        description="Suggest favorite artist or yourself."
      />
      <section className="min-h-screen p-3 pt-[100px] md:p-0 md:px-10 md:pt-32 lg:p-0">
        <SuggestArtistController />
      </section>
    </>
  );
}
