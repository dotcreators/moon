import { SelectCountry, countryCodes } from '@/utils/CountryCode';
import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { SuggestStepOne } from './SuggestStepOne';
import { SuggestStepTwo } from './SuggestStepTwo';
import { SuggestStepThree } from './SuggestStepThree';
import Image from 'next/image';
import RiArrowGoBackFill from '~icons/ri/arrow-go-back-fill';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiForbidLine from '~icons/ri/forbid-line';
import { SuggestStepSuccess } from './SuggestStepSuccess';
import { motion } from 'framer-motion';

interface Props {
  onModalOpen: boolean;
  setModalOpen: Function;
}

export const StepController: FC<Props> = ({ onModalOpen, setModalOpen }) => {
  const steps = ['Select artist', 'Select tags', 'Finish'];
  const [currentFormStep, setCurrentFormStep] = useState<number>(0);
  const [fetchedArtistsProfile, setFetchedArtistsProfile] = useState<
    FetchedArtistProfile | undefined
  >(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<SelectCountry>(
    countryCodes[0]
  );
  const [isNextStepAllowed, setIsNextStepAllowed] = useState<boolean>(false);

  function resetForm() {
    setCurrentFormStep(0);
    setFetchedArtistsProfile(undefined);
    setSelectedTags([]);
    setSelectedCountry(countryCodes[0]);
    setIsNextStepAllowed(false);
  }

  function createSuggestion() {
    let _artist: any = {};
    _artist.username = fetchedArtistsProfile!.user.username;
    _artist.avatarUrl = fetchedArtistsProfile!.avatar;
    if (selectedCountry) {
      _artist.country = selectedCountry.value.toLocaleLowerCase();
    }
    if (selectedTags) {
      _artist.tags = selectedTags.map(tag =>
        tag.replace(/ /g, '').toLocaleLowerCase()
      );
    }

    fetch(`${process.env.API_URL}suggestions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_artist),
    })
      .then(async response => {
        if (response.ok) {
          let resParsed: { status: string; response: string } =
            await response.json();
          if (resParsed.status === 'success') {
            setCurrentFormStep(currentFormStep + 1);
          }
        }
      })
      .catch(error => console.log(error));
  }

  if (currentFormStep !== steps.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -25, display: 'block' }}
        animate={
          onModalOpen
            ? { opacity: 1, y: 0, display: 'block' }
            : {
                opacity: 0,
                display: 'none',
                transitionEnd: { display: 'none' },
              }
        }
        transition={{ duration: 0.1 }}
        className="fixed top-0 z-20 h-full w-full overflow-y-auto  bg-transparent backdrop-blur-lg backdrop-brightness-[25%]"
      >
        <section className="relative mx-auto my-32 flex h-fit w-full max-w-lg flex-col items-start justify-center gap-16 overflow-hidden overscroll-y-auto rounded-2xl border border-zinc-400/10 bg-dark-inner p-10 shadow-xl">
          <section className="flex w-full flex-col gap-8">
            <section className="relative flex h-24 w-full flex-row items-center justify-between gap-3 overflow-hidden rounded-2xl bg-dark-inner-hover p-5 px-10">
              <p className="text-lg">Suggest artist</p>
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
                <div
                  key={index}
                  className="flex w-full flex-col gap-1 text-center text-sm"
                >
                  <p>{step}</p>
                  <div
                    className={classNames('rounded-full py-1', {
                      'bg-[#FF8C21]': index <= currentFormStep,
                      'bg-dark-inner-hover': index > currentFormStep,
                    })}
                  />
                </div>
              ))}
            </section>
          </section>

          <SuggestStepOne
            onArtistFetched={setFetchedArtistsProfile}
            onNextStepAllowed={setIsNextStepAllowed}
            className={classNames({ hidden: currentFormStep !== 0 })}
          />
          {fetchedArtistsProfile && (
            <>
              <SuggestStepTwo
                artist={fetchedArtistsProfile!}
                onSelectedCountry={setSelectedCountry}
                onSelectedTags={setSelectedTags}
                className={classNames({ hidden: currentFormStep !== 1 })}
              />
              <SuggestStepThree
                artist={fetchedArtistsProfile!}
                country={selectedCountry}
                tags={selectedTags}
                className={classNames({ hidden: currentFormStep !== 2 })}
              />
            </>
          )}

          <section className="flex w-full flex-row gap-3">
            {currentFormStep !== 0 && (
              <button
                onClick={() =>
                  currentFormStep >= 1 &&
                  setCurrentFormStep(currentFormStep - 1)
                }
                className="rounded-xl bg-dark-inner-hover p-2 px-3 transition-colors duration-200 ease-in-out md:hover:bg-dark-double-inner"
              >
                <RiArrowGoBackFill />
              </button>
            )}
            <button
              onClick={() => {
                if (currentFormStep === steps.length - 1) {
                  createSuggestion();
                } else {
                  setCurrentFormStep(currentFormStep + 1);
                }
              }}
              disabled={!isNextStepAllowed}
              className={classNames(
                'group flex w-full flex-row items-center justify-between gap-1 rounded-xl p-2 px-5 font-bold text-dark-bg transition-colors duration-200 ease-in-out',
                {
                  'cursor-pointer bg-c-amber-dark md:hover:bg-c-amber-light':
                    isNextStepAllowed && currentFormStep !== 2,
                  'cursor-pointer bg-lime-400 md:hover:bg-lime-200':
                    isNextStepAllowed && currentFormStep === 2,
                  'cursor-not-allowed bg-red-400 md:hover:bg-red-200':
                    !isNextStepAllowed,
                }
              )}
            >
              {currentFormStep === steps.length - 1 ? 'Finish' : 'Next'}
              {!isNextStepAllowed ? <RiForbidLine /> : <RiArrowRightLine />}
            </button>
          </section>
        </section>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, y: -25, display: 'block' }}
        animate={
          onModalOpen
            ? { opacity: 1, y: 0, display: 'block' }
            : { opacity: 0, transitionEnd: { display: 'none' } }
        }
        transition={{ duration: 0.1 }}
        className="fixed top-0 z-20 h-full w-full overflow-y-auto  bg-transparent backdrop-blur-lg backdrop-brightness-[25%]"
      >
        <section className="relative mx-auto my-32 flex h-fit w-full max-w-2xl flex-col items-start justify-center gap-16 overflow-hidden overscroll-y-auto rounded-2xl border border-zinc-400/10 bg-dark-inner p-10 shadow-xl">
          <SuggestStepSuccess
            onModalOpen={setModalOpen}
            onClose={() => resetForm()}
          />
        </section>
      </motion.div>
    );
  }
};
