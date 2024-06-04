import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import classNames from 'classnames';
import { FC } from 'react';
import { SuggestArtistCard } from '../SuggestArtistCard';
import { SelectCountry } from '@/utils/CountryCode';

interface Props {
  artist: FetchedArtistProfile;
  country: SelectCountry | undefined;
  tags: string[] | undefined;
  className?: string;
}

export const SuggestStepThree: FC<Props> = props => {
  return (
    <section
      className={classNames('flex w-full flex-col gap-5', props.className)}
    >
      <label className="flex w-full flex-col gap-2">
        <span className="mx-3 text-sm text-zinc-400">Artist profile</span>
        <SuggestArtistCard
          avatar={props.artist.images.avatar}
          followers={props.artist.followersCount}
          posts={props.artist.tweetsCount}
          user={{
            username: props.artist.username,
            name: props.artist.name || '',
          }}
          country={props.country}
          tags={props.tags}
        />
      </label>
    </section>
  );
};
