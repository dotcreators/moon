import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { SuggestArtistCard } from '../SuggestArtistCard';
import { searchTagsArray } from '@/utils/Tags';
import { SuggestCountries } from '../SuggestCountries';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';

interface Props {
  artist: FetchedArtistProfile;
  onSelectedCountry: Function;
  onSelectedTags: Function;
  classNames?: string;
}

export const SuggestStepTwo: FC<Props> = props => {
  const tags = searchTagsArray;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<SelectCountry>(countryCodes[0]);

  useEffect(() => {
    props.onSelectedCountry(selectedCountry);
    props.onSelectedTags(selectedTags);
  }, [selectedCountry, selectedTags]);

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
      <section className="flex w-full flex-col gap-2">
        <p className="mx-3 text-sm text-zinc-400">Artist profile</p>
        <SuggestArtistCard
          avatar={props.artist.avatar}
          followers={props.artist.followers}
          posts={props.artist.tweets}
          user={{
            username: props.artist.user.username,
            name: props.artist.user.name || '',
          }}
        />
      </section>

      <section className="flex w-full flex-col gap-2">
        <p className="mx-3 text-sm text-zinc-400">Tags</p>
        <section className="grid w-full grid-cols-3 place-items-center overflow-hidden rounded-2xl bg-dark-inner-hover">
          {tags.map((tag, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const borderClass = [row !== 0 ? 'border-t' : '', row !== 2 ? 'border-b' : '', col !== 0 ? 'border-l' : '', col !== 2 ? 'border-r' : ''].join(' ');

            return (
              <button
                key={tag}
                onClick={() => selectedTagsHandler(tag)}
                className={classNames(
                  'w-full border-dark-inner p-3 py-5 transition-colors duration-200 ease-in-out md:hover:bg-dark-double-inner',
                  borderClass,
                  {
                    'col-span-3': index + 1 === tags.length,
                    'bg-dark-double-inner md:hover:bg-dark-double-inner-hover': selectedTags.includes(tag),
                    'md:hover:bg-dark-double-inner': !selectedTags.includes(tag),
                  }
                )}
              >
                {tag}
              </button>
            );
          })}
        </section>
      </section>

      <section className="flex w-full flex-col gap-2">
        <p className="mx-3 text-sm text-zinc-400">Country</p>
        <SuggestCountries onCountryChanges={setSelectedCountry} />
      </section>
      <p className="text-center text-sm text-zinc-400">Tags and country are optional.</p>
    </section>
  );
};
