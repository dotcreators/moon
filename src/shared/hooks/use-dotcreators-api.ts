import { Artist } from '../types/artist';
import { Response } from '../types/response';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSearchStore from './use-search-store';

const API_URL = process.env.API_URL;

type DotcreatorsAPIProps = {
  endpoint: 'getArtistsPaginated' | 'getArtistProfile';
  value?: string;
};

function useDotcreatorsAPI<T extends Artist[] | Artist>({
  endpoint,
  value,
}: DotcreatorsAPIProps): Response<T> | null {
  const [data, setData] = useState<Response<T> | null>(null);

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
    async function getArtistsPaginated() {
      setData(null);

      const query = new URLSearchParams();
      query.append('page', page.toString());
      query.append('perPage', perPage.toString());
      query.append('sortBy', sortBy.toString());

      if (q) query.append('username', q);
      if (country) query.append('country', country.toString());
      if (tags && Array.isArray(tags)) {
        tags.forEach(tag =>
          query.append('tags', tag.toLowerCase().replace(/ /g, ''))
        );
      }

      try {
        router.push(`?${query.toString()}`, { scroll: false });

        const r = await fetch(`${API_URL}/artists/search?${query.toString()}`);
        if (!r.ok) {
          throw new Error(`Error ${r.status}: ${r.statusText}`);
        }

        const d = await r.json();

        if (d.items && !d.errors) {
          setTotalItems(d.totalItems);
          setTotalPages(d.totalPages);
          setData(d as Response<T>);
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function getArtistProfile(twitterUserId: string) {
      setData(null);

      try {
        const r = await fetch(`${API_URL}/artists/search/${twitterUserId}`);
        if (!r.ok) {
          throw new Error(`Error ${r.status}: ${r.statusText}`);
        }

        const d = await r.json();

        if (d.items && !d.errors) {
          setData(d as Response<T>);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (endpoint === 'getArtistsPaginated') {
      getArtistsPaginated();
    } else if (endpoint === 'getArtistProfile' && value) {
      getArtistProfile(value);
    }
  }, [
    q,
    page,
    tags,
    sortBy,
    country,
    perPage,
    endpoint,
    value,
    router,
    setTotalItems,
    setTotalPages,
  ]);

  return data;
}

export { useDotcreatorsAPI };
