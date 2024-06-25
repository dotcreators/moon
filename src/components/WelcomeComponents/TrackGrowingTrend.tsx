import useSWR from 'swr';
import { CustomArtistListCardHero } from './CustomComponents/CustomArtistListCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import RiLoader5Line from '~icons/ri/loader-5-line';

export default function TrackGrowingTrend() {
  const {
    data: artistProfile,
    error,
    isLoading,
  } = useSWR<{
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
      <div className="relative min-h-[622px] overflow-hidden rounded-2xl p-2">
        <div className="grid min-h-[622px] grid-cols-1 place-items-center rounded-2xl border border-dot-white/5 bg-dot-primary/50 p-8">
          {isLoading || error ? (
            <RiLoader5Line className="animate-spin text-xl text-zinc-400" />
          ) : (
            artistProfile && (
              <CustomArtistListCardHero
                artist={artistProfile.response.data[0]}
              />
            )
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
}
