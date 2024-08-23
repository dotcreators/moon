import { SelectCountry } from '@/utils/CountryCode';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ImageLoader } from '../Other/ImageLoader';

interface Props {
  user: {
    username: string;
    name: string;
  };
  avatar: string;
  followers: number;
  posts: number;
  isTwitterLink: boolean;
  tags?: string[];
  country?: SelectCountry;
  className?: string;
}

export const SuggestArtistCard: FC<Props> = props => {
  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }

  return (
    <Link
      href={`${props.isTwitterLink ? 'https://twitter.com/' : '/artist/'}${props.user.username}`}
      target={props.isTwitterLink ? '_blank' : '_parent'}
      className={classNames(
        'animation-all group flex w-full flex-col items-center gap-5 rounded-2xl p-5 duration-200 ease-in-out md:hover:cursor-pointer',
        props.className,
        { 'bg-dot-secondary md:hover:bg-dot-tertiary': !props.className }
      )}
    >
      <section className="flex w-full flex-row items-center gap-5">
        <ImageLoader
          alt={'Avatar for ' + props.user.username}
          src={props.avatar}
          width={75}
          height={75}
          className="min-h-[75px] min-w-[75px] rounded-2xl"
        />
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
      </section>

      {!props.country && !props.tags ? (
        <></>
      ) : props.country === undefined &&
        props.tags &&
        props.tags.length === 0 ? (
        <></>
      ) : (
        <section className="flex w-full flex-row flex-wrap gap-1">
          {props.country && (
            <div className="flex flex-row items-center gap-2 rounded-md bg-dot-tertiary p-1 px-3 transition-colors duration-200 ease-in-out group-hover:bg-dot-quaternary">
              <Image
                alt={`${props.country.title}`}
                src={`https://flagcdn.com/${props.country.value.toLowerCase()}.svg`}
                width={20}
                height={12}
                className={'rounded-sm'}
              />
              <p className="text-sm">{props.country.title}</p>
            </div>
          )}
          {props.tags &&
            props.tags.map((tag, index) => (
              <p
                key={index}
                className="rounded-md bg-dot-tertiary p-2 px-4 text-sm transition-colors duration-200 ease-in-out group-hover:bg-dot-quaternary"
              >
                {tag}
              </p>
            ))}
        </section>
      )}
    </Link>
  );
};
