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
  const [openedProfileId, setOpenedProfileId] = useState<string | null>(null);
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
            ? data.response.data.map(artist => (
                <ArtistListCard key={artist.userId} artist={artist} />
              ))
            : [...Array(25)].map((inst, index) => (
                <ArtistListCardLoader key={index} />
              ))}
        </section>
      </section>
    </>
  );
}
