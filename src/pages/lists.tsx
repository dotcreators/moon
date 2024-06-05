import { ArtistListCard } from '@/components/ArtistsSearchComponents/ArtistListCard';
import { BentoUserCard } from '@/components/BentoComponents/BentoUserCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistsSearch } from '@/components/ArtistsSearchComponents/ArtistsSearch';
import useSWR from 'swr';
import ArtistListCardLoader from '@/components/ArtistsSearchComponents/ArtistListCardLoader';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Lists() {
  const router = useRouter();
  const [searchString, setSearchString] = useState<string>('');
  const { data, error } = useSWR<{
    status: string;
    response: { data: ArtistProfile[]; has_next: boolean };
  }>(
    `${process.env.API_URL}artists?${searchString}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  const skeletonInstances = 25;

  return (
    <>
      <section className="relative m-auto grid h-fit w-full max-w-7xl grid-cols-4 items-start justify-center gap-5 pt-32 ">
        <div className="sticky top-8">
          <ArtistsSearch
            searchString={router.query}
            onSearchStringChanges={setSearchString}
          />
        </div>
        <section className="col-span-3 flex w-full flex-col gap-3">
          {data
            ? data.response.data.map((artist, index) => (
                <ArtistListCard
                  key={index}
                  place={index + 1}
                  artist={artist}
                  isSmall={false}
                />
              ))
            : [...Array(skeletonInstances)].map((inst, index) => (
                <ArtistListCardLoader key={index} />
              ))}
        </section>
      </section>
    </>
  );
}
