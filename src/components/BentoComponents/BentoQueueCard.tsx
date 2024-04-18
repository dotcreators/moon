import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import RiCheckLine from '~icons/ri/check-line'

interface Props {
    user: {
        username: string,
        tag: string,
    },
    avatar: string,
    className?: string
}

export const BentoQueueCard: FC<Props> = (props) => {
    return (
        <section 
            style={{willChange: 'transform'}}
            className={classNames("card md:hover:scale-110 md:hover:bg-dark-double-inner md:hover:cursor-pointer duration-200 animation-all ease-in-out bg-dark-inner-hover rounded-2xl p-2 px-5 flex flex-row gap-5 items-center w-[30rem]", props.className)}>
            <div className="bg-green-900/50 p-1 rounded-md text-sm"><RiCheckLine className="text-green-300"/></div>
            <Image
                alt="img"
                src={props.avatar}
                width={40}
                height={40}
                draggable={false}
                className="rounded-full"
            />
            <p className="text-lg">{props.user.username}</p>
            <p className="text-zinc-400">@{props.user.tag}</p>
        </section>
    )
}