import { ArtistListCard } from "@/components/ArtistsSearchComponents/ArtistListCard";
import { BentoUserCard } from "@/components/BentoComponents/BentoUserCard";
import { ArtistProfile } from "@/utils/models/ArtistProfile";
import { ArtistsSearch } from "@/components/ArtistsSearchComponents/ArtistsSearch";
import useSWR from "swr";
import ArtistListCardLoader from "@/components/ArtistsSearchComponents/ArtistListCardLoader";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Lists() {
    const router = useRouter();

    const [searchString, setSearchString] = useState<string>('')
    const { data, error } = useSWR<{status: string, data: ArtistProfile[]}>(
        `http://127.0.0.1:8787/api/get/users?page=1&count=25&${searchString}`,
        async (input: RequestInfo, init: RequestInit) => {
            const res = await fetch(input, init);
            return res.json();
        }, {}
    );

    const skeletonInstances = 25;

    return (
        <>
            <section className="relative flex flex-row justify-center items-start h-fit gap-5 w-full max-w-7xl m-auto mt-32 p-5">
                <div className="sticky top-16">
                    <ArtistsSearch 
                        searchString={router.query}
                        onSearchStringChanges={setSearchString}/>
                </div>
                {/* <section className="w-full flex flex-col divide-y divide-dark-inner-hover rounded-3xl overflow-hidden"> */}
                <section className="w-full flex flex-col gap-3">
                    {   
                        data ? data.data.map((artist, index) => (
                            <ArtistListCard 
                                key={index}
                                place={index + 1}
                                artist={artist}
                                isSmall={false}
                            />
                        )) 
                        : [...Array(skeletonInstances)].map((inst, index) => <ArtistListCardLoader key={index}/>)
                    }
                    
                </section>
            </section>
        </>
    )
}