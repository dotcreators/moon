import { create } from 'zustand';

export interface SearchPagination {
  page: number;
  isNext: boolean;
  totalPages: number;
}

type State = {
  pagination: SearchPagination;
};

type Action = {
  updatePagination: (pagination: State['pagination']) => void;
};

export const usePaginationStore = create<State & Action>(set => ({
  pagination: {
    page: 1,
    isNext: false,
    totalPages: 1,
  },
  updatePagination: newPagination =>
    set(() => ({
      pagination: newPagination,
    })),
}));
