import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistListCardHero } from './ArtistListCardHero';
import DotcreatorsLogoHero from './DotcreatorsLogoHero';
import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'framer-motion';
import ArtistListCardHeroSkeleton from './ArtistListCardHeroSkeleton';
import { DotcreatorsLogoResponsive } from '../DotcreatorsLogoResponsive';

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
        className="relative mx-auto flex h-full max-w-7xl flex-col items-center gap-5 pt-[100px] md:pt-32"
      >
        <span className="block md:hidden">
          <DotcreatorsLogoResponsive width={50} height={40} />
        </span>
        <span className="hidden md:block">
          <DotcreatorsLogoResponsive width={100} height={80} />
        </span>
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text text-center font-hubot-sans text-5xl text-transparent uppercase leading-[95.9%] md:max-w-[60%] md:text-7xl">
          The place for pixel artists
        </h1>
        <p className="text-pretty text-center text-xl md:max-w-[40%] md:text-2xl">
          Track, share and grow together <br className="md:hidden" />
          with community of talented <br className="md:hidden" />
          pixel-related artists!
        </p>

        <motion.div
          className="w-full p-3 md:mt-8 md:p-0"
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

      <div className="-z-30 absolute inset-0 h-96 md:h-[1000px] w-full overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={opacityVariantsFill}
          className="-top-10  md:-top-[100px] -translate-x-1/2 absolute left-1/2 h-1/2 w-1/2 md:h-1/2 md:w-1/2 w rounded-full bg-dot-rose blur-3xl md:blur-[256px]"
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
};
