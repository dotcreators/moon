import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import RiCheckLine from '~icons/ri/check-line';

interface Props {
  user: {
    username: string;
    tag: string;
  };
  avatar: string;
  className?: string;
}

export const BentoQueueCard: FC<Props> = props => {
  return (
    <section
      style={{ willChange: 'transform' }}
      className={classNames(
        'card animation-all bg-dot-secondary md:hover:bg-dot-tertiary flex w-[30rem] flex-row items-center gap-5 rounded-2xl p-2 px-5 duration-200 ease-in-out md:hover:scale-110 md:hover:cursor-pointer',
        props.className
      )}
    >
      <div className="rounded-md bg-green-900/50 p-1 text-sm">
        <RiCheckLine className="text-green-300" />
      </div>
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
  );
};
