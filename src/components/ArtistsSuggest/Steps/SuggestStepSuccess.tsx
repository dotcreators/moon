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
        'mx-auto flex h-fit w-full flex-col items-start justify-center gap-3 md:gap-10 rounded-2xl bg-dot-primary',
        props.className
      )}
    >
      <div className="grid grid-cols-1 gap-5 place-items-center md:place-items-baseline bg-dot-secondary relative w-full text-center md:text-start overflow-hidden rounded-2xl p-5 md:p-8">
        <div className="flex max-w-64 flex-col gap-2 md:gap-3 order-2">
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
          className="md:absolute md:-right-20 md:-top-10 w-32 md:w-72 order-1"
        />
      </div>
      <div className="grid grid-cols-3 md:flex w-full md:flex-row gap-3 md:gap-5">
        <Link
          href="/artists"
          className="bg-dot-secondary md:hover:bg-dot-tertiary group flex w-full flex-row items-center justify-between gap-1 rounded-xl p-2 px-5 transition-colors duration-200 ease-in-out"
        >
          Back
          <RiArrowRightUpLine />
        </Link>
        <button
          onClick={() => {
            props.onAddAnother();
          }}
          className={classNames(
            'text-dot-body group col-span-2 flex w-full flex-row items-center justify-between gap-1 rounded-xl bg-lime-400 p-2 px-5 font-bold transition-colors duration-200 ease-in-out md:hover:bg-lime-200'
          )}
        >
          Suggest more
          <RiAddLine />
        </button>
      </div>
    </section>
  );
};
