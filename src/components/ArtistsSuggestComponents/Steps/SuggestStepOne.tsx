import useDebounce from '@/utils/hooks/useDebounce';
import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { SuggestArtistCard } from '../SuggestArtistCard';
import RiAtLine from '~icons/ri/at-line';
import RiRefreshLine from '~icons/ri/refresh-line';

interface Props {
  onArtistFetched: Function;
  onNextStepAllowed: Function;
  classNames?: string;
}

export const SuggestStepOne: FC<Props> = props => {
  const [searchArtistTag, setSearchArtistTag] = useState<string | null>(null);
  const [fetchedArtistsProfile, setFetchedArtistsProfile] = useState<FetchedArtistProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<{ message: string; error: boolean } | undefined>(undefined);

  // Username search debouncer
  const debouncedValue = useDebounce(searchArtistTag, 600);
  useEffect(() => {
    if (searchArtistTag) {
      fetchArtistData(searchArtistTag.replace(/ /g, ''));
    }
  }, [debouncedValue]);

  // Update fetch request after username tag changes
  useEffect(() => {
    if (searchArtistTag) {
      setIsLoading(true);
    }

    setFetchedArtistsProfile(undefined);
    props.onArtistFetched(undefined);
    props.onNextStepAllowed(false);
    setIsError(undefined);
  }, [searchArtistTag]);

  async function fetchArtistData(tag: string) {
    if (tag === undefined || tag === '' || !tag) {
      setIsLoading(false);
      setIsError(undefined);
      return;
    }
    fetch(`${process.env.API_URL}fetch/${tag}`).then(async res => {
      const _apiResponse: {
        status: string;
        response: FetchedArtistProfile | string;
      } = await res.json();

      if (!res.ok) {
        setIsError({
          message: typeof _apiResponse.response === 'string' ? _apiResponse.response : 'error',
          error: true,
        });
        props.onArtistFetched(undefined);
        props.onNextStepAllowed(false);
        setIsLoading(false);
      }

      if (_apiResponse && _apiResponse.response && typeof _apiResponse.response !== 'string') {
        setFetchedArtistsProfile(_apiResponse.response);
        props.onArtistFetched(_apiResponse.response);
        props.onNextStepAllowed(true);
        setIsLoading(false);
        setIsError(undefined);
      }
    });
  }

  return (
    <section className={classNames('flex w-full flex-col gap-5', props.classNames)}>
      <label className="flex w-full flex-col gap-2">
        <span className="mx-3 text-sm text-zinc-400">Input user tag</span>
        <div className="flex flex-row items-center gap-3">
          <section className="h-15 flex w-full flex-row items-center gap-3 rounded-3xl bg-dark-inner-hover p-3 px-5">
            <RiAtLine />
            <div className="flex w-full flex-row items-center">
              <p className="text-zinc-400">twitter.com/</p>
              <input
                onChange={e => setSearchArtistTag(e.target.value)}
                type="search"
                placeholder="tag"
                className="w-full bg-transparent outline-none placeholder:text-zinc-400"
              />
            </div>
          </section>
        </div>
      </label>

      <section>
        {fetchedArtistsProfile && !isError && (searchArtistTag !== undefined || searchArtistTag !== '') ? (
          <SuggestArtistCard
            avatar={fetchedArtistsProfile.avatar}
            followers={fetchedArtistsProfile.followers}
            posts={fetchedArtistsProfile.tweets}
            user={{
              username: fetchedArtistsProfile.user.username,
              name: fetchedArtistsProfile.user.name || '',
            }}
          />
        ) : (
          <section
            className={classNames('animation-all relative grid h-28 w-full place-items-center gap-5 overflow-hidden rounded-2xl bg-dark-inner-hover p-5', {
              hidden: !isError && !isLoading,
            })}
          >
            {isLoading ? (
              // TODO: create skeleton loader or smth other
              <RiRefreshLine className={classNames('animate-spin text-xl')} />
            ) : (
              isError &&
              isError.error == true && (
                <p className="text-xs font-medium text-rose-500">{isError.message === 'rest_id not found.' ? 'User not found.' : isError.message}</p>
              )
            )}
          </section>
        )}
      </section>
    </section>
  );
};
