import { FC } from 'react';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { CustomArtistListCardHero } from './CustomComponents/CustomArtistListCardHero';
import RiLoader5Line from '~icons/ri/loader-5-line';

interface Props {
  artist: ArtistProfile | undefined;
}

export const TrackGrowingTrend: FC<Props> = ({ artist: artistProfile }) => {
  return (
    <section className="grid w-full grid-cols-1 items-center gap-5 p-3 text-center md:p-0 lg:grid-cols-2 lg:gap-16">
      <div className="relative order-2 min-h-[500px] overflow-hidden rounded-2xl p-2 lg:order-1">
        <div className="grid min-h-[500px] grid-cols-1 place-items-center rounded-2xl border border-dot-white/5 bg-dot-primary/50 p-3 md:p-8">
          {!artistProfile ? (
            <RiLoader5Line className="animate-spin text-xl text-zinc-400" />
          ) : (
            <CustomArtistListCardHero artist={artistProfile} />
          )}
        </div>
        <div className="absolute -bottom-32 -z-10 h-64 w-full rounded-full bg-dot-rose opacity-30 blur-3xl" />
      </div>
      <div className="order-1 flex flex-col gap-3 md:items-center lg:order-2 lg:items-start">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-5xl uppercase leading-[95.9%] text-transparent md:max-w-[90%] md:text-7xl lg:max-w-max">
          Track artist grow
        </h1>
        <p className="text-pretty text-xl md:max-w-[70%] md:text-2xl lg:max-w-max">
          Follow the growth trend of your favorite artists and share it with
          everyone!
        </p>
      </div>
    </section>
  );
};
