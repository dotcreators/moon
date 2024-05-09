import { useState } from 'react';
import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import { SuggestStepOne } from '@/components/ArtistsSuggestComponents/Steps/SuggestStepOne';
import { SuggestStepTwo } from '@/components/ArtistsSuggestComponents/Steps/SuggestStepTwo';
import { SuggestStepThree } from '@/components/ArtistsSuggestComponents/Steps/SuggestStepThree';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiArrowGoBackFill from '~icons/ri/arrow-go-back-fill';
import classNames from 'classnames';
import Image from 'next/image';

export default function Suggest() {
  const steps = ['Select artist', 'Select tags', 'Finish'];
  const [suggestState, setSuggestState] = useState<number>(0);
  const [fetchedArtistsProfile, setFetchedArtistsProfile] = useState<FetchedArtistProfile | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<SelectCountry>(countryCodes[0]);
  const [isNextStepAllowed, setIsNextStepAllowed] = useState<boolean>(false);

  function createSuggestion() {
    fetch(`${process.env.API_URL}suggestions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: fetchedArtistsProfile!.user.username,
        country: selectedCountry.value.toLocaleLowerCase(),
        tags: selectedTags.map(tag => tag.replace(/ /g, '').toLocaleLowerCase()),
      }),
    })
      .then(async response => {
        if (response.ok) {
          let resParsed: { status: string; response: string } = await response.json();
          if (resParsed.status === 'success') {
            console.log('pass');
            setSuggestState(suggestState + 1);
          }
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {suggestState < 3 ? (
        <section className="relative mx-auto mt-32 flex h-fit w-full max-w-lg flex-col items-start justify-center gap-16 rounded-2xl bg-dark-inner p-10">
          <section className="flex w-full flex-col gap-8">
            <section className="relative flex h-24 w-full flex-row items-center justify-between gap-3 overflow-hidden rounded-2xl bg-dark-inner-hover p-5 px-10">
              <p className="text-lg">Suggest user</p>
              <Image
                src="/icons/thinking_face_anim.png"
                alt="Thinking face"
                width={150}
                height={150}
                draggable={false}
                className="absolute -right-5 -rotate-12"
              />
            </section>

            <section className="flex w-full flex-row gap-2">
              {steps.map((step, index) => (
                <div key={index} className="flex w-full flex-col gap-1 text-center text-sm">
                  <p>{step}</p>
                  <div
                    className={classNames('rounded-full py-1', {
                      'bg-[#FF8C21]': index <= suggestState,
                      'bg-dark-inner-hover': index > suggestState,
                    })}
                  />
                </div>
              ))}
            </section>
          </section>

          {suggestState === 0 && <SuggestStepOne onArtistFetched={setFetchedArtistsProfile} onNextStepAllowed={setIsNextStepAllowed} />}
          {fetchedArtistsProfile && suggestState === 1 && (
            <SuggestStepTwo
              artist={fetchedArtistsProfile}
              onSelectedCountry={setSelectedCountry}
              onSelectedTags={setSelectedTags}
              classNames={classNames('w-full')}
            />
          )}
          {fetchedArtistsProfile && suggestState === 2 && (
            <SuggestStepThree artist={fetchedArtistsProfile} country={selectedCountry} tags={selectedTags} classNames={classNames('w-full')} />
          )}

          <section className="flex w-full flex-row gap-3">
            {suggestState !== 0 && (
              <button
                onClick={() => suggestState >= 1 && setSuggestState(suggestState - 1)}
                className="rounded-xl bg-dark-inner-hover p-2 px-3 transition-colors duration-200 ease-in-out md:hover:bg-dark-double-inner"
              >
                <RiArrowGoBackFill />
              </button>
            )}
            <button
              onClick={() => {
                if (suggestState === 2) {
                  createSuggestion();
                } else {
                  setSuggestState(suggestState + 1);
                  console.log(suggestState);
                }
              }}
              disabled={!isNextStepAllowed}
              className={classNames(
                'group flex w-full flex-row items-center justify-between gap-1 rounded-xl p-2 px-5 font-bold text-dark-bg transition-colors duration-200 ease-in-out',
                {
                  'cursor-pointer bg-c-amber-dark md:hover:bg-c-amber-light': isNextStepAllowed && suggestState !== 2,
                  'cursor-pointer bg-lime-400 md:hover:bg-lime-200': isNextStepAllowed && suggestState === 2,
                  'cursor-not-allowed bg-red-400 md:hover:bg-red-200': !isNextStepAllowed,
                }
              )}
            >
              {suggestState === 2 ? 'Finish' : 'Next'}
              <RiArrowRightLine />
            </button>
          </section>
        </section>
      ) : (
        <section className="mx-auto mt-32 flex h-fit w-full max-w-xl flex-col items-start justify-center gap-10 rounded-2xl bg-dark-inner p-10">
          <section className="relative w-full overflow-hidden rounded-2xl bg-dark-inner-hover p-8">
            <div className="flex max-w-64 flex-col gap-3">
              <h1 className="text-lg">Thank you for artist suggestion!</h1>
              <p className="text-zinc-400">We will review your suggestion shortly and upon review author will appear on artist list.</p>
            </div>
            <Image src="/icons/party_popper_anim.png" alt="Thinking face" width={300} height={300} draggable={false} className="absolute -right-20 -top-10" />
          </section>
          <button
            onClick={() => {}}
            className="group flex w-full flex-row items-center justify-between gap-1 rounded-xl bg-dark-inner-hover p-2 px-5 transition-colors duration-200 ease-in-out md:hover:bg-dark-double-inner"
          >
            Close
            <RiArrowRightLine />
          </button>
        </section>
      )}
    </>
  );
}
