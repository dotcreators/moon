import classNames from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiUserHeartFill from '~icons/ri/user-heart-fill';
import RiFilePaper2Fill from '~icons/ri/file-paper-2-fill';
import RiLineChartFill from '~icons/ri/line-chart-fill';
import RiAtLine from '~icons/ri/at-line';
import { useRouter } from 'next/router';

interface Props {
  onSortFilterChanges: (filter: string) => void;
}

const sortFilters = ['Followers', 'Username', 'Posts', 'Trending'];

const sortFilterIcons: Record<string, JSX.Element> = {
  Username: <RiAtLine className="text-zinc-400" />,
  Posts: <RiFilePaper2Fill className="text-zinc-400" />,
  Followers: <RiUserHeartFill className="text-zinc-400" />,
  Trending: <RiLineChartFill className="text-zinc-400" />,
};

export const SearchSortFilters: FC<Props> = ({ onSortFilterChanges }) => {
  const [toggleSortFilters, setToggleSortFilters] = useState(false);
  const [selectedSortFilter, setSelectedSortFilter] = useState<string>(
    sortFilters[0]
  );
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const sortBy = router.query.sortBy as string;
    const _sortBy = sortFilters.find(x => x.toLowerCase() === sortBy);
    if (_sortBy) {
      setSelectedSortFilter(_sortBy);
      onSortFilterChanges(_sortBy);
    }
  }, [router.isReady, router.query.sortBy, onSortFilterChanges]);

  const handleSortFilterChange = useCallback(
    (filter: string) => {
      setSelectedSortFilter(filter);
      onSortFilterChanges(filter);
    },
    [onSortFilterChanges]
  );

  const resetSortFilter = useCallback(() => {
    const defaultFilter = sortFilters[0];
    setSelectedSortFilter(defaultFilter);
    onSortFilterChanges(defaultFilter);
  }, [onSortFilterChanges]);

  return (
    <section>
      <button
        onClick={() => setToggleSortFilters(!toggleSortFilters)}
        id="tags"
        className={classNames(
          'h-15 flex w-full flex-row items-center justify-between gap-5 p-3 px-5 outline-none transition-colors duration-200 ease-in-out',
          {
            'rounded-t-3xl bg-dot-secondary': toggleSortFilters,
            'rounded-3xl bg-dot-primary': !toggleSortFilters,
          }
        )}
      >
        <p>Sort by</p>
        <div className="flex flex-row items-center gap-3">
          <p className="flex flex-wrap items-center justify-end gap-1 text-sm text-zinc-400">
            <span
              className={classNames(
                'flex flex-row items-center gap-1.5 rounded-full p-1 px-3 text-[#fdfdfd]',
                {
                  'bg-dot-tertiary transition-colors duration-200 ease-in-out':
                    toggleSortFilters,
                  'bg-dot-secondary': !toggleSortFilters,
                }
              )}
            >
              {sortFilterIcons[selectedSortFilter]}
              {selectedSortFilter}
            </span>
          </p>
          <RiArrowDownSLine
            className={classNames(
              'transition-transform duration-200 ease-in-out',
              { 'rotate-180': toggleSortFilters }
            )}
          />
        </div>
      </button>
      <section
        className={classNames(
          'grid grid-cols-2 flex-wrap place-items-center gap-1 rounded-b-3xl bg-dot-primary p-3 text-sm',
          { hidden: !toggleSortFilters }
        )}
      >
        {sortFilters.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleSortFilterChange(filter)}
            className={classNames(
              'flex w-full flex-row items-center justify-center gap-1.5 rounded-full p-2 px-3 transition-colors duration-200 ease-in-out md:hover:bg-dot-secondary',
              { 'bg-dot-secondary': filter === selectedSortFilter }
            )}
          >
            {sortFilterIcons[filter]}
            {filter}
          </button>
        ))}
        <button
          onClick={resetSortFilter}
          className="col-span-2 mt-3 w-full rounded-full bg-dot-secondary p-2 px-3 text-sm transition-colors duration-200 ease-in-out md:hover:bg-dot-tertiary"
        >
          Reset sort
        </button>
      </section>
    </section>
  );
};