import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from '@/components/ArtistsSearchComponents/SearchCountries.module.css';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiQuestionMark from '~icons/ri/question-mark';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';
import { useRouter } from 'next/router';

export default function CustomSearchCountries() {
  const [toggleCountries, setToggleCountries] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<SelectCountry>({
    title: 'Germany',
    value: 'DE',
  });
  const [searchText, setSearchText] = useState<string>('');
  const router = useRouter();

  const filteredCountries = countryCodes.filter(country =>
    country.title.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (!router.isReady) return;

    const country = router.query.country as string;
    const foundCountry = countryCodes.find(x => x.value === country);
    if (foundCountry !== undefined) {
      setSelectedCountry(foundCountry);
    }
  }, [router.isReady, router.query.country]);

  return (
    <section className={classNames('overflow-hidden rounded-3xl')}>
      <button
        onClick={() => setToggleCountries(!toggleCountries)}
        className={classNames(
          'h-15 flex w-full flex-row items-center gap-5 bg-dot-primary p-3 px-5 outline-none transition-colors duration-200 ease-in-out',
          {
            'rounded-t-3xl bg-dot-secondary': toggleCountries,
            'rounded-3xl': !toggleCountries,
          }
        )}
      >
        <p>Country</p>
        <div className="flex w-full flex-row items-center justify-end gap-3">
          <section
            className={classNames(
              'flex w-fit cursor-pointer flex-row items-center gap-3 rounded-3xl p-1 px-3 text-sm',
              {
                'bg-dot-tertiary': toggleCountries,
                'bg-dot-secondary': !toggleCountries,
              }
            )}
          >
            <Image
              alt={`${selectedCountry.title}`}
              src={`https://flagcdn.com/${selectedCountry.value.toLowerCase()}.svg`}
              width={24}
              height={20}
              className={'h-5 w-7 rounded-md'}
            />
            <p className="max-w-20 truncate text-ellipsis">
              {selectedCountry.title}
            </p>
          </section>

          <RiArrowDownSLine
            className={classNames(
              'transition-transform duration-200 ease-in-out',
              { 'rotate-180': toggleCountries }
            )}
          />
        </div>
      </button>
    </section>
  );
}
