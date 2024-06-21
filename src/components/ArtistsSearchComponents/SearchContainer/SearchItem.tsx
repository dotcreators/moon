import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';

interface Props {
  title: string;
  isMultiSelect: boolean;
  isDropdown: boolean;
  filtersData: {
    title: string;
    icon: React.ReactNode;
  }[];
  selectedValuesUpdate: (selectedValues: string | string[]) => void;
  defaultSelectedValue?: string[];
  classNames?: string;
}

export const SearchItem: FC<Props> = ({
  title,
  isMultiSelect,
  isDropdown,
  filtersData,
  selectedValuesUpdate,
  defaultSelectedValue,
  classNames: customClassNames,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    defaultSelectedValue !== undefined ? defaultSelectedValue : []
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultSelectedValue !== undefined) {
      setSelectedFilters(defaultSelectedValue);
    }
  }, [defaultSelectedValue]);

  const handleFilterChange = useCallback(
    (filterItem: string) => {
      if (isMultiSelect) {
        const updatedFilterItems = selectedFilters.includes(filterItem)
          ? selectedFilters.filter(item => item !== filterItem)
          : [...selectedFilters, filterItem];
        setSelectedFilters(updatedFilterItems);
        selectedValuesUpdate(updatedFilterItems);
      } else {
        setSelectedFilters([filterItem]);
        selectedValuesUpdate(filterItem);
      }
    },
    [selectedFilters, selectedValuesUpdate]
  );

  const resetFilter = () => {
    selectedValuesUpdate([]);
    setSelectedFilters([]);
  };

  return (
    <section ref={dropdownRef} className="relative">
      {!isMultiSelect ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(
            'relative flex h-14 w-full flex-row items-center justify-between gap-5 p-3 px-5 outline-none transition-colors duration-200 ease-in-out',
            customClassNames,
            {
              'rounded-t-3xl bg-dot-secondary': isOpen,
              'rounded-3xl bg-dot-primary': !isOpen,
            }
          )}
        >
          <p>{title}</p>
          <div className="flex flex-row items-center gap-3">
            <p className="flex flex-wrap items-center justify-end gap-1 text-sm text-zinc-400">
              <span
                className={classNames(
                  'flex flex-row items-center gap-1.5 rounded-full p-1 px-3 text-[#fdfdfd]',
                  {
                    'bg-dot-tertiary transition-colors duration-200 ease-in-out':
                      isOpen,
                    'bg-dot-secondary': !isOpen,
                  }
                )}
              >
                {selectedFilters.length === 0 && (
                  <span className="text-zinc-400">
                    Select {title.toLocaleLowerCase()}
                  </span>
                )}
                {selectedFilters &&
                  filtersData.find(item => item.title === selectedFilters[0]) &&
                  filtersData.find(item => item.title === selectedFilters[0])!
                    .icon}
                {selectedFilters[0]}
              </span>
            </p>
            <RiArrowDownSLine
              className={classNames(
                'transition-transform duration-200 ease-in-out',
                { 'rotate-180': isOpen }
              )}
            />
          </div>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(
            'flex h-14 w-full flex-col place-items-start items-center justify-between gap-3 p-3 px-5 outline-none',
            customClassNames,
            {
              'rounded-t-3xl bg-dot-secondary': isOpen,
              'rounded-3xl bg-dot-primary': !isOpen,
            }
          )}
        >
          <div className="flex min-h-8 w-full flex-row items-center justify-between">
            <p>Tags</p>
            <div className="flex flex-row items-center gap-3">
              <p
                className={classNames(
                  'flex flex-wrap items-center justify-end gap-1 rounded-full p-1 px-3 text-sm text-zinc-400 transition-colors duration-200 ease-in-out',
                  {
                    'bg-dot-secondary': !isOpen,
                    'bg-dot-tertiary': isOpen,
                    hidden: selectedFilters.length !== 0,
                  }
                )}
              >
                {selectedFilters.length === 0 &&
                  `Select ${title.toLocaleLowerCase()}`}
              </p>
              <RiArrowDownSLine
                className={classNames(
                  'transition-transform duration-200 ease-in-out',
                  { 'rotate-180': isOpen }
                )}
              />
            </div>
          </div>
          <div
            className={classNames(
              'flex w-full flex-wrap items-start justify-start gap-2',
              { hidden: selectedFilters.length === 0 }
            )}
          >
            {selectedFilters.map((filter, index) => (
              <span
                key={index}
                className={classNames(
                  'flex flex-row items-center justify-center gap-1.5 rounded-full p-1 px-3 text-sm transition-colors duration-200 ease-in-out',
                  {
                    'bg-dot-secondary text-[#fdfdfd]':
                      selectedFilters.length > 0,
                    'bg-dot-tertiary': isOpen,
                    'bg-dot-secondary': !isOpen,
                  }
                )}
              >
                {filtersData.find(item => item.title === filter)!.icon}
                {filter}
              </span>
            ))}
          </div>
        </button>
      )}
      <section
        className={classNames(
          'grid w-full grid-cols-2 flex-wrap place-items-center gap-1 rounded-b-3xl border-x border-b border-dot-secondary bg-dot-primary p-3 text-sm shadow-xl',
          { hidden: !isOpen, 'absolute z-20 ': isDropdown }
        )}
      >
        {filtersData.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange(filter.title)}
            className={classNames(
              'flex w-full flex-row items-center justify-center gap-1.5 rounded-full p-2 px-3 transition-colors duration-200 ease-in-out md:hover:bg-dot-secondary',
              { 'bg-dot-secondary': selectedFilters.includes(filter.title) }
            )}
          >
            {filter.icon}
            {filter.title}
          </button>
        ))}
        <button
          onClick={resetFilter}
          className="col-span-2 mt-3 w-full rounded-full bg-dot-secondary p-2 px-3 text-sm transition-colors duration-200 ease-in-out md:hover:bg-dot-tertiary"
        >
          Reset sort
        </button>
      </section>
    </section>
  );
};
