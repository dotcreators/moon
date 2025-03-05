import { SelectCountry } from '@/utils/CountryCode';
import { create } from 'zustand';

export interface SearchPage {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface SearchFilter {
  sortBy: string;
  pagination: SearchPage;
  perPage: number;
  tags?: string[];
  username?: string;
  country?: SelectCountry;
}

type State = {
  searchFilter: SearchFilter;
};

type Action = {
  updateSearchFilter: (updatedSearchFilter: Partial<SearchFilter>) => void;
  updateSearchUsername: (updatedUsername: string) => void;
  updateSearchTags: (updatedTags: string[]) => void;
  updateSearchCountry: (updatedCountry: SelectCountry) => void;
  updateSearchSortBy: (updatedSortBy: string) => void;
  updateSearchLimit: (updatedLimit: number) => void;
  updateSearchPagination: (updatedPagination: SearchPage) => void;
  updateSearchPage: (updatedCurrentPage: number) => void;
  updateSearchTotalPage: (updatedTotalPage: number) => void;
  updateSearchIsNext: (updatedIsNext: boolean) => void;
  resetSearchCountry: () => void;
};

export const useSearchStore = create<State & Action>(set => ({
  searchFilter: {
    sortBy: 'Followers',
    pagination: {
      page: 1,
      totalPages: 1,
      perPage: 20,
      totalItems: 20,
    },
    perPage: 25,
  },
  updateSearchFilter: updatedSearchFilter =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        ...updatedSearchFilter,
      },
    })),
  updateSearchUsername: updatedUsername =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        username: updatedUsername ?? undefined,
      },
    })),
  updateSearchTags: updatedTags =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        tags: updatedTags ?? undefined,
      },
    })),
  updateSearchCountry: updatedCountry =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        country: updatedCountry ?? undefined,
      },
    })),
  resetSearchCountry: () =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        country: undefined,
      },
    })),
  updateSearchSortBy: updatedSortBy =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        sortBy: updatedSortBy,
      },
    })),
  updateSearchLimit: updatedLimit =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        limit: updatedLimit,
      },
    })),
  updateSearchPagination: updatedPagination =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        pagination: {
          ...state.searchFilter.pagination,
          ...updatedPagination,
        },
      },
    })),
  updateSearchPage: updatedCurrentPage =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        pagination: {
          ...state.searchFilter.pagination,
          page: updatedCurrentPage,
        },
      },
    })),
  updateSearchTotalPage: updatedTotalPage =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        pagination: {
          ...state.searchFilter.pagination,
          totalPages: updatedTotalPage,
        },
      },
    })),
  updateSearchIsNext: updatedIsNext =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        pagination: {
          ...state.searchFilter.pagination,
          isNext: updatedIsNext,
        },
      },
    })),
}));
