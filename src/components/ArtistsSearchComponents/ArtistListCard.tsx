import classNames from "classnames"
import Image from "next/image"
import { FC, useState } from "react"
import RiImage2Line from '~icons/ri/image-2-line'
import RiUserHeartLine from '~icons/ri/user-heart-line'
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line'
import RiExternalLinkLine from '~icons/ri/external-link-line'
import Link from "next/link"
import RiLoader5Line from '~icons/ri/loader-5-line'
import { ArtistProfile } from "@/utils/models/ArtistProfile"

interface Props {
    place: number,
    artist: ArtistProfile,
    isSmall: boolean,
    className?: string
}

export const ArtistListCard: FC<Props> = (props) => {
    const [isImageLoaded, setImageLoaded] = useState<boolean>(false);

    function formatValue(value: number): string {
        if (value >= 1000) {
            return `${Math.floor(value / 1000)}.${Math.floor(value % 1000 / 100)}K`
        } else {
            return value.toString();
        }
    }

    return (
        <>
            <section className={classNames("group/main overflow-hidden md:hover:bg-dark-inner-hover md:hover:cursor-pointer duration-200 animation-all ease-in-out bg-dark-inner px-5 p-2 flex flex-row justify-between gap-5 items-center w-full", props.className, {"rounded-2xl ": !props.isSmall})}>
                <div className={classNames("flex flex-row items-center", {"gap-4": props.isSmall, "gap-5 ": !props.isSmall})}>
                    {/* <p className="text-sm text-zinc-400">{props.place}</p> */}
                    {
                        props.artist.country &&
                        <Image
                            alt={`${props.artist.country}`}
                            src={`https://flagcdn.com/${props.artist.country.toLowerCase()}.svg`}
                            width={24}
                            height={20}
                            className={"rounded-md h-5 w-7"}
                        />
                    }
                    <Link href={props.artist.url} target="_blank" className="group relative">
                        <div className="overflow-hidden relative rounded-full z-10">
                            <Image
                                alt="img"
                                src={props.artist.images.avatar}
                                width={35}
                                height={35}
                                draggable={false}
                                onLoad={() => setImageLoaded(true)}
                                className={classNames("z-20 group-hover:opacity-0 transition-opacity duration-200 ease-in-out", {"w-10 h-10": !props.isSmall, "w-8 h-8": props.isSmall})}
                            />
                            <Image
                                alt="img"
                                src={props.artist.images.avatar}
                                width={35}
                                height={35}
                                draggable={false}
                                className={classNames("-z-10 w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-md transition-opacity duration-200 ease-in-out", {"w-10 h-10": !props.isSmall, "w-8 h-8": props.isSmall})}
                            />
                            <RiLoader5Line className={classNames("-z-10 w-10 h-10top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute animate-spin group-hover:opacity-0", {"hidden": isImageLoaded})}/>
                        </div>
                        <RiExternalLinkLine className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out text-sm"/>
                    </Link>
                    <div className={classNames("flex flex-row items-center", {"gap-3": props.isSmall, "gap-5 ": !props.isSmall})}>
                        
                        <h1 className={classNames("flex flex-row gap-1.5 items-center font-hubot-sans font-black truncate text-ellipsis max-w-96", {"text-sm": props.isSmall})}>
                            {props.artist.name}
                        </h1>
                        <p className={classNames("text-zinc-400 truncate text-ellipsis", {"text-sm": props.isSmall})}>@{props.artist.username}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-5 items-center justify-end translate-x-10 md:group-hover/main:translate-x-0 duration-200 ease-in-out transition-transform">
                    <div className={classNames("flex flex-row gap-2 items-center justify-end", {"min-w-20": !props.isSmall, "min-w-16": [props.isSmall]})}>
                        {/* <p className="text-zinc-400"><RiUserHeartLine/></p> */}
                        <h1 className={classNames("", {"text-sm": props.isSmall})}>{formatValue(props.artist.followersCount)}</h1>
                        <p className="text-zinc-400">followers</p>

                    </div>
                    <div className={classNames("flex flex-row gap-2 items-center justify-end", {"min-w-20": !props.isSmall, "min-w-16": [props.isSmall]})}>
                        {/* <p className="text-zinc-400"><RiImage2Line/></p> */}
                        <h1 className={classNames("", {"text-sm": props.isSmall})}>{formatValue(props.artist.tweetsCount)}</h1>
                        <p className="text-zinc-400">posts</p>
                    </div>
                    <RiArrowDownSLine/>
                </div>
            </section>
        </>
    )
}