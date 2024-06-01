import { SearchSortFilters } from '../../../ArtistsSearchComponents/SearchSortFilters';
import { useState } from 'react';
import RiSearch2Line from '~icons/ri/search-2-line';
import CustomSearch from './CustomSearch';
import CustomSearchCountries from './CustomSearchCountries';

export default function ArtistSearchPanel() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<{
    title: string;
    value: string;
  }>({ title: '', value: '' });
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<string>('Followers');
  const [page, setPage] = useState<number>(1);
  const limit = 50;

  return (
    <>
      <section className="flex flex-col gap-3 overflow-y-auto">
        <section className="h-15 flex flex-row items-center gap-5 rounded-3xl bg-dot-primary p-3 px-5 outline-dot-primary group-focus:outline-2">
          <RiSearch2Line />
          <input
            type="search"
            placeholder="Input artist @tag..."
            className="h-full grow bg-transparent text-zinc-400 outline-none placeholder:text-sm"
          />
        </section>
        <CustomSearch />
        <CustomSearchCountries />
        <SearchSortFilters onSortFilterChanges={setSelectedSortFilter} />
      </section>
    </>
  );
}
