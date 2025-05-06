import { Artist } from '../types/artist';
import { Response } from '../types/response';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSearchStore from './use-search-store';

const API_URL = process.env.API_URL;

type useDotctreatorsAPIProps = {
  endpoint: 'getArtistsPaginated';
};

function useDotctreatorsAPI({ endpoint }: useDotctreatorsAPIProps) {
  const [data, setData] = useState<Response<Artist[]> | null>(null);

  const {
    page,
    perPage,
    country,
    q,
    sortBy,
    tags,
    setTotalItems,
    setTotalPages,
  } = useSearchStore();

  const router = useRouter();

  useEffect(() => {
    async function getArtistsDataPaginated() {
      setData(null);

      const query = new URLSearchParams();

      query.append('page', page.toString());
      query.append('perPage', perPage.toString());
      query.append('sortBy', sortBy.toString());

      if (q) query.append('username', q);
      if (country) query.append('country', country.toString());
      if (tags)
        tags.forEach(tag =>
          query.append('tags', tag.toLowerCase().replace(/ /g, ''))
        );

      router.push(`?${query.toString()}`, { scroll: false });

      const r = await fetch(`${API_URL}/artists/search?${query.toString()}`);
      const d: Response<Artist[]> = await r.json();

      if (d.items && !d.errors) {
        setTotalItems(d.totalItems);
        setTotalPages(d.totalPages);
        setData(d);
      }
    }

    if (endpoint === 'getArtistsPaginated') {
      getArtistsDataPaginated();
    }
  }, [
    q,
    page,
    tags,
    sortBy,
    router,
    country,
    perPage,
    endpoint,
    setTotalItems,
    setTotalPages,
  ]);

  return data;
}

export { useDotctreatorsAPI };
