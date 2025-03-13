import { create } from 'zustand';

export type SortFilter =
  | 'username'
  | 'posts'
  | 'followers'
  | 'trending'
  | 'new'
  | 'ranking';

type SearchStoreProps = {
  q: string | null;
  sortBy: SortFilter;
  tags: string[] | null;
  country: string | null;
  page: number;
  perPage: number;
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
};

const useSearchStore = create<SearchStoreProps>(set => ({
  q: '',
  sortBy: 'followers',
  tags: [],
  country: null,
  page: 1,
  perPage: 35,
  totalItems: 1,
  totalPages: 1,
  setQ: (value: string) => set({ q: value }),
  setSortBy: (value: SortFilter) => set({ sortBy: value }),
  setTags: (value: string[]) => set({ tags: value }),
  setCountry: (value: string) => set({ country: value }),
  setPage: (value: number) => set({ page: value }),
  setPerPage: (value: number) => set({ perPage: value }),
  setTotalItems: (value: number) => set({ totalItems: value }),
  setTotalPages: (value: number) => set({ totalPages: value }),
}));

export default useSearchStore;
