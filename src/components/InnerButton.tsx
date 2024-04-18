import Link from "next/link";
import { FC } from "react"
import RiArrowRightUpLine from "~icons/ri/arrow-right-up-line";

interface Props {
    title: string,
    func?: Function,
    link?: string,
}

export const InnerButton: FC<Props> = (props) => {
    if (props.link) {
        return (
            <Link 
                href={props.link}
                className="flex md:hover:bg-dark-double-inner transition-all duration-200 ease-in-out flex-row gap-1 text-sm items-center bg-dark-inner-hover rounded-full px-8 py-1 w-fit">
                <RiArrowRightUpLine /> {props.title}
            </Link>
        )
    } else {
        return (
            <button className="flex md:hover:bg-dark-double-inner transition-all duration-200 ease-in-out flex-row gap-1 text-sm items-center bg-dark-inner-hover rounded-full px-8 py-1 w-fit">
                <RiArrowRightUpLine /> {props.title}
            </button>
        )
    }
    
}