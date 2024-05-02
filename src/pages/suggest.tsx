import { SuggestArtistCard } from '@/components/ArtistsSuggestComponents/SuggestArtistCard';
import { BentoUserCard } from '@/components/BentoComponents/BentoUserCard';
import useDebounce from '@/utils/hooks/useDebounce';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import RiAtLine from '~icons/ri/at-line';
import RiRefreshLine from '~icons/ri/refresh-line';
import RiArrowRightLine from '~icons/ri/arrow-right-line';

interface FetchedArtistProfile {
  avatar: string;
  followers: number;
  tweets: number;
  user: {
    username: string;
    name?: string;
  };
}

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
  const [searchArtistTag, setSearchArtistTag] = useState<string>('');
  const [isError, setIsError] = useState<
    { message: string; error: boolean } | undefined
  >({
    message: '__φ(．．)',
    error: false,
  });
  const [fetchedArtistsProfile, setFetchedArtistsProfile] = useState<
    FetchedArtistProfile | undefined
  >(undefined);
  const debouncedValue = useDebounce(searchArtistTag, 600);

  useEffect(() => {
    fetchUser(searchArtistTag);
  }, [debouncedValue]);

  async function fetchUser(tag: string) {
    if (tag === undefined || tag === '' || !tag) {
      setIsError({ error: false, message: '__φ(．．)' });
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
      }

      if (
        _apiResponse &&
        _apiResponse.response &&
        typeof _apiResponse.response !== 'string'
      ) {
        setFetchedArtistsProfile(_apiResponse.response);
        setIsError(undefined);
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
                  {isError ? (
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
                  ) : (
                    <RiRefreshLine
                      className={classNames('animate-spin text-xl')}
                    />
                  )}
                </div>
              </section>
            )}
          </section>
        </section>

        <button
          onClick={() => {}}
          className="group flex w-full flex-row items-center justify-between gap-1 rounded-xl bg-gradient-to-r from-[#FF9D41] to-[#F97039] p-2 px-5 font-bold text-dark-bg transition-transform duration-200 ease-in-out"
        >
          Next
          <RiArrowRightLine />
        </button>
      </section>
    </>
  );
}
