import { ArtistListCard } from '@/components/ArtistsSearchComponents/ArtistListCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistsSearch } from '@/components/ArtistsSearchComponents/ArtistsSearch';
import useSWR from 'swr';
import ArtistListCardLoader from '@/components/ArtistsSearchComponents/ArtistListCardLoader';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@/components/ArtistsSearchComponents/Pagination';

export default function Lists() {
  const router = useRouter();
  const [searchString, setSearchString] = useState<string>('');
  const [openedProfileId, setOpenedProfileId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (router.isReady) {
      const { page } = router.query;
      if (page) {
        setCurrentPage(parseInt(page as string, 10));
      }
    }
  }, [router.isReady, router.query]);

  const { data, error } = useSWR<{
    status: string;
    response: { data: ArtistProfile[]; has_next: boolean; total_pages: number };
  }>(
    `${process.env.API_URL}artists?${searchString}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="relative m-auto grid h-fit w-full max-w-7xl grid-cols-4 items-start justify-center gap-5 pt-32">
        <div className="sticky top-8">
          <ArtistsSearch
            searchString={router.query}
            onSearchStringChanges={setSearchString}
            currentPage={currentPage}
          />
        </div>
        <section className="col-span-3 flex w-full flex-col gap-3">
          {data && !error
            ? data.response.data.map(artist => (
                <ArtistListCard key={artist.userId} artist={artist} />
              ))
            : [...Array(50)].map((_, index) => (
                <ArtistListCardLoader key={index} />
              ))}
          <Pagination
            currentPage={currentPage}
            isNext={data ? data.response.has_next : false}
            lastPage={data ? data.response.total_pages : 2}
            onPageChange={handlePageChange}
          />
        </section>
      </section>
    </>
  );
}
