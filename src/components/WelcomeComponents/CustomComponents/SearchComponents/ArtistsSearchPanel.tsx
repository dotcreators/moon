import { useState } from 'react';
import { SearchQ } from '@/components/ArtistsSearchComponents/SearchContainer/SearchQ';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import useSWR from 'swr';
import { CustomArtistListCardSmall } from '../CustomArtistListCardSmall';
import ArtistListCardLoader from '@/components/ArtistsSearchComponents/ArtistListCardLoader';
import { SearchItem } from '@/components/ArtistsSearchComponents/SearchContainer/SearchItem';
import { filterDataSort } from '@/utils/FiltersData';

export default function ArtistSearchPanel() {
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<string>('Followers');
  const [searchQ, setSearchQ] = useState<string>('');

  const { data: artistProfiles, isLoading } = useSWR<{
    status: string;
    response: { data: ArtistProfile[]; has_next: boolean };
  }>(
    `${process.env.API_URL}artists?page=1&limit=8&sortBy=${selectedSortFilter.toLowerCase()}${searchQ ? '&username=' + searchQ : ''}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

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
              <ArtistListCardLoader key={index} />
            ))
          : artistProfiles &&
            artistProfiles.response.data.map(artist => (
              <CustomArtistListCardSmall key={artist.id} artist={artist} />
            ))}
      </section>
    </>
  );
}
