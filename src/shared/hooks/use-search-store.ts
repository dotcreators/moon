import { create } from 'zustand';

export type SortFilter =
  | 'username'
  | 'tweets'
  | 'followers'
  | 'trending'
  | 'new';

const SORT_FILTERS: SortFilter[] = [
  'username',
  'tweets',
  'followers',
  'trending',
  'new',
];

type SearchFilters = {
  q: string | null;
  sortBy: SortFilter;
  tags: string[] | null;
  country: string | null;
  page: number;
  perPage: number;
};

type SearchStoreProps = SearchFilters & {
  totalItems: number;
  totalPages: number;
  setQ: (value: string) => void;
  setSortBy: (value: SortFilter) => void;
  setTags: (value: string[]) => void;
  setCountry: (value: string) => void;
  setPage: (value: number) => void;
  setPerPage: (value: number) => void;
  setTotalItems: (value: number) => void;
  setTotalPages: (value: number) => void;
  setFilters: (value: Partial<SearchFilters>) => void;
};

function parsePositiveInt(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function parseSearchFilters(params: URLSearchParams): Partial<SearchFilters> {
  const filters: Partial<SearchFilters> = {};

  const page = parsePositiveInt(params.get('page'));
  if (page) filters.page = page;

  const perPage = parsePositiveInt(params.get('perPage'));
  if (perPage && perPage <= 100) filters.perPage = perPage;

  const sortBy = params.get('sortBy');
  if (sortBy && SORT_FILTERS.includes(sortBy as SortFilter)) {
    filters.sortBy = sortBy as SortFilter;
  }

  const q = params.get('username');
  if (q) filters.q = q;

  const country = params.get('country');
  if (country) filters.country = country.toUpperCase();

  const tags = params.getAll('tags').filter(Boolean);
  if (tags.length > 0) filters.tags = tags;

  return filters;
}

const useSearchStore = create<SearchStoreProps>(set => ({
  q: '',
  sortBy: 'followers',
  tags: [],
  country: null,
  page: 1,
  perPage: 35,
  totalItems: 1,
  totalPages: 1,
  setQ: (value: string) =>
    set(state => (state.q === value ? state : { q: value, page: 1 })),
  setSortBy: (value: SortFilter) => set({ sortBy: value }),
  setTags: (value: string[]) =>
    set(state =>
      (state.tags ?? []).join(',') === value.join(',')
        ? state
        : { tags: value, page: 1 }
    ),
  setCountry: (value: string) =>
    set(state =>
      state.country === value ? state : { country: value, page: 1 }
    ),
  setPage: (value: number) => set({ page: value }),
  setPerPage: (value: number) => set({ perPage: value }),
  setTotalItems: (value: number) => set({ totalItems: value }),
  setTotalPages: (value: number) => set({ totalPages: value }),
  setFilters: (value: Partial<SearchFilters>) => set(value),
}));

export { parseSearchFilters };
export default useSearchStore;
