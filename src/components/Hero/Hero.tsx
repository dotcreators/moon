import { ArtistProfile } from '@/utils/models/ArtistProfile';
import useSWR from 'swr';
import { ArtistListCardHero } from './ArtistListCardHero';
import DotcreatorsLogo from '../DotcreatorsLogo';
import DotcreatorsLogoHero from './DotcreatorsLogoHero';
import { BentoUserCard } from '../BentoComponents/BentoUserCard';
import Image from 'next/image';

export default function Hero() {
  const { data: artistProfile } = useSWR<{
    status: string;
    response: { data: ArtistProfile[]; has_next: boolean };
  }>(
    `${process.env.API_URL}artists?page=1&limit=1&username=aniv1re`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  return (
    <section className="relative h-screen overflow-hidden">
      {/* {artistProfiles &&
        artistProfiles.response.data.map((artist, index) => (
          <BentoUserCard
            key={index}
            avatar={artist.images.avatar}
            followers={artist.followersCount}
            posts={artist.tweetsCount}
            user={{ tag: artist.username, username: artist.name || '' }}
          />
        ))} */}
      <div className="relative mx-auto flex h-screen max-w-7xl flex-col items-center gap-5 overflow-hidden pt-32">
        <DotcreatorsLogoHero />
        <h1 className="from-dot-rose max-w-[60%] text-pretty bg-gradient-to-b to-zinc-400 bg-clip-text text-center font-hubot-sans text-7xl uppercase leading-[95.9%] text-transparent">
          The place for pixel artists
        </h1>
        <h1 className="max-w-[40%] text-pretty text-center text-2xl">
          Track, share and grow together with community of talented
          pixel-related artists!
        </h1>
        {artistProfile && (
          <div className="absolute -bottom-64 w-full">
            <ArtistListCardHero artist={artistProfile.response.data[0]} />
          </div>
        )}
      </div>
      <div className="bg-dot-rose absolute -bottom-96 -z-10 h-1/2 w-full rounded-full opacity-20 blur-[256px]" />
      <Image
        src={'/bg-pattern.jpeg'}
        alt="Background pattern"
        draggable={false}
        fill={true}
        className="absolute -z-20 opacity-5"
        priority={true}
      />
    </section>
  );
}
