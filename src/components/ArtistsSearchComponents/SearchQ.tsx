import useDebounce from "@/utils/hooks/useDebounce";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react"
import RiSearch2Line from '~icons/ri/search-2-line'

interface Props {
    onQChanges: Function
}

export const SearchQ: FC<Props> = (props) => {
    const [searchQ, setSearchQ] = useState<string>('');
    const debouncedValue = useDebounce(searchQ, 300);
    
    useEffect(() => {
        props.onQChanges(searchQ);
    }, [debouncedValue]);

    return (
        <section className="h-15 flex flex-row gap-5 items-center bg-dark-inner p-3 px-5 rounded-3xl">
            <RiSearch2Line/>
            <input 
                onChange={(e) => setSearchQ(e.target.value)}
                type="search" 
                placeholder="Input artist @tag..."
                value={searchQ}
                className="bg-transparent outline-none placeholder:text-zinc-400 placeholder:text-sm h-full"
            />
        </section>
    )
}