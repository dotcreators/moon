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

export const SuggestStepTwo: FC<Props> = props => {
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

      <label className="flex w-full flex-col gap-2">
        <span className="mx-3 text-sm text-zinc-400">Tags</span>
        <section className="grid w-full grid-cols-3 place-items-center overflow-hidden rounded-2xl bg-dark-inner-hover">
          {tags.map((tag, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const borderClass = [row !== 0 ? 'border-t' : '', row !== 2 ? 'border-b' : '', col !== 0 ? 'border-l' : '', col !== 2 ? 'border-r' : ''].join(' ');

            return (
              <button
                key={index}
                onClick={() => selectedTagsHandler(tag)}
                className={classNames('w-full border-dark-inner p-3 py-5 transition-colors duration-200 ease-in-out ', borderClass, {
                  'col-span-3': index + 1 === tags.length,
                  'bg-dark-double-inner md:hover:bg-dark-double-inner-hover': selectedTags.includes(tag),
                  'md:hover:bg-dark-double-inner': !selectedTags.includes(tag),
                })}
              >
                {tag}
              </button>
            );
          })}
        </section>
      </label>

      <label className="flex w-full flex-col gap-2">
        <span className="mx-3 text-sm text-zinc-400">Country</span>
        <SuggestCountries onCountryChanges={setSelectedCountry} />
      </label>
    </section>
  );
};
