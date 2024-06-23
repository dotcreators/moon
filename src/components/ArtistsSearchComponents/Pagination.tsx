import { FC } from 'react';
import RiArrowLeftLine from '~icons/ri/arrow-left-line';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiMoreFill from '~icons/ri/more-fill';
import RiBrushFill from '~icons/ri/brush-fill';
import classNames from 'classnames';

interface Props {
  currentPage: number;
  isNext: boolean;
  lastPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: FC<Props> = ({
  currentPage,
  isNext,
  lastPage,
  totalResults,
  onPageChange,
  className: customClassName,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNext = () => {
    if (isNext) {
      onPageChange(currentPage + 1);
      scrollToTop();
    }
  };

  const handleCustom = (page: number) => {
    if (page !== currentPage && page > 0 && page <= lastPage) {
      onPageChange(page);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  };

  return (
    <section
      className={classNames(
        'flex w-full flex-row items-center justify-between gap-5',
        customClassName
      )}
    >
      <div className="flex flex-row items-center justify-center gap-5">
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className="rounded-2xl bg-dot-primary p-3 duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 md:hover:bg-dot-secondary"
        >
          <RiArrowLeftLine />
        </button>
        <div className="flex flex-row items-center gap-2">
          {lastPage !== 0 ? (
            <>
              {currentPage !== 1 && (
                <>
                  {currentPage > 2 && (
                    <>
                      <button
                        onClick={() => handleCustom(1)}
                        className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums"
                      >
                        <p>{1}</p>
                      </button>
                      {currentPage > 3 && (
                        <div className="px-2">
                          <RiMoreFill />
                        </div>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => handleCustom(currentPage - 1)}
                    className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums"
                  >
                    <p>{currentPage - 1}</p>
                  </button>
                </>
              )}
              <div className="rounded-2xl bg-dot-rose p-2.5 px-4 text-center font-bold tabular-nums text-dot-body">
                <p>{currentPage}</p>
              </div>
              {currentPage !== lastPage && (
                <>
                  <button
                    onClick={() => handleCustom(currentPage + 1)}
                    className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums"
                  >
                    <p>{currentPage + 1}</p>
                  </button>
                  {currentPage + 1 < lastPage && (
                    <>
                      <div className="px-2">
                        <RiMoreFill />
                      </div>
                      <button
                        onClick={() => handleCustom(lastPage)}
                        className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums"
                      >
                        <p>{lastPage}</p>
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
          disabled={!isNext}
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
