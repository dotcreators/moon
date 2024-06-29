import SuggestArtistController from '@/components/ArtistsSuggestComponents/SuggestArtistController';
import { NextSeo } from 'next-seo';

export default function Suggest() {
  return (
    <>
      <NextSeo
        title="Suggest artist"
        description="Suggest your favorite artist or yourself."
      />
      <section className="p-3 pt-[100px] md:mt-32 md:p-0 md:px-10 lg:p-0">
        <SuggestArtistController />
      </section>
    </>
  );
}
