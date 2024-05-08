import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { SuggestArtistCard } from '../SuggestArtistCard';
import { searchTagsArray } from '@/utils/Tags';
import { SuggestCountries } from '../SuggestCountries';

interface Props {
  artist: FetchedArtistProfile;
  classNames?: string;
}

export const SuggestStepThree: FC<Props> = props => {
  const tags = searchTagsArray;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<{
    title: string;
    value: string;
  }>({ title: '', value: '' });

  function selectedTagsHandler(tag: string) {
    if (!selectedTags.includes(tag)) {
      let newGenresArray: string[] = [...selectedTags];
      newGenresArray.push(tag);
      setSelectedTags(newGenresArray);
    } else {
      let newGenresArray: string[] = selectedTags.filter(item => item !== tag);
      setSelectedTags(newGenresArray);
    }
  }

  return (
    <section className={classNames('flex w-full flex-col gap-5', props.classNames)}>
      <label className="flex w-full flex-col gap-2">
        <span className="mx-3 text-sm text-zinc-400">Artist profile</span>
        <SuggestArtistCard
          avatar={props.artist.avatar}
          followers={props.artist.followers}
          posts={props.artist.tweets}
          user={{
            username: props.artist.user.username,
            name: props.artist.user.name || '',
          }}
        />
      </label>
    </section>
  );
};
