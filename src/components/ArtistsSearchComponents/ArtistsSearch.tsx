import { SearchTags } from "./SearchTags"
import { SearchCountries } from "./SearchCountries"
import { SearchSortFilters } from "./SearchSortFilters"
import { FC, useEffect, useState } from 'react'
import { SearchQ } from "./SearchQ";
import { useRouter } from "next/router"
import RiSearch2Line from '~icons/ri/search-2-line'
import { ParsedUrlQuery } from "querystring";

interface Props {
    onSearchStringChanges: Function,
    searchString: ParsedUrlQuery
}

export const ArtistsSearch: FC<Props> = (props) => {
    const router = useRouter();

    const [searchQ, setSearchQ] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<{title: string, value: string}>({title: '', value: ''});
    const [selectedSortFilter, setSelectedSortFilter] = useState<string>('Followers');
    
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
        const query = new URLSearchParams();

        if (searchQ) query.append('q', searchQ);
        if (selectedTags.length > 0) {
            let tagQuery = '';
            selectedTags.forEach((tag, index) => {
                tagQuery += tag.toLowerCase().replace(/ /g,'') + (index == selectedTags.length - 1 ? '' : '-');
            });

            query.append('tags', tagQuery);
        }
        if (selectedCountry.value) query.append('country', selectedCountry.value.toLowerCase());
        if (selectedSortFilter) query.append('sort', selectedSortFilter.toLowerCase());
    
        router.push(`/lists?${query.toString()}`, undefined, { shallow: true });
        props.onSearchStringChanges(query.toString());
    };

    return (
        <>
            <section className="flex flex-col gap-3 max-w-96 h-fit pb-6">
                <SearchQ onQChanges={setSearchQ}/>
                <SearchTags onTagsChanged={setSelectedTags}/>
                <SearchCountries onCountryChanges={setSelectedCountry}/>
                <SearchSortFilters onSortFilterChanges={setSelectedSortFilter}/>
                <button
                    onClick={() => fetchFilteredData()}
                    style={{willChange: 'transform'}} 
                    className="group h-14 flex flex-row gap-1 justify-between items-center bg-gradient-to-r from-[#FF9D41] to-[#F97039] md:hover:scale-105 transition-transform duration-200 ease-in-out p-3 px-5 text-dark-bg rounded-full font-hubot-sans">
                    Search
                    <RiSearch2Line className="transition-transform duration-200 ease-in-out md:group-hover:rotate-12  md:group-hover:scale-125"/>
                </button>
            </section>
        </>
    )
}