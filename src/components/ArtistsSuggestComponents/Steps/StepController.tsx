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

export default function StepController() {
  const steps = ['Select artist', 'Select tags', 'Finish'];
  const [currentFormStep, setCurrentFormStep] = useState(0);
  const [fetchedArtistsProfile, setFetchedArtistsProfile] = useState<
    FetchedArtistProfile | undefined
  >(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<SelectCountry>(
    countryCodes[0]
  );
  const [isNextStepAllowed, setIsNextStepAllowed] = useState(false);

  const resetForm = () => {
    setCurrentFormStep(0);
    setFetchedArtistsProfile(undefined);
    setSelectedTags([]);
    setSelectedCountry(countryCodes[0]);
    setIsNextStepAllowed(false);
  };

  const createSuggestion = () => {
    if (!fetchedArtistsProfile) return;

    let _suggestion: any = {};
    _suggestion.username = fetchedArtistsProfile!.user.username;
    _suggestion.avatarUrl = fetchedArtistsProfile!.avatar;
    if (selectedCountry) {
      _suggestion.country = selectedCountry.value.toLocaleLowerCase();
    }
    if (selectedTags.length !== 0) {
      _suggestion.tags = selectedTags.map(tag =>
        tag.replace(/ /g, '').toLocaleLowerCase()
      );
    }

    fetch(`${process.env.API_URL}suggestions/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_suggestion),
    })
      .then(async response => {
        if (response.ok) {
          const resParsed = await response.json();
          if (resParsed.status === 'success') {
            setCurrentFormStep(prev => prev + 1);
          }
        }
      })
      .catch(console.error);
  };

  const handleNextStep = () => {
    if (currentFormStep === steps.length - 1) {
      createSuggestion();
    } else {
      setCurrentFormStep(prev => prev + 1);
    }
  };

  const renderSteps = () => (
    <section className="flex w-full flex-col gap-8">
      <section className="bg-dot-secondary relative flex h-24 w-full flex-row items-center justify-between gap-3 overflow-hidden rounded-2xl p-5 px-10">
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
                'bg-dot-secondary': index > currentFormStep,
              })}
            />
          </div>
        ))}
      </section>
    </section>
  );

  const renderButtons = () => (
    <section className="flex w-full flex-row gap-3">
      {currentFormStep > 0 && (
        <button
          onClick={() => setCurrentFormStep(prev => prev - 1)}
          className="bg-dot-secondary md:hover:bg-dot-tertiary rounded-xl p-2 px-3 transition-colors duration-200 ease-in-out"
        >
          <RiArrowGoBackFill />
        </button>
      )}
      <button
        onClick={handleNextStep}
        disabled={!isNextStepAllowed}
        className={classNames(
          'text-dot-body group flex w-full flex-row items-center justify-between gap-1 rounded-xl p-2 px-5 font-bold transition-colors duration-200 ease-in-out',
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
  );

  return (
    <>
      {currentFormStep !== steps.length ? (
        <section className=" relative mx-auto my-10 flex h-fit w-full max-w-lg flex-col items-start justify-center gap-16 overflow-hidden rounded-2xl bg-dot-primary p-10">
          {renderSteps()}
          <SuggestStepOne
            onArtistFetched={setFetchedArtistsProfile}
            onNextStepAllowed={setIsNextStepAllowed}
            className={classNames({ hidden: currentFormStep !== 0 })}
          />
          {fetchedArtistsProfile && (
            <>
              <SuggestStepTwo
                artist={fetchedArtistsProfile}
                onSelectedCountry={setSelectedCountry}
                onSelectedTags={setSelectedTags}
                className={classNames({
                  hidden: currentFormStep !== 1,
                })}
              />
              <SuggestStepThree
                artist={fetchedArtistsProfile}
                country={selectedCountry}
                tags={selectedTags}
                className={classNames({ hidden: currentFormStep !== 2 })}
              />
            </>
          )}
          {renderButtons()}
        </section>
      ) : (
        <section className="relative mx-auto my-32 flex h-fit w-full max-w-2xl flex-col items-start justify-center overflow-hidden rounded-2xl bg-dot-primary p-10">
          <SuggestStepSuccess
            onAddAnother={() => resetForm()}
            onClose={resetForm}
          />
        </section>
      )}
    </>
  );
}
