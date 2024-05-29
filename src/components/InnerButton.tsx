import Link from 'next/link';
import { FC } from 'react';
import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';

interface Props {
  title: string;
  func?: Function;
  link?: string;
}

export const InnerButton: FC<Props> = props => {
  if (props.link) {
    return (
      <Link
        href={props.link}
        className="bg-dot-secondary md:hover:bg-dot-tertiary flex w-fit flex-row items-center gap-1 rounded-full px-8 py-1 text-sm transition-all duration-200 ease-in-out"
      >
        <RiArrowRightUpLine /> {props.title}
      </Link>
    );
  } else {
    return (
      <button className="bg-dot-secondary md:hover:bg-dot-tertiary flex w-fit flex-row items-center gap-1 rounded-full px-8 py-1 text-sm transition-all duration-200 ease-in-out">
        <RiArrowRightUpLine /> {props.title}
      </button>
    );
  }
};
