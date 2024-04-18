import classNames from "classnames";
import { InnerButton } from "../InnerButton";
import Image from "next/image";

export default function BentoArtistsList() {
    return (
        <section className={classNames(
            `h-80 relative overflow-hidden bg-dark-inner p-8 w-full flex flex-col gap-5 rounded-2xl justify-between`)}>
            <h1 className="font-hubot-sans text-2xl w-20">View artists list</h1>
            <Image
              alt=""
              src="/icons/eyes_color.svg"
              width={300}
              height={300}
              draggable={false}
              className="absolute inset-y-0 m-auto -right-24"
            />
            <InnerButton title={'Show'} link="/lists"/>
        </section>
    )
}