import { ChangeEvent, HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';
import useSearchStore, {
  SortFilter,
} from '@/app/shared/hooks/use-search-store';
import { Select } from '../components/select';
import { SEARCH_FILTERS_DATA } from '@/app/shared/constants/search-filters-data';

function Search({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { q, setQ, country, setCountry, tags, setTags, sortBy, setSortBy } =
    useSearchStore();

  return (
    <div className={twJoin('grid grid-cols-2 gap-2', className)} {...props}>
      <Select.Input
        value={q ? q : ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
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

export { Search };
