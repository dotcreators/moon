import { FC } from 'react';
import RiArrowLeftLine from '~icons/ri/arrow-left-line';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiMoreFill from '~icons/ri/more-fill';
import RiBrushFill from '~icons/ri/brush-fill';
import classNames from 'classnames';
import { useSearchStore } from '@/store/useSearchStore';

interface Props {
  totalResults: number;
  className?: string;
}

export const Pagination: FC<Props> = ({
  totalResults,
  className: customClassName,
}) => {
  const { searchFilter, updateSearchPage } = useSearchStore();

  console.log(searchFilter);

  const handlePrevious = () => {
    if (searchFilter.pagination.page > 1) {
      updateSearchPage(Number(searchFilter.pagination.page) - 1);
      setTimeout(() => {
        scrollToTop();
      }, 300);
    }
  };

  const handleNext = () => {
    if (searchFilter.pagination.totalPages > searchFilter.pagination.page) {
      updateSearchPage(Number(searchFilter.pagination.page) + 1);
      setTimeout(() => {
        scrollToTop();
      }, 300);
    }
  };

  const handleCustom = (page: number) => {
    if (
      page !== searchFilter.pagination.page &&
      page > 0 &&
      page <= searchFilter.pagination.totalPages
    ) {
      updateSearchPage(Number(page));
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className={classNames(
        'flex w-full flex-col items-center justify-center gap-5 md:flex-row md:justify-between',
        customClassName
      )}
    >
      <div className="flex flex-row items-center justify-center gap-5">
        <button
          onClick={handlePrevious}
          disabled={searchFilter.pagination.page <= 1}
          className="rounded-2xl bg-dot-primary p-3 duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 md:hover:bg-dot-secondary"
        >
          <RiArrowLeftLine />
        </button>
        <div className="flex flex-row items-center gap-2">
          {Number(searchFilter.pagination.totalPages) !== 0 ? (
            <>
              {Number(searchFilter.pagination.page) !== 1 && (
                <>
                  {Number(searchFilter.pagination.page) > 2 && (
                    <>
                      <button
                        onClick={() => handleCustom(1)}
                        className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums"
                      >
                        <p>{1}</p>
                      </button>
                      {searchFilter.pagination.page > 3 && (
                        <div className="px-2">
                          <RiMoreFill />
                        </div>
                      )}
                    </>
                  )}
                  <button
                    onClick={() =>
                      handleCustom(Number(searchFilter.pagination.page) - 1)
                    }
                    className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums"
                  >
                    <p>{Number(searchFilter.pagination.page) - 1}</p>
                  </button>
                </>
              )}
              <div className="rounded-2xl bg-dot-rose p-2.5 px-4 text-center font-bold tabular-nums text-dot-body">
                <p>{Number(searchFilter.pagination.page)}</p>
              </div>
              {searchFilter.pagination.page !==
                searchFilter.pagination.totalPages && (
                <>
                  <button
                    onClick={() =>
                      handleCustom(Number(searchFilter.pagination.page) + 1)
                    }
                    className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums"
                  >
                    <p>{Number(searchFilter.pagination.page) + 1}</p>
                  </button>
                  {Number(searchFilter.pagination.page) + 1 <
                    searchFilter.pagination.totalPages && (
                    <>
                      <div className="px-2">
                        <RiMoreFill />
                      </div>
                      <button
                        onClick={() =>
                          handleCustom(searchFilter.pagination.totalPages)
                        }
                        className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums"
                      >
                        <p>{searchFilter.pagination.totalPages}</p>
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="rounded-2xl bg-dot-rose p-2.5 px-4 text-center font-bold tabular-nums text-dot-body">
              <p>1</p>
            </div>
          )}
        </div>
        <button
          onClick={handleNext}
          disabled={
            searchFilter.pagination.page >= searchFilter.pagination.totalPages
              ? true
              : false
          }
          className="rounded-2xl bg-dot-primary p-3 duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 md:hover:bg-dot-secondary"
        >
          <RiArrowRightLine />
        </button>
      </div>
      <div className="flex flex-row items-center gap-2 rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums text-zinc-400">
        <RiBrushFill />
        Showed <span className="text-dot-white">{totalResults}</span> artist
      </div>
    </section>
  );
};
