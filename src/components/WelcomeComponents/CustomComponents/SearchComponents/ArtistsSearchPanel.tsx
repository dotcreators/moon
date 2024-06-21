import { SearchSortFilters } from '../../../ArtistsSearchComponents/SearchContainer/SearchSortFilters';
import { useState } from 'react';
import { SearchQ } from '@/components/ArtistsSearchComponents/SearchContainer/SearchQ';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import useSWR from 'swr';
import { CustomArtistListCardSmall } from '../CustomArtistListCardSmall';
import ArtistListCardLoader from '@/components/ArtistsSearchComponents/ArtistListCardLoader';

export default function ArtistSearchPanel() {
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<string>('Followers');
  const [searchQ, setSearchQ] = useState<string>('');

  const { data: artistProfiles } = useSWR<{
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
        <div className="flex w-full flex-row items-center gap-3">
          <SearchQ onQChanges={setSearchQ} />
          <div className="w-full">
            <SearchSortFilters onSortFilterChanges={setSelectedSortFilter} />
          </div>
        </div>

        {artistProfiles
          ? artistProfiles.response.data.map(artist => (
              <CustomArtistListCardSmall key={artist.id} artist={artist} />
            ))
          : [...Array(8)].map((_, index) => (
              <ArtistListCardLoader key={index} />
            ))}
      </section>
    </>
  );
}
