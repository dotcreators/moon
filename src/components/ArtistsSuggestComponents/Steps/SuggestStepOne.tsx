import useDebounce from '@/utils/hooks/useDebounce';
import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import RiAtLine from '~icons/ri/at-line';
import RiRefreshLine from '~icons/ri/refresh-line';
import { SuggestArtistCard } from '../SuggestArtistCard';

interface Props {
  onArtistFetched: Function;
  onNextStepAllowed: Function;
  className?: string;
}

export const SuggestStepOne: FC<Props> = props => {
  const [searchArtistTag, setSearchArtistTag] = useState<string | null>(null);
  const [fetchedArtistsProfile, setFetchedArtistsProfile] = useState<
    FetchedArtistProfile | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<
    { message: string; error: boolean } | undefined
  >(undefined);

  // Username search debouncer
  const debouncedValue = useDebounce(searchArtistTag, 600);
  useEffect(() => {
    if (searchArtistTag) {
      fetchArtistData(searchArtistTag.replace(/ /g, ''));
    }
  }, [debouncedValue]);

  // Update fetch request after username tag changes
  useEffect(() => {
    setIsLoading(false);
    setFetchedArtistsProfile(undefined);
    props.onArtistFetched(undefined);
    props.onNextStepAllowed(false);
    setIsError(undefined);

    if (searchArtistTag) {
      setIsLoading(true);
    }
  }, [searchArtistTag]);

  async function fetchArtistData(tag: string) {
    if (!tag) {
      setIsLoading(false);
      setIsError(undefined);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.API_URL}fetch/${tag}`);
      const _apiResponse = await res.json();

      if (res.ok && typeof _apiResponse.response !== 'string') {
        setFetchedArtistsProfile(_apiResponse.response);
        props.onArtistFetched(_apiResponse.response);
        props.onNextStepAllowed(true);
        setIsError(undefined);
        console.log('ok:fetchedArtistsProfile', fetchedArtistsProfile);
        console.log('ok:_apiResponse.response', _apiResponse.response);
      } else {
        setIsError({
          message:
            typeof _apiResponse.response === 'string'
              ? _apiResponse.response
              : 'Unknown error',
          error: true,
        });
        props.onArtistFetched(undefined);
        props.onNextStepAllowed(false);
        console.log('!ok:fetchedArtistsProfile', fetchedArtistsProfile);
      }
    } catch (error) {
      setIsError({ message: 'Failed to fetch data', error: true });
      props.onArtistFetched(undefined);
      props.onNextStepAllowed(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className={classNames('flex w-full flex-col gap-5', props.className)}
    >
      <label className="flex w-full flex-col gap-2">
        <span className="mx-3 text-sm text-zinc-400">Input user tag</span>
        <div className="flex flex-row items-center gap-3">
          <section className="h-15 flex w-full flex-row items-center gap-3 rounded-3xl bg-dot-secondary p-3 px-5">
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
        {fetchedArtistsProfile &&
        !isError &&
        (searchArtistTag !== undefined || searchArtistTag !== '') ? (
          <SuggestArtistCard
            avatar={fetchedArtistsProfile.images.avatar}
            followers={fetchedArtistsProfile.followersCount}
            posts={fetchedArtistsProfile.tweetsCount}
            user={{
              username: fetchedArtistsProfile.username,
              name: fetchedArtistsProfile.name || '',
            }}
            country={undefined}
            tags={undefined}
          />
        ) : (
          <section
            className={classNames(
              'animation-all relative grid h-28 w-full place-items-center gap-5 overflow-hidden rounded-2xl bg-dot-secondary p-5',
              {
                hidden: !isError && !isLoading,
              }
            )}
          >
            {isLoading ? (
              // TODO: create skeleton loader or smth other
              <RiRefreshLine className={classNames('animate-spin text-xl')} />
            ) : (
              isError &&
              isError.error == true && (
                <p className="text-xs font-medium text-rose-500">
                  {isError.message === 'rest_id not found.'
                    ? 'User not found.'
                    : isError.message}
                </p>
              )
            )}
          </section>
        )}
      </section>
    </section>
  );
};
