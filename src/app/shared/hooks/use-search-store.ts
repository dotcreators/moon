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
  sortBy: SortFilter | null;
  tags: string[] | null;
  country: string | null;
  page: number;
  perPage: number;
  setQ: (value: string) => void;
  setSortBy: (value: SortFilter) => void;
  setTags: (value: string[]) => void;
  setCountry: (value: string) => void;
  setPage: (value: number) => void;
  setPerPage: (value: number) => void;
};

const useSearchStore = create<SearchStoreProps>(set => ({
  q: '',
  sortBy: 'followers',
  tags: [],
  country: null,
  page: 1,
  perPage: 35,
  setQ: (value: string) => set({ q: value }),
  setSortBy: (value: SortFilter) => set({ sortBy: value }),
  setTags: (value: string[]) => set({ tags: value }),
  setCountry: (value: string) => set({ country: value }),
  setPage: (value: number) => set({ page: value }),
  setPerPage: (value: number) => set({ perPage: value }),
}));

export default useSearchStore;
