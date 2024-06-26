import { FC } from 'react';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { CustomArtistListCardHero } from './CustomComponents/CustomArtistListCard';
import RiLoader5Line from '~icons/ri/loader-5-line';

interface Props {
  artist: ArtistProfile | undefined;
}

export const TrackGrowingTrend: FC<Props> = ({ artist: artistProfile }) => {
  return (
    <section className="grid w-full grid-cols-2 items-center gap-16">
      <div className="relative min-h-[500px] overflow-hidden rounded-2xl p-2">
        <div className="grid min-h-[500px] grid-cols-1 place-items-center rounded-2xl border border-dot-white/5 bg-dot-primary/50 p-8">
          {!artistProfile ? (
            <RiLoader5Line className="animate-spin text-xl text-zinc-400" />
          ) : (
            <CustomArtistListCardHero artist={artistProfile} />
          )}
        </div>
        <div className="-bottom-32 -z-10 absolute h-64 w-full rounded-full bg-dot-rose opacity-30 blur-3xl" />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-7xl text-transparent uppercase leading-[95.9%]">
          Track artist grow
        </h1>
        <p className="text-pretty text-2xl">
          Follow the growth trend of your favorite artists and share it with
          everyone!
        </p>
      </div>
    </section>
  );
};
