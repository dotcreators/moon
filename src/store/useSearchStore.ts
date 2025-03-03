import { SelectCountry } from '@/utils/CountryCode';
import { create } from 'zustand';

export interface SearchPage {
  currentPage: number;
  isNext: boolean;
  totalPages: number;
}

export interface SearchFilter {
  sortBy: string;
  page: SearchPage;
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
    page: {
      currentPage: 1,
      isNext: false,
      totalPages: 1,
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
        page: updatedPagination,
      },
    })),
  updateSearchPage: updatedCurrentPage =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        page: {
          ...state.searchFilter.page,
          currentPage: updatedCurrentPage,
        },
      },
    })),
  updateSearchTotalPage: updatedTotalPage =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        page: {
          ...state.searchFilter.page,
          totalPages: updatedTotalPage,
        },
      },
    })),
  updateSearchIsNext: updatedIsNext =>
    set(state => ({
      searchFilter: {
        ...state.searchFilter,
        page: {
          ...state.searchFilter.page,
          isNext: updatedIsNext,
        },
      },
    })),
}));
