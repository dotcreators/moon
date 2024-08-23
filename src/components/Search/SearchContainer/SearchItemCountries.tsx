import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import { SelectCountry, countryCodes } from '@/utils/CountryCode';

interface Props {
  isDropdown: boolean;
  onCountryChanges: (country: SelectCountry | null) => void;
  defaultSelectedValue?: SelectCountry;
  classNames?: string;
}

export const SearchItemCountries: FC<Props> = ({
  isDropdown,
  defaultSelectedValue,
  onCountryChanges,
  classNames: customClassNames,
}) => {
  const [toggleCountries, setToggleCountries] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<
    SelectCountry | undefined
  >(defaultSelectedValue !== undefined ? defaultSelectedValue : undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultSelectedValue !== undefined) {
      setSelectedCountry(defaultSelectedValue);
    }
  }, [defaultSelectedValue]);

  const filteredCountries = countryCodes.filter(country =>
    country.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section
      ref={dropdownRef}
      className={classNames('overflow-hidden rounded-3xl', customClassNames)}
    >
      <button
        onClick={() => setToggleCountries(!toggleCountries)}
        className={classNames(
          'relative flex h-14 w-full flex-row items-center justify-between gap-5 p-3 px-5 outline-none transition-colors duration-200 ease-in-out',
          customClassNames,
          {
            'rounded-t-3xl bg-dot-secondary': toggleCountries,
            'rounded-3xl bg-dot-primary': !toggleCountries,
          }
        )}
      >
        <p>Country</p>
        <div className="flex w-full flex-row items-center justify-end gap-3">
          {selectedCountry && selectedCountry.title ? (
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
                alt={selectedCountry!.title}
                src={`https://flagcdn.com/${selectedCountry.value.toLowerCase()}.svg`}
                width={24}
                height={20}
                className="h-5 w-7 rounded-md"
              />
              <p className="max-w-20 truncate text-ellipsis">
                {selectedCountry && selectedCountry.title}
              </p>
            </section>
          ) : (
            <p
              className={classNames(
                'flex flex-wrap items-center justify-end gap-1 rounded-full p-1 px-3 text-sm text-zinc-400 transition-colors duration-200 ease-in-out',
                {
                  'bg-dot-tertiary': toggleCountries,
                  'bg-dot-secondary': !toggleCountries,
                }
              )}
            >
              Select country
            </p>
          )}
          <RiArrowDownSLine
            className={classNames(
              'transition-transform duration-200 ease-in-out',
              { 'rotate-180': toggleCountries }
            )}
          />
        </div>
      </button>
      <section
        className={classNames(
          'flex w-full flex-col flex-wrap place-items-center items-start justify-start gap-1 rounded-b-3xl border-x border-b border-dot-secondary bg-dot-primary p-3 text-sm shadow-xl',
          { hidden: !toggleCountries, 'absolute z-20': isDropdown }
        )}
      >
        <div className="mb-3 flex w-full flex-row items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Input country..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-full rounded-md border-b-2 border-transparent bg-dot-secondary p-2 px-3 text-sm outline-none placeholder:text-zinc-400 focus:outline focus:outline-dot-rose"
          />
        </div>
        <section className="max-h-44 w-full overflow-y-auto overscroll-none">
          {filteredCountries.map(
            (country, index) =>
              country.title !== '' && (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCountry(country);
                    onCountryChanges(country);
                  }}
                  className={classNames(
                    'flex w-full cursor-pointer flex-row gap-3 rounded-3xl p-2 px-3 text-sm transition-colors duration-200 ease-in-out md:hover:bg-dot-secondary',
                    {
                      'bg-dot-secondary':
                        selectedCountry &&
                        selectedCountry.value === country.value,
                    }
                  )}
                >
                  <Image
                    alt={country.title}
                    src={`https://flagcdn.com/${country.value.toLowerCase()}.svg`}
                    width={24}
                    height={20}
                    className="h-5 w-7 rounded-md"
                  />
                  <p className="text-left">{country.title}</p>
                </button>
              )
          )}
        </section>
        <button
          onClick={() => {
            setSelectedCountry(undefined);
            setSearchText('');
            onCountryChanges(null);
          }}
          className="col-span-2 mt-3 w-full rounded-full bg-dot-secondary p-2 px-3 text-sm transition-colors duration-200 ease-in-out md:hover:bg-dot-tertiary"
        >
          Reset country
        </button>
      </section>
    </section>
  );
};
