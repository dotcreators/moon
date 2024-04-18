export default function ArtistListCardLoader() {
    return (
        <>
            <section className={"h-14 animate-pulse rounded-xl overflow-hidden bg-dark-inner px-5 p-2 flex flex-row justify-between gap-5 items-center w-full"}>
                <div className={"flex flex-row items-center gap-5"}>
                    <div className="bg-dark-inner-hover h-10 w-10 rounded-full"/>
                    <div className={"flex flex-row items-center gap-3 h-10"}>
                        <div className={"bg-dark-inner-hover h-5 w-48 rounded-full"}/>
                        <div className={"bg-dark-inner-hover h-5 w-28 rounded-full"}/>
                    </div>
                </div>
                <div className="flex flex-row gap-5 items-center justify-end">
                    <div className={"flex flex-row gap-2 items-center justify-end"}>
                        <div className={"bg-dark-inner-hover h-5 w-20 rounded-full"}/>
                        <div className={"bg-dark-inner-hover h-5 w-8 rounded-full"}/>

                    </div>
                    <div className={"flex flex-row gap-2 items-center justify-end"}>
                        <div className={"bg-dark-inner-hover h-5 w-20 rounded-full"}/>
                        <div className={"bg-dark-inner-hover h-5 w-8 rounded-full"}/>
                    </div>
                </div>
            </section>
        </>
    )
}