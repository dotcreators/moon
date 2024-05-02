import { SuggestArtistCard } from '@/components/ArtistsSuggestComponents/SuggestArtistCard';
import { BentoUserCard } from '@/components/BentoComponents/BentoUserCard';
import useDebounce from '@/utils/hooks/useDebounce';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import RiAtLine from '~icons/ri/at-line';
import RiRefreshLine from '~icons/ri/refresh-line';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';

export default function Suggest() {
  const steps = [
    {
      title: 'Select Twitter user',
      isPassed: true,
    },
    {
      title: 'Select tags',
      isPassed: false,
    },
    {
      title: 'Finish',
      isPassed: false,
    },
  ];
  const [suggestState, setSuggestState] = useState<number>(0);
  const [searchArtistTag, setSearchArtistTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<
    { message: string; error: boolean } | undefined
  >({
    message: '__φ(．．) please select artist',
    error: false,
  });
  const [fetchedArtistsProfile, setFetchedArtistsProfile] = useState<
    FetchedArtistProfile | undefined
  >(undefined);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const debouncedValue = useDebounce(searchArtistTag, 600);

  useEffect(() => {
    if (searchArtistTag) {
      fetchUser(searchArtistTag);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (searchArtistTag) {
      console.log('start');
      setIsLoading(true);
      setIsAllowed(false);
      setFetchedArtistsProfile(undefined);
    }
  }, [searchArtistTag]);

  async function fetchUser(tag: string) {
    if (tag === undefined || tag === '' || !tag) {
      setIsError({ error: false, message: '__φ(．．) please select artist' });
      return;
    }

    setFetchedArtistsProfile(undefined);
    fetch(`http://127.0.0.1:8989/api/v1/fetch/${tag}`).then(async res => {
      const _apiResponse: {
        status: string;
        response: FetchedArtistProfile | string;
      } = await res.json();

      if (!res.ok) {
        setIsError({
          message:
            typeof _apiResponse.response === 'string'
              ? _apiResponse.response
              : 'error',
          error: true,
        });
        setIsAllowed(false);
        setIsLoading(false);
      }

      if (
        _apiResponse &&
        _apiResponse.response &&
        typeof _apiResponse.response !== 'string'
      ) {
        setFetchedArtistsProfile(_apiResponse.response);
        setIsError(undefined);
        setIsAllowed(true);
        setIsLoading(false);
      }
    });
  }

  return (
    <>
      <section className="relative mx-auto mt-32 flex h-fit w-fit max-w-lg flex-col items-start justify-center gap-16 rounded-2xl bg-dark-inner p-10">
        <section className="flex flex-row gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex min-w-36 flex-col gap-1 text-center text-sm"
            >
              <p>{step.title}</p>
              <div
                className={classNames('rounded-full py-1', {
                  'bg-[#FF8C21]': step.isPassed,
                  'bg-dark-inner-hover': !step.isPassed,
                })}
              />
            </div>
          ))}
        </section>

        <section className="flex w-full flex-col gap-5">
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
              <button
                onClick={() => searchArtistTag && fetchUser(searchArtistTag)}
                className="rounded-full bg-dark-inner-hover p-3 transition-colors duration-200 ease-in-out md:hover:bg-dark-double-inner"
              >
                <RiRefreshLine />
              </button>
            </div>
          </label>

          <section>
            {fetchedArtistsProfile &&
            !isError &&
            (searchArtistTag !== undefined || searchArtistTag !== '') ? (
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
              <section className="animation-all grid h-28 w-full place-items-center gap-5 rounded-2xl bg-dark-inner-hover p-5">
                <div className="flex flex-row items-center gap-3">
                  {/* {isError ? (
                    <p
                      className={classNames('text-sm font-medium', {
                        'text-rose-500': isError.error,
                        'text-zinc-400': !isError.error,
                      })}
                    >
                      {isError.message === 'rest_id not found.'
                        ? 'User not found.'
                        : isError.message}
                    </p>
                  ) : isLoading ? (
                    // TODO: create skeleton loader or smth other
                    <RiRefreshLine
                      className={classNames('animate-spin text-xl')}
                    />
                  ) : (
                    <></>
                  )} */}
                  {isLoading ? (
                    // TODO: create skeleton loader or smth other
                    <RiRefreshLine
                      className={classNames('animate-spin text-xl')}
                    />
                  ) : (
                    isError && (
                      <p
                        className={classNames('text-sm font-medium', {
                          'text-rose-500': isError.error,
                          'text-zinc-400': !isError.error,
                        })}
                      >
                        {isError.message === 'rest_id not found.'
                          ? 'User not found.'
                          : isError.message}
                      </p>
                    )
                  )}
                </div>
              </section>
            )}
          </section>
        </section>

        <button
          onClick={() => {}}
          disabled={true}
          className={classNames(
            'group flex w-full flex-row items-center justify-between gap-1 rounded-xl p-2 px-5 font-bold text-dark-bg transition-colors duration-200 ease-in-out',
            {
              'md:hover:bg-c-amber-dark bg-c-amber-light cursor-pointer':
                isAllowed,
              'cursor-not-allowed bg-red-500 md:hover:bg-red-600': !isAllowed,
            }
          )}
        >
          Next
          <RiArrowRightLine />
        </button>
      </section>
    </>
  );
}
