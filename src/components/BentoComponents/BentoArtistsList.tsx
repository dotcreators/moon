import classNames from 'classnames';
import { InnerButton } from '../InnerButton';
import Image from 'next/image';

export default function BentoArtistsList() {
  return (
    <section
      className={classNames(
        `relative flex h-80 w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl bg-dark-inner p-8`
      )}
    >
      <h1 className="w-20 font-hubot-sans text-2xl">View artists list</h1>
      <Image
        alt=""
        src="/icons/eyes_color.svg"
        width={300}
        height={300}
        draggable={false}
        className="absolute inset-y-0 -right-24 m-auto"
      />
      <InnerButton title={'Show'} link="/lists" />
    </section>
  );
}
