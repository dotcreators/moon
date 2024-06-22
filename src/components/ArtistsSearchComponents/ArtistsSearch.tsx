import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { SearchQ } from './SearchContainer/SearchQ';
import { SearchItemCountries } from './SearchContainer/SearchItemCountries';
import { SearchItem } from './SearchContainer/SearchItem';
import { filterDataSort, filterDataTags } from '@/utils/FiltersData';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';

interface Props {
  onSearchStringChanges: (searchString: string) => void;
  searchString: ParsedUrlQuery;
  currentPage: number;
}

export const ArtistsSearch: FC<Props> = ({
  onSearchStringChanges,
  currentPage,
}) => {
  const router = useRouter();

  const [searchQ, setSearchQ] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<SelectCountry>({
    title: '',
    value: '',
  });
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<string>('Followers');
  const [limit, setLimit] = useState<number>(25);

  useEffect(() => {
    if (!router.isReady) return;

    const { tags, country, sortBy, username } = router.query;

    const foundSortBy = sortBy as string;
    const foundCountry: SelectCountry = countryCodes.find(
      x => x.value.toLowerCase() === country
    ) ?? { title: '', value: '' };

    let foundTags: string[] = [];
    if (tags) {
      if (Array.isArray(tags)) {
        foundTags = tags;
      } else if (typeof tags === 'string') {
        foundTags = [tags];
      }
    }

    if (foundCountry) setSelectedCountry(foundCountry);
    if (foundTags) {
      const formattedTags = foundTags.map(tag =>
        tag === 'workoffers'
          ? 'Work offers'
          : tag.charAt(0).toUpperCase() + tag.slice(1)
      );
      setSelectedTags(formattedTags);
    }
    if (foundSortBy)
      setSelectedSortFilter(
        (foundSortBy.slice(0, 1).toLocaleUpperCase() +
          foundSortBy.substring(1, foundSortBy.length)) as string
      );
    if (username) setSearchQ(username as string);
  }, [router.isReady]);

  useEffect(() => {
    const query = new URLSearchParams();
    query.append('page', currentPage.toString());
    query.append('limit', limit.toString());
    if (searchQ) query.append('username', searchQ);
    if (selectedTags.length > 0) {
      selectedTags.forEach(tag =>
        query.append('tags', tag.toLowerCase().replace(/ /g, ''))
      );
    }
    if (selectedCountry.value)
      query.append('country', selectedCountry.value.toLowerCase());
    if (selectedSortFilter)
      query.append('sortBy', selectedSortFilter.toLowerCase());

    const queryString = query.toString();
    router.push(`/lists?${queryString}`, undefined, { shallow: true });
    onSearchStringChanges(queryString);
  }, [
    currentPage,
    limit,
    searchQ,
    selectedTags,
    selectedCountry,
    selectedSortFilter,
  ]);

  return (
    <section className="flex flex-col gap-3 overflow-y-auto pb-6">
      <SearchQ onQChanges={setSearchQ} />
      <SearchItem
        title="Tags"
        isDropdown={false}
        filtersData={filterDataTags}
        isMultiSelect={true}
        defaultSelectedValue={selectedTags}
        selectedValuesUpdate={(filters: string | string[]) =>
          setSelectedTags(filters as string[])
        }
      />
      <SearchItemCountries
        isDropdown={false}
        defaultSelectedValue={selectedCountry}
        onCountryChanges={setSelectedCountry}
      />
      <SearchItem
        title="Sort by"
        isDropdown={false}
        filtersData={filterDataSort}
        isMultiSelect={false}
        defaultSelectedValue={[selectedSortFilter]}
        selectedValuesUpdate={(filter: string | string[]) =>
          setSelectedSortFilter(filter as string)
        }
      />
    </section>
  );
};
