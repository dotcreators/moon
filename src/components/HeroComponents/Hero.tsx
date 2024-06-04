import { ArtistProfile } from '@/utils/models/ArtistProfile';
import useSWR from 'swr';
import { ArtistListCardHero } from './ArtistListCardHero';
import DotcreatorsLogoHero from './DotcreatorsLogoHero';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const usernames = ['aniv1re', 'cyan', 'the08games'];
  const [username, setUsername] = useState<string>(usernames[0]);
  let currentItem = 0;
  const SWAP_TIME = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentItem === usernames.length - 1) {
        currentItem = 0;
      } else {
        currentItem += 1;
      }
      setUsername(usernames[currentItem]);
    }, 1000 * SWAP_TIME);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  const { data: artistProfile } = useSWR<{
    status: string;
    response: { data: ArtistProfile[]; has_next: boolean };
  }>(
    `${process.env.API_URL}artists?page=1&limit=1&username=${username}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  const slideUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
        <h1 className="max-w-[60%] text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text text-center font-hubot-sans text-7xl uppercase leading-[95.9%] text-transparent">
          The place for pixel artists
        </h1>
        <p className="max-w-[40%] text-pretty text-center text-2xl">
          Track, share and grow together with community of talented
          pixel-related artists!
        </p>
        {artistProfile && (
          <motion.div
            key={username}
            className="absolute top-[500px] w-full"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideUpVariants}
          >
            <ArtistListCardHero artist={artistProfile.response.data[0]} />
          </motion.div>
        )}
      </div>
      <div className="absolute -top-96 -z-10 h-1/2 w-full rounded-full bg-dot-rose opacity-20 blur-[256px]" />
      <Image
        src={'/bg-pattern.jpeg'}
        alt="Background pattern"
        draggable={false}
        fill={true}
        className="absolute -z-30 opacity-10"
        priority={true}
      />
    </section>
  );
}
