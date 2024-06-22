import { ArtistListCard } from '@/components/ArtistsSearchComponents/ArtistListCard';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistsSearch } from '@/components/ArtistsSearchComponents/ArtistsSearch';
import useSWR from 'swr';
import ArtistListCardLoader from '@/components/ArtistsSearchComponents/ArtistListCardLoader';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@/components/ArtistsSearchComponents/Pagination';
import RiEmotionUnhappyFill from '~icons/ri/emotion-unhappy-fill';
import { usePaginationStore } from '@/store/usePaginationStore';

export default function Lists() {
  const router = useRouter();
  const [searchString, setSearchString] = useState<string>('');
  const [openedProfileId, setOpenedProfileId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pagination = usePaginationStore();

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

  useEffect(() => {
    if (data) {
      pagination.updatePagination({
        page: currentPage,
        isNext: data.response.has_next,
        totalPages: data.response.total_pages,
      });
    }
  }, [currentPage, data?.response.has_next, data?.response.total_pages]);

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
        <section className="col-span-3 flex w-full flex-col gap-5">
          <Pagination
            currentPage={pagination.pagination.page}
            isNext={pagination.pagination.isNext}
            lastPage={pagination.pagination.totalPages}
            totalResults={data ? data.response.data.length : 0}
            onPageChange={handlePageChange}
          />
          {data && !error ? (
            data && data.response.data.length !== 0 ? (
              data.response.data.map(artist => (
                <ArtistListCard key={artist.userId} artist={artist} />
              ))
            ) : (
              <div className="flex h-16 w-full flex-row items-center justify-center gap-3 rounded-2xl bg-dot-primary p-10 text-zinc-400">
                <RiEmotionUnhappyFill className="text-xl" />
                <p>No results found.</p>
              </div>
            )
          ) : (
            [...Array(25)].map((_, index) => (
              <ArtistListCardLoader key={index} />
            ))
          )}
          <Pagination
            currentPage={pagination.pagination.page}
            isNext={pagination.pagination.isNext}
            lastPage={pagination.pagination.totalPages}
            totalResults={data ? data.response.data.length : 0}
            onPageChange={handlePageChange}
          />
        </section>
      </section>
    </>
  );
}
