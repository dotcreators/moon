import { ChangeEvent, HTMLAttributes, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import useSearchStore, { SortFilter } from '@/shared/hooks/use-search-store';
import Select from '../components/select';
import Pagination from '../components/pagination';
import useDebounce from '@/shared/hooks/use-debounce';
import { SEARCH_FILTERS_DATA } from '../components/search-filters-data';

function Search({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { q, setQ, country, setCountry, tags, setTags, sortBy, setSortBy } =
    useSearchStore();
  const [searchQ, setSearchQ] = useState<string>(q ?? '');
  const debouncedSearchQ = useDebounce(searchQ, 300);

  useEffect(() => {
    setQ(debouncedSearchQ);
  }, [debouncedSearchQ, setQ]);

  return (
    <div className={twJoin('grid grid-cols-2 gap-2', className)} {...props}>
      <Select.Input
        value={searchQ}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQ(e.target.value)
        }
        type="search"
        placeholder="Input artist username..."
      />
      <Select.Item
        items={SEARCH_FILTERS_DATA.sortBy}
        label="Sort by"
        isDefaultValueNode={true}
        selectedValue={sortBy ? [sortBy] : []}
        onSelectedItem={(value: string | string[]) =>
          setSortBy(
            Array.isArray(value)
              ? (value[0] as SortFilter)
              : (value as SortFilter)
          )
        }
      />
      <Select.Item
        items={[]}
        label="Country"
        isDefaultValueNode={true}
        selectedValue={country ? [country] : []}
        onSelectedItem={(value: string | string[]) =>
          setCountry(Array.isArray(value) ? value[0] : value)
        }
      />
      <Select.Item
        items={SEARCH_FILTERS_DATA.tags}
        label="Tags"
        isDefaultValueNode={true}
        isMultiselect={true}
        selectedValue={tags ? tags : []}
        onSelectedItem={(value: string | string[]) =>
          setTags(Array.isArray(value) ? value : [value])
        }
      />
    </div>
  );
}

Search.Pagination = Pagination;

export default Search;
