import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
import RiAddLine from '~icons/ri/add-line';

interface Props {
  onAddAnother: Function;
  onClose: Function;
  className?: string;
}

export const SuggestStepSuccess: FC<Props> = props => {
  return (
    <section
      className={classNames(
        'mx-auto flex h-fit w-full flex-col items-start justify-center gap-10 rounded-2xl bg-dark-inner',
        props.className
      )}
    >
      <div className="relative w-full overflow-hidden rounded-2xl bg-dark-inner-hover p-8">
        <div className="flex max-w-64 flex-col gap-3">
          <h1 className="text-lg">Thank you for artist suggestion!</h1>
          <p className="text-zinc-400">
            We will review your suggestion shortly and upon review author will
            appear on artist list.
          </p>
        </div>
        <Image
          src="/icons/party_popper_anim.png"
          alt="Thinking face"
          width={300}
          height={300}
          draggable={false}
          className="absolute -right-20 -top-10"
        />
      </div>
      <div className="flex w-full flex-row gap-5">
        <Link
          href="/lists"
          className="group flex w-full flex-row items-center justify-between gap-1 rounded-xl bg-dark-inner-hover p-2 px-5 transition-colors duration-200 ease-in-out md:hover:bg-dark-double-inner"
        >
          Back to artists
          <RiArrowRightUpLine />
        </Link>
        <button
          onClick={() => {
            props.onAddAnother();
          }}
          className={classNames(
            'group flex w-full flex-row items-center justify-between gap-1 rounded-xl bg-lime-400 p-2 px-5 font-bold text-dark-bg transition-colors duration-200 ease-in-out md:hover:bg-lime-200'
          )}
        >
          Suggest more
          <RiAddLine />
        </button>
      </div>
    </section>
  );
};
