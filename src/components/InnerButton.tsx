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
        className="flex w-fit flex-row items-center gap-1 rounded-full bg-dark-inner-hover px-8 py-1 text-sm transition-all duration-200 ease-in-out md:hover:bg-dark-double-inner"
      >
        <RiArrowRightUpLine /> {props.title}
      </Link>
    );
  } else {
    return (
      <button className="flex w-fit flex-row items-center gap-1 rounded-full bg-dark-inner-hover px-8 py-1 text-sm transition-all duration-200 ease-in-out md:hover:bg-dark-double-inner">
        <RiArrowRightUpLine /> {props.title}
      </button>
    );
  }
};
