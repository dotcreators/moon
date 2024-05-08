import classNames from 'classnames';
import { useState } from 'react';
import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import { SuggestStepOne } from '@/components/ArtistsSuggestComponents/Steps/SuggestStepOne';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import { SuggestStepTwo } from '@/components/ArtistsSuggestComponents/Steps/SuggestStepTwo';
import { SuggestStepThree } from '@/components/ArtistsSuggestComponents/Steps/SuggestStepThree';

export default function Suggest() {
  const steps = ['Select artist', 'Select tags', 'Finish'];
  const [suggestState, setSuggestState] = useState<number>(0);
  const [fetchedArtistsProfile, setFetchedArtistsProfile] = useState<FetchedArtistProfile | undefined>(undefined);
  const [isNextStepAllowed, setIsNextStepAllowed] = useState<boolean>(false);

  return (
    <>
      <section className="relative mx-auto mt-32 flex h-fit w-full max-w-lg flex-col items-start justify-center gap-16 rounded-2xl bg-dark-inner p-10">
        <section className="flex w-full flex-col gap-8">
          <section className="relative flex h-24 w-full flex-row items-center justify-between gap-3 overflow-hidden rounded-2xl bg-dark-inner-hover p-5 px-10">
            <p className="text-lg">Suggest user</p>
            <img src="/icons/thinking_face_anim.png" alt="Thinking face" width="150" height="150" className="absolute -right-5 -rotate-12" />
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

        <SuggestStepOne
          onArtistFetched={setFetchedArtistsProfile}
          onNextStepAllowed={setIsNextStepAllowed}
          classNames={classNames({ hidden: suggestState !== 0 })}
        />
        {fetchedArtistsProfile && <SuggestStepTwo artist={fetchedArtistsProfile} classNames={classNames('w-full', { hidden: suggestState !== 1 })} />}
        {fetchedArtistsProfile && <SuggestStepThree artist={fetchedArtistsProfile} classNames={classNames('w-full', { hidden: suggestState !== 2 })} />}

        <button
          onClick={() => {
            setSuggestState(suggestState + 1);
            console.log(suggestState);
          }}
          disabled={!isNextStepAllowed}
          className={classNames(
            'group flex w-full flex-row items-center justify-between gap-1 rounded-xl p-2 px-5 font-bold text-dark-bg transition-colors duration-200 ease-in-out',
            {
              'cursor-pointer bg-c-amber-light md:hover:bg-c-amber-dark': isNextStepAllowed,
              'cursor-not-allowed bg-red-500 md:hover:bg-red-600': !isNextStepAllowed,
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
