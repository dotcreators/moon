import { useState } from 'react';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import useSWR from 'swr';
import { CustomArtistListCardSmall } from '../CustomArtistListCardSmall';
import { SearchQ } from '@/components/Search/SearchContainer/SearchQ';
import { SearchItem } from '@/components/Search/SearchContainer/SearchItem';
import { filterDataSort } from '@/components/Other/FiltersData';
import ArtistListCardSkeletonLoader from '@/components/Artists/ArtistCard/ArtistListCardSkeletonLoader';

export default function ArtistSearchPanel() {
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<string>('Followers');
  const [searchQ, setSearchQ] = useState<string>('');

  const { data: artistProfiles, isLoading } = useSWR<{
    items: ArtistProfile[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }>(
    `${process.env.API_URL}artists/search?page=1&perPage=8&sortBy=${selectedSortFilter.toLowerCase()}${searchQ ? '&username=' + searchQ : ''}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  console.log(artistProfiles, isLoading);
  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex w-full flex-col items-center gap-3 md:flex-row">
          <div className="w-full">
            <SearchQ onQChanges={setSearchQ} />
          </div>
          <div className="w-full grow">
            <SearchItem
              title="Sort by"
              isDropdown={true}
              filtersData={filterDataSort}
              isMultiSelect={false}
              defaultSelectedValue={[selectedSortFilter]}
              withResetButton={false}
              selectedValuesUpdate={(filter: string | string[]) =>
                setSelectedSortFilter(filter as string)
              }
            />
          </div>
        </div>

        {isLoading
          ? [...Array(8)].map((_, index) => (
              <ArtistListCardSkeletonLoader key={index} />
            ))
          : artistProfiles &&
            artistProfiles.items.map(artist => (
              <CustomArtistListCardSmall key={artist.id} artist={artist} />
            ))}
      </section>
    </>
  );
}
