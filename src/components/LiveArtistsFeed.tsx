import { ArtistSuggestionProfile } from '@/utils/models/ArtistSuggestionProfile';
import classNames from 'classnames';
import Image from 'next/image';
import useSWR from 'swr';
import { motion } from 'framer-motion';

export default function LiveArtistsFeed() {
  const { data: artists, isLoading } = useSWR<{
    status: String;
    response: { data: ArtistSuggestionProfile[]; has_next: boolean };
  }>(
    `${process.env.API_URL}suggestions?page=1&limit=8&requestStatus=all`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    { refreshInterval: 1000 * 3 }
  );

  return (
    <section className="flex w-full flex-row items-center justify-start gap-5 overflow-hidden">
      <div className="flex flex-row items-center gap-2">
        <div className="mx-auto flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-[#7BEF44]/10">
          <div className="h-2 w-2 rounded-full bg-[#7BEF44]/80" />
        </div>
        <p>Live</p>
      </div>
      <section className="flex flex-row gap-3">
        {isLoading ? (
          <>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dot-primary"></div>
          </>
        ) : (
          artists &&
          artists.response.data.map((artist, index) => (
            <motion.div
              key={artist.requestId}
              className="flex h-10 min-w-max flex-row items-center gap-2 rounded-full bg-dot-primary p-1 px-4 text-sm"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Image
                alt={'Avatar for ' + artist.username}
                src={artist.avatarUrl}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              <p
                className={classNames({
                  'text-yellow-300': artist.requestStatus === 'suggested',
                  'text-lime-300': artist.requestStatus === 'approved',
                  'text-red-300': artist.requestStatus === 'declined',
                })}
              >
                {artist.requestStatus}
              </p>
              <p>{artist.username}</p>
            </motion.div>
          ))
        )}
      </section>
    </section>
  );
}
