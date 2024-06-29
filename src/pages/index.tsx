import { Hero } from '@/components/HeroComponents/Hero';
import { NextSeo } from 'next-seo';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistsMarquee } from '@/components/WelcomeComponents/ArtistsMarquee';
import { TrackGrowingTrend } from '@/components/WelcomeComponents/TrackGrowingTrend';
import useSWR from 'swr';
import FindCreators from '@/components/WelcomeComponents/FindCreators';
import StartExploring from '@/components/WelcomeComponents/StartExploring';
import { useEffect, useState } from 'react';

export default function Home() {
  const [artistProfiles, setArtistProfiles] = useState<ArtistProfile[]>();
  const [randomArtist, setRandomArtist] = useState<ArtistProfile>();

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.API_URL}artists?page=1&limit=30`).then(
        async response => {
          if (response.ok) {
            const data: {
              status: string;
              response: { data: ArtistProfile[]; has_next: boolean };
            } = await response.json();

            return data.response.data; // Return the array of ArtistProfile objects
          } else {
            throw new Error('Failed to fetch artist profiles');
          }
        }
      ),
      fetch(`${process.env.API_URL}artists/random`).then(async response => {
        if (response.ok) {
          const data: {
            status: string;
            response: ArtistProfile;
          } = await response.json();

          return data.response; // Return the random ArtistProfile object
        } else {
          throw new Error('Failed to fetch random artist');
        }
      }),
    ])
      .then(([artistProfiles, randomArtist]) => {
        setArtistProfiles(artistProfiles);
        setRandomArtist(randomArtist);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <NextSeo
        title="Home"
        description="Track, share and grow together with community of talented pixel-related artists!"
      />
      <Hero artist={randomArtist} />
      <div className="mt-16 md:mt-16 lg:mt-32">
        <ArtistsMarquee artists={artistProfiles} />
      </div>
      <section className="m-auto my-16 flex w-full max-w-7xl flex-col items-center justify-center gap-8 md:my-16 md:gap-16 md:px-10 lg:my-32 lg:px-0">
        <FindCreators />
        <TrackGrowingTrend artist={randomArtist} />
      </section>
      <StartExploring />
    </>
  );
}
