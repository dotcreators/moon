import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

interface Props {
  user: {
    username: string;
    name: string;
  };
  avatar: string;
  followers: number;
  posts: number;
  className?: string;
}

export const SuggestArtistCard: FC<Props> = props => {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);

  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }
  return (
    <Link
      href={`https://twitter.com/${props.user.username}`}
      target="_blank"
      className={classNames(
        'animation-all flex h-28 w-full flex-row items-center gap-5 rounded-2xl bg-dark-inner-hover p-5 duration-200 ease-in-out md:hover:cursor-pointer md:hover:bg-dark-double-inner',
        props.className
      )}
    >
      <div className="relative">
        <div
          className={classNames(
            'absolute inset-0 z-20 h-20 w-20 animate-pulse rounded-xl bg-dark-double-inner',
            {
              hidden: isImageLoaded,
            }
          )}
        />
        <Image
          alt={'Avatar of ' + props.user.username}
          src={props.avatar.replace('.jpg', '_bigger.jpg')}
          width={75}
          height={75}
          draggable={false}
          onLoad={() => setImageLoaded(true)}
          className="h-20 w-20 min-w-20 rounded-2xl"
        />
      </div>
      <div className="line-clamp-2 grow">
        <h1 className="truncate font-hubot-sans text-2xl font-black">
          {props.user.name}
        </h1>
        <p className="truncate text-zinc-400">@{props.user.username}</p>
      </div>
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
    </Link>
  );
};
