import { SearchTags } from './SearchTags'
import { SearchCountries } from './SearchCountries'
import { SearchSortFilters } from './SearchSortFilters'
import { FC, useEffect, useState } from 'react'
import { SearchQ } from './SearchQ'
import { useRouter } from 'next/router'
import RiSearch2Line from '~icons/ri/search-2-line'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  onSearchStringChanges: Function
  searchString: ParsedUrlQuery
}

export const ArtistsSearch: FC<Props> = props => {
  const router = useRouter()

  const [searchQ, setSearchQ] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<{
    title: string
    value: string
  }>({ title: '', value: '' })
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<string>('Followers')

  // useEffect(() => {
  //     const query = new URLSearchParams();

  //     if (searchQ) query.append('q', searchQ);
  //     if (selectedTags.length > 0) {
  //         let tagQuery = '';
  //         selectedTags.forEach((tag, index) => {
  //             tagQuery += tag.toLowerCase().replace(/ /g,'') + (index == selectedTags.length - 1 ? '' : '-');
  //         });

  //         query.append('tags', tagQuery);
  //     }
  //     if (selectedCountry.value) query.append('country', selectedCountry.value.toLowerCase());
  //     if (selectedSortFilter) query.append('sort', selectedSortFilter.toLowerCase());

  //     // router.push(`/lists?${query.toString()}`, undefined, { shallow: true });
  //     props.onSearchStringChanges(query.toString());
  // }, [searchQ, selectedTags, selectedCountry, selectedSortFilter]);

  const fetchFilteredData = async () => {
    const query = new URLSearchParams()

    if (searchQ) query.append('username', searchQ)
    if (selectedTags.length > 0) {
      selectedTags.map(tag =>
        query.append('tags', tag.toLowerCase().replace(/ /g, ''))
      )
    }
    if (selectedCountry.value)
      query.append('country', selectedCountry.value.toLowerCase())
    if (selectedSortFilter)
      query.append('sortBy', selectedSortFilter.toLowerCase())

    router.push(`/lists?${query.toString()}`, undefined, { shallow: true })
    props.onSearchStringChanges(query.toString())
  }

  return (
    <>
      <section className="flex h-fit max-w-96 flex-col gap-3 pb-6">
        <SearchQ onQChanges={setSearchQ} />
        <SearchTags onTagsChanged={setSelectedTags} />
        <SearchCountries onCountryChanges={setSelectedCountry} />
        <SearchSortFilters onSortFilterChanges={setSelectedSortFilter} />
        <button
          onClick={() => fetchFilteredData()}
          style={{ willChange: 'transform' }}
          className="group flex h-14 flex-row items-center justify-between gap-1 rounded-full bg-gradient-to-r from-[#FF9D41] to-[#F97039] p-3 px-5 font-hubot-sans text-dark-bg transition-transform duration-200 ease-in-out md:hover:scale-105"
        >
          Search
          <RiSearch2Line className="transition-transform duration-200 ease-in-out md:group-hover:rotate-12  md:group-hover:scale-125" />
        </button>
      </section>
    </>
  )
}
