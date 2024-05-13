import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import RiCloseLine from '~icons/ri/close-line';

interface Props {
  onModalOpen: Function;
  className?: string;
}

export const SuggestStepSuccess: FC<Props> = props => {
  return (
    <section
      className={classNames(
        'mx-auto flex h-fit w-full flex-col items-start justify-center gap-10 rounded-2xl bg-dark-inner p-10',
        props.className
      )}
    >
      <section className="relative w-full overflow-hidden rounded-2xl bg-dark-inner-hover p-8">
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
      </section>
      <button
        onClick={() => props.onModalOpen(false)}
        className="group flex w-full flex-row items-center justify-between gap-1 rounded-xl bg-dark-inner-hover p-2 px-5 transition-colors duration-200 ease-in-out md:hover:bg-dark-double-inner"
      >
        Close
        <RiCloseLine />
      </button>
    </section>
  );
};
