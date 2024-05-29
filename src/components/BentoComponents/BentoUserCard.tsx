import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import { ImageLoader } from '../ImageLoader';

interface Props {
  user: {
    username: string;
    tag: string;
  };
  avatar: string;
  followers: number;
  posts: number;
  className?: string;
}

export const BentoUserCard: FC<Props> = props => {
  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }
  return (
    <section
      className={classNames(
        'animation-all bg-dot-secondary md:hover:bg-dot-tertiary grid w-[30rem] grid-cols-2 items-center gap-5 rounded-2xl p-5 duration-200 ease-in-out md:hover:-translate-x-10 md:hover:cursor-pointer',
        props.className
      )}
    >
      <div className="flex flex-row items-center gap-5">
        <ImageLoader
          alt={'Avatar for ' + props.user.tag}
          src={props.avatar}
          width={75}
          height={75}
          className="rounded-2xl"
        />
        <div className="max-w-28">
          <h1 className="truncate text-ellipsis font-hubot-sans text-2xl font-black">
            {props.user.username}
          </h1>
          <p className="truncate text-ellipsis text-zinc-400">
            @{props.user.tag}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-5">
        <div>
          <h1 className="font-hubot-sans text-2xl font-black">
            {formatValue(props.followers)}
          </h1>
          <p className="text-zinc-400">followers</p>
        </div>
        <div>
          <h1 className="font-hubot-sans text-2xl font-black">
            {formatValue(props.posts)}
          </h1>
          <p className="text-zinc-400">posts</p>
        </div>
      </div>
    </section>
  );
};
