import { NextSeo } from 'next-seo';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { FC } from 'react';
import { Hero } from '@/components/Hero/Hero';
import { ArtistsMarquee } from '@/components/Welcome/ArtistsMarquee';
import FindCreators from '@/components/Welcome/FindCreators';
import { TrackGrowingTrend } from '@/components/Welcome/TrackGrowingTrend';
import StartExploring from '@/components/Welcome/StartExploring';
import { GetServerSideProps } from 'next';

interface Props {
  artistProfilesData: ArtistProfile[];
  randomArtistProfileData: ArtistProfile;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [artistProfilesData, randomArtistProfileData] = await Promise.all([
      fetch(`${process.env.API_URL}artists?page=1&limit=30`).then(
        async response => {
          if (response.ok) {
            const data: {
              status: string;
              response: { data: ArtistProfile[]; has_next: boolean };
            } = await response.json();
            return data.response.data;
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
          return data.response;
        } else {
          throw new Error('Failed to fetch random artist');
        }
      }),
    ]);

    return {
      props: {
        artistProfilesData,
        randomArtistProfileData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        artistProfilesData: [],
        randomArtistProfileData: null,
      },
    };
  }
};

const Home: FC<Props> = props => {
  return (
    <>
      <NextSeo
        title="Home"
        description="Track, share and grow together with community of talented pixel-related artists!"
      />
      <Hero artist={props.randomArtistProfileData} />
      <div className="mt-16 md:mt-16 lg:mt-32">
        <ArtistsMarquee artists={props.artistProfilesData} />
      </div>
      <section className="m-auto my-16 flex w-full max-w-7xl flex-col items-center justify-center gap-8 md:my-16 md:gap-16 md:px-10 lg:my-32 lg:px-0">
        <FindCreators />
        <TrackGrowingTrend artist={props.artistProfilesData[0]} />
      </section>
      <StartExploring />
    </>
  );
};

export default Home;
