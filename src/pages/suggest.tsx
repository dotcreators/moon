import SuggestArtistController from '@/components/ArtistsSuggestComponents/SuggestArtistController';
import { NextSeo } from 'next-seo';

export default function Suggest() {
  return (
    <>
      <NextSeo
        title="Suggest artist"
        description="Suggest favorite artist or yourself."
      />
      <section className="min-h-screen pt-[100px] md:pt-32 p-3 md:p-0">
        <SuggestArtistController />
      </section>
    </>
  );
}
