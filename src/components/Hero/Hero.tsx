import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistListCardHero } from './ArtistListCardHero';
import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'framer-motion';
import ArtistListCardHeroSkeleton from './ArtistListCardHeroSkeleton';
import { DotcreatorsLogoResponsive } from '../Other/DotcreatorsLogoResponsive';
import GridPattern from '../Other/GridPattern';

interface Props {
  artist: ArtistProfile | undefined;
}

export const Hero: FC<Props> = ({ artist: artistProfile }) => {
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
        className="relative mx-auto flex h-full max-w-7xl flex-col items-center gap-5 pt-[110px] md:px-10 md:pt-32 lg:px-0"
      >
        <span className="block md:hidden">
          <DotcreatorsLogoResponsive width={50} height={40} />
        </span>
        <span className="hidden md:block">
          <DotcreatorsLogoResponsive width={100} height={80} />
        </span>
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text text-center font-hubot-sans text-5xl uppercase leading-[95.9%] text-transparent md:max-w-max md:text-7xl lg:max-w-[60%]">
          The place for pixel artists
        </h1>
        <p className="text-pretty text-center text-xl md:max-w-[60%] lg:max-w-[40%] lg:text-2xl">
          Track, share and grow together <br className="md:hidden" />
          with a community of talented <br className="md:hidden" />
          pixel artists!
        </p>

        <motion.div
          className="w-full p-3"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={slideUpVariantsCard}
        >
          {!artistProfile ? (
            <ArtistListCardHeroSkeleton />
          ) : (
            <ArtistListCardHero artist={artistProfile} />
          )}
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 -z-30 h-96 w-full overflow-hidden md:h-[1000px]">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={opacityVariantsFill}
          className="absolute left-1/2 top-5 h-1/2 w-1/2 -translate-x-1/2 rounded-full bg-dot-rose blur-3xl md:-top-[100px] md:blur-[256px]"
        />
        <motion.div initial="hidden" animate="visible" exit="hidden">
          <GridPattern />
        </motion.div>
      </div>
    </section>
  );
};
