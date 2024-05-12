import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import classNames from 'classnames';
import { FC } from 'react';
import { SuggestArtistCardAlt } from '../SuggestArtistCardAlt';
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
        <SuggestArtistCardAlt
          avatar={props.artist.avatar}
          followers={props.artist.followers}
          posts={props.artist.tweets}
          user={{
            username: props.artist.user.username,
            name: props.artist.user.name || '',
          }}
          country={props.country}
          tags={props.tags}
        />
      </label>
    </section>
  );
};
