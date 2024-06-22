import { FC } from 'react';
import RiArrowLeftLine from '~icons/ri/arrow-left-line';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiMoreFill from '~icons/ri/more-fill';
import RiBrushFill from '~icons/ri/brush-fill';

interface Props {
  currentPage: number;
  isNext: boolean;
  lastPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  currentPage,
  isNext,
  lastPage,
  totalResults,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      scroolToTop();
    }
  };

  const handleNext = () => {
    if (isNext) {
      onPageChange(currentPage + 1);
      scroolToTop();
    }
  };

  function scroolToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }

  console.log(currentPage);

  return (
    <section className="flex w-full flex-row items-center justify-between gap-5">
      <div className="flex flex-row items-center justify-center gap-5">
        <button
          onClick={handlePrevious}
          className="rounded-2xl bg-dot-primary p-3 duration-200 ease-in-out md:hover:bg-dot-secondary"
        >
          <RiArrowLeftLine />
        </button>
        <div className="flex flex-row items-center gap-3">
          {lastPage !== 0 ? (
            <>
              {currentPage !== 1 && (
                <>
                  <div className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums">
                    <p>{1}</p>
                  </div>
                  <div className="px-3">
                    <RiMoreFill />
                  </div>
                  <div className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums">
                    <p>{currentPage - 1}</p>
                  </div>
                </>
              )}
              <div className="rounded-2xl bg-dot-rose p-2.5 px-4 text-center font-bold tabular-nums text-dot-body">
                <p>{currentPage}</p>
              </div>
              {currentPage !== lastPage && (
                <>
                  <div className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums">
                    <p>{currentPage + 1}</p>
                  </div>
                  <div className="px-3">
                    <RiMoreFill />
                  </div>
                  <div className="rounded-2xl bg-dot-primary p-2.5 px-4 text-center tabular-nums">
                    <p>{lastPage}</p>
                  </div>
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
          className="rounded-2xl bg-dot-primary p-3 duration-200 ease-in-out md:hover:bg-dot-secondary"
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
