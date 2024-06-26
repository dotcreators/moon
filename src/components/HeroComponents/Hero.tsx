import { ArtistProfile } from '@/utils/models/ArtistProfile';
import useSWR from 'swr';
import { ArtistListCardHero } from './ArtistListCardHero';
import DotcreatorsLogoHero from './DotcreatorsLogoHero';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ArtistListCardHeroSkeleton from './ArtistListCardHeroSkeleton';

export default function Hero() {
  const usernames = ['cyan'];
  const [username] = useState<string>(usernames[0]);

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

  const slideUpVariantsCard = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const opacityVariantsBg = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const opacityVariantsFill = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.2, transition: { duration: 1 } },
  };

  return (
    <section className="relative">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={slideUpVariants}
        className="relative mx-auto flex h-full max-w-7xl flex-col items-center gap-5 pt-32"
      >
        <DotcreatorsLogoHero />
        <h1 className="max-w-[60%] text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text text-center font-hubot-sans text-7xl text-transparent uppercase leading-[95.9%]">
          The place for pixel artists
        </h1>
        <p className="max-w-[40%] text-pretty text-center text-2xl">
          Track, share and grow together with community of talented
          pixel-related artists!
        </p>

        <motion.div
          key={username}
          className="mt-8 w-full"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={slideUpVariantsCard}
        >
          {!artistProfile ? (
            <ArtistListCardHeroSkeleton />
          ) : (
            <ArtistListCardHero artist={artistProfile.response.data[0]} />
          )}
        </motion.div>
      </motion.div>

      <div className="-z-30 absolute inset-0 h-[1000px] w-full overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={opacityVariantsFill}
          className="-top-[200px] absolute h-1/2 w-full rounded-full bg-dot-rose blur-[256px]"
        />
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={opacityVariantsBg}
        >
          <Image
            src={'/bg-pattern.webp'}
            alt="Background pattern"
            draggable={false}
            fill={true}
            quality={60}
            className="absolute top-0 object-cover opacity-10"
            priority={true}
          />
        </motion.div>
      </div>
    </section>
  );
}
