import Image from "next/image"
import { FC } from "react";
import classNames from 'classnames'
import { InnerButton } from "./InnerButton";

interface Props {
    title: string,
    emoji: string,
    additionalEmojis?: string[],
    options?: {
        rotateEmoji?: boolean
        smallHeight?: boolean,
        flipX?: boolean
    }
    button?: {
        title: string,
        href: string,
    },
    className?: string
}

export const BentoItem: FC<Props> = (props) => {

    return (
        <section className={classNames(
            `group md:hover:border-dark-double-inner md:hover:bg-dark-inner-hover min-w-[25rem] transition-all duration-200 ease-in-out relative overflow-hidden bg-dark-inner p-5 w-full flex flex-col gap-5 border border-dark-text/15 rounded-2xl justify-between`, 
            props.className, 
            {'min-h-[25rem]': props.options === undefined, 'min-h-64': props.options && props.options.smallHeight})}>
            <h1 className="font-hubot-sans text-2xl w-20">{props.title}</h1>
            <Image
                alt="Emoji for Bento item"
                src={`/icons/${props.emoji}`}
                width={350}
                height={350}
                draggable={false}
                className={classNames("transition-all duration-200 ease-in-out absolute inset-y-0 m-auto ", {
                    '-scale-x-100': props.options && props.options.flipX, 
                    'rotate-12': props.options && props.options.rotateEmoji, 
                    '-right-24': props.options === undefined, 
                    '-right-16': props.options && props.options.smallHeight
                })}
            />
            { props.button &&
                <InnerButton title={props.button.title} func={() => {}}/>
            }
        </section>
    )
}