import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";

interface Props {
    user: {
        username: string,
        tag: string,
    },
    avatar: string,
    followers: number,
    posts: number,
    className?: string
}

export const BentoUserCard: FC<Props> = (props) => {
    function formatValue(value: number): string {
        if (value >= 1000) {
            return `${Math.floor(value / 1000)}.${Math.floor(value % 1000 / 100)}K`
        } else {
            return value.toString();
        }
    }
    return (
        <section className={classNames("md:hover:-translate-x-10 md:hover:bg-dark-double-inner md:hover:cursor-pointer duration-200 animation-all ease-in-out bg-dark-inner-hover rounded-2xl p-5 grid grid-cols-2 gap-5 items-center w-[30rem]", props.className)}>
            <div className="flex flex-row gap-5 items-center">
                <Image
                    alt="img"
                    src={props.avatar}
                    width={75}
                    height={75}
                    draggable={false}
                    className="rounded-2xl"
                />
                <div className="max-w-28">
                    <h1 className="font-hubot-sans font-black text-2xl truncate text-ellipsis">{props.user.username}</h1>
                    <p className="text-zinc-400 truncate text-ellipsis">@{props.user.tag}</p>
                </div>
            </div>
            <div className="flex flex-row gap-5 items-center">
                <div>
                    <h1 className="font-hubot-sans font-black text-2xl">{formatValue(props.followers)}</h1>
                    <p className="text-zinc-400">followers</p>
                </div>
                <div>
                    <h1 className="font-hubot-sans font-black text-2xl">{formatValue(props.posts)}</h1>
                    <p className="text-zinc-400">posts</p>
                </div>
            </div>
        </section>
    )
} 