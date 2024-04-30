import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line'
import RiUserHeartFill from '~icons/ri/user-heart-fill'
import RiFilePaper2Fill from '~icons/ri/file-paper-2-fill'
import RiLineChartFill from '~icons/ri/line-chart-fill'
import RiAtFill from '~icons/ri/at-fill'
import { useRouter } from 'next/router'

interface Props {
  onSortFilterChanges: Function
}

export const SearchSortFilters: FC<Props> = props => {
  const sortFilters = ['Followers', 'Username', 'Posts', 'Trending']
  const [toggleSortFilters, setToggleSortFilters] = useState<boolean>(false)
  const [selectedSortFilter, setSelectedSortFilter] = useState<string>(
    sortFilters[0]
  )

  return (
    <section>
      <button
        onClick={() => setToggleSortFilters(!toggleSortFilters)}
        id="tags"
        className={classNames(
          'h-15 flex w-full flex-row items-center justify-between gap-5 bg-dark-inner p-3 px-5 outline-none transition-colors duration-200 ease-in-out',
          {
            'rounded-t-3xl bg-dark-inner-hover': toggleSortFilters,
            'rounded-3xl': !toggleSortFilters,
          }
        )}
      >
        <p>Sort by</p>
        <div className="flex flex-row items-center gap-3">
          <p
            className={classNames(
              'flex flex-wrap items-center justify-end gap-1 text-sm text-zinc-400'
            )}
          >
            <span
              className={classNames(
                'flex flex-row items-center gap-1.5 rounded-full p-1 px-3 text-[#fdfdfd]',
                {
                  'bg-dark-double-inner transition-colors duration-200 ease-in-out':
                    toggleSortFilters,
                  'bg-dark-inner-hover': !toggleSortFilters,
                }
              )}
            >
              {selectedSortFilter == 'Username' ? (
                <RiAtFill className="text-zinc-400" />
              ) : selectedSortFilter == 'Posts' ? (
                <RiFilePaper2Fill className="text-zinc-400" />
              ) : selectedSortFilter == 'Followers' ? (
                <RiUserHeartFill className="text-zinc-400" />
              ) : (
                <RiLineChartFill className="text-zinc-400" />
              )}
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
          'grid grid-cols-2 flex-wrap place-items-center gap-1 rounded-b-3xl bg-dark-inner p-3 text-sm',
          { hidden: !toggleSortFilters }
        )}
      >
        {sortFilters.map((filter, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedSortFilter(filter)
              props.onSortFilterChanges(filter)
            }}
            className={classNames(
              'flex w-full flex-row items-center justify-center gap-1.5 rounded-full bg-dark-inner p-2 px-3 transition-colors duration-200 ease-in-out md:hover:bg-dark-inner-hover',
              { 'bg-dark-inner-hover': filter == selectedSortFilter }
            )}
          >
            {filter == 'Username' ? (
              <RiAtFill className="text-zinc-400" />
            ) : filter == 'Posts' ? (
              <RiFilePaper2Fill className="text-zinc-400" />
            ) : filter == 'Followers' ? (
              <RiUserHeartFill className="text-zinc-400" />
            ) : (
              <RiLineChartFill className="text-zinc-400" />
            )}
            {filter}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedSortFilter('Followers')
            props.onSortFilterChanges('Followers')
          }}
          className="col-span-2 mt-3 w-full rounded-full bg-dark-inner-hover p-2 px-3 text-sm transition-colors duration-200 ease-in-out md:hover:bg-dark-double-inner"
        >
          Reset sort
        </button>
      </section>
    </section>
  )
}
