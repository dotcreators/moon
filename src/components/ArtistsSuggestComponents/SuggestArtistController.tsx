import { SelectCountry, countryCodes } from '@/utils/CountryCode';
import { FetchedArtistProfile } from '@/utils/models/FetchedArtistProfile';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SuggestStepOne } from './Steps/SuggestStepOne';
import { SuggestStepTwo } from './Steps/SuggestStepTwo';
import { SuggestStepThree } from './Steps/SuggestStepThree';
import Image from 'next/image';
import RiArrowGoBackFill from '~icons/ri/arrow-go-back-fill';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiForbidLine from '~icons/ri/forbid-line';
import { SuggestStepSuccess } from './Steps/SuggestStepSuccess';
import { motion } from 'framer-motion';

export default function SuggestArtistController() {
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
  const [error, setError] = useState<string>('');

  const resetForm = () => {
    setCurrentFormStep(0);
    setFetchedArtistsProfile(undefined);
    setSelectedTags([]);
    setSelectedCountry(countryCodes[0]);
    setIsNextStepAllowed(false);
  };

  const createSuggestion = async () => {
    if (!fetchedArtistsProfile) return;

    const req = await fetch(
      `${process.env.API_URL}suggestions/check/${fetchedArtistsProfile.username}`
    );
    const res = await req.json();

    if (res.response === true) {
      setError('Artist is alredy exists or suggested!');
      return;
    }

    let _suggestion: any = {};
    _suggestion.username = fetchedArtistsProfile.username;
    _suggestion.avatarUrl = fetchedArtistsProfile.images.avatar;
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

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleNextStep = () => {
    if (currentFormStep === steps.length - 1) {
      createSuggestion();
    } else {
      setCurrentFormStep(prev => prev + 1);
    }
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    setError('');
  }, [currentFormStep]);

  const renderSteps = () => (
    <section className="flex w-full flex-col gap-5 md:gap-8">
      <section className="relative flex h-24 w-full flex-row items-center justify-between gap-3 overflow-hidden rounded-2xl bg-dot-secondary p-5 md:px-10">
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
    <div className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-row gap-3">
        {currentFormStep > 0 && (
          <button
            onClick={() => setCurrentFormStep(prev => prev - 1)}
            className="rounded-xl bg-dot-secondary p-2 px-3 transition-colors duration-200 ease-in-out md:hover:bg-dot-tertiary"
          >
            <RiArrowGoBackFill />
          </button>
        )}
        <button
          onClick={handleNextStep}
          disabled={!isNextStepAllowed}
          type="submit"
          className={classNames(
            'group flex w-full flex-row items-center justify-between gap-1 rounded-xl p-2 px-5 font-bold text-dot-body transition-colors duration-200 ease-in-out',
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
          {currentFormStep === steps.length - 1 ? 'Submit' : 'Next'}
          {!isNextStepAllowed ? <RiForbidLine /> : <RiArrowRightLine />}
        </button>
      </div>
      {error && <p className="text-sm text-dot-rose">{error}</p>}
    </div>
  );

  return (
    <>
      {currentFormStep !== steps.length ? (
        <motion.section
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={slideUpVariants}
          className="relative mx-auto flex h-full min-h-[30rem] w-full max-w-lg flex-col items-start justify-between gap-8 overflow-hidden rounded-2xl bg-dot-primary p-5 md:my-10 md:gap-16 md:p-10"
        >
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
        </motion.section>
      ) : (
        <motion.section
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={slideUpVariants}
          className="relative mx-auto flex h-full min-h-[30rem] w-full max-w-2xl flex-col items-start justify-center overflow-hidden rounded-2xl bg-dot-primary p-5 md:my-10 md:min-h-max md:p-10"
        >
          <SuggestStepSuccess
            onAddAnother={() => resetForm()}
            onClose={resetForm}
          />
        </motion.section>
      )}
    </>
  );
}
