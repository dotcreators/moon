import useSWR from 'swr';
import { CustomArtistListCardHero } from './CustomComponents/CustomArtistListCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';

export default function TrackGrowingTrend() {
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
    <section className="grid w-full grid-cols-2 items-center gap-16">
      <div className="relative overflow-hidden rounded-2xl p-2">
        <div className="rounded-2xl border border-dot-white/5 bg-dot-primary/50 p-8">
          {artistProfile && (
            <CustomArtistListCardHero artist={artistProfile.response.data[0]} />
          )}
        </div>
        <div className="absolute -bottom-32 -z-10 h-64 w-full rounded-full bg-dot-rose opacity-30 blur-3xl" />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-7xl uppercase leading-[95.9%] text-transparent">
          Track artist grow
        </h1>
        <p className="text-pretty text-2xl">
          Follow the growth trend of your favorite artists and share it with
          everyone!
        </p>
      </div>
    </section>
  );
}
