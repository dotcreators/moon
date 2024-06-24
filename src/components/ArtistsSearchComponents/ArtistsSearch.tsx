import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SearchQ } from './SearchContainer/SearchQ';
import { SearchItemCountries } from './SearchContainer/SearchItemCountries';
import { SearchItem } from './SearchContainer/SearchItem';
import { filterDataSort, filterDataTags } from '@/utils/FiltersData';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';
import { useSearchStore } from '@/store/useSearchStore';

interface SearchQueryParams {
  page?: number;
  sortBy?: string;
  tags?: string | string[];
  country?: string;
  username?: string;
}

interface Props {
  onSearchStringChanges: (searchString: string) => void;
}

export const ArtistsSearch: FC<Props> = ({ onSearchStringChanges }) => {
  const router = useRouter();

  const {
    searchFilter,
    updateSearchFilter,
    updateSearchCountry,
    updateSearchSortBy,
    updateSearchTags,
    updateSearchUsername,
    resetSearchCountry,
  } = useSearchStore();

  useEffect(() => {
    if (!router.isReady) return;

    const { tags, country, sortBy, username, page } =
      router.query as SearchQueryParams;

    const formatTags = typeof tags === 'string' ? [tags] : tags;
    const formatCountry: SelectCountry | undefined = countryCodes.find(
      x => x.value.toLowerCase() === country
    );

    updateSearchFilter({
      username: (username as string) ?? undefined,
      country: formatCountry ?? undefined,
      sortBy:
        (sortBy &&
          sortBy.slice(0, 1).toLocaleUpperCase() +
            sortBy.substring(1, sortBy.length)) ??
        undefined,
      tags:
        (formatTags &&
          formatTags.map((tag: string) =>
            tag === 'workoffers'
              ? 'Work offers'
              : tag.charAt(0).toUpperCase() + tag.slice(1)
          )) ??
        undefined,
      page: {
        currentPage: page || 1,
        isNext: false,
        totalPages: 1,
      },
    });
  }, [router.isReady]);

  useEffect(() => {
    const query = new URLSearchParams();

    query.append('page', searchFilter.page.currentPage.toString());
    query.append('limit', searchFilter.limit.toString());
    query.append('sortBy', searchFilter.sortBy.toLowerCase());

    if (searchFilter.username) query.append('username', searchFilter.username);
    if (searchFilter.tags && searchFilter.tags.length > 0) {
      searchFilter.tags.forEach(tag =>
        query.append('tags', tag.toLowerCase().replace(/ /g, ''))
      );
    }
    if (searchFilter.country)
      query.append('country', searchFilter.country.value.toLowerCase());

    const queryString = query.toString();
    router.push(`/lists?${queryString}`, undefined, { shallow: true });
    onSearchStringChanges(queryString);
  }, [searchFilter]);

  return (
    <section className="flex flex-col gap-3 overflow-y-auto pb-6">
      <SearchQ onQChanges={updateSearchUsername} />
      <SearchItem
        title="Tags"
        isDropdown={false}
        filtersData={filterDataTags}
        isMultiSelect={true}
        defaultSelectedValue={searchFilter.tags}
        selectedValuesUpdate={(filters: string | string[]) =>
          updateSearchTags(filters as string[])
        }
      />
      <SearchItemCountries
        isDropdown={false}
        defaultSelectedValue={searchFilter.country}
        onCountryChanges={country =>
          country ? updateSearchCountry(country) : resetSearchCountry()
        }
      />
      <SearchItem
        title="Sort by"
        isDropdown={false}
        filtersData={filterDataSort}
        isMultiSelect={false}
        defaultSelectedValue={[searchFilter.sortBy]}
        selectedValuesUpdate={(filter: string | string[]) =>
          updateSearchSortBy(filter as string)
        }
      />
    </section>
  );
};
