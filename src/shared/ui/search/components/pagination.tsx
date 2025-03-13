import useSearchStore from '@/shared/hooks/use-search-store';
import { HTMLAttributes, useEffect } from 'react';
import { Icon } from '@/shared/ui/icon';
import { twJoin } from 'tailwind-merge';

function Pagination({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { page, setPage, totalPages } = useSearchStore();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleClickPrev = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleClickNext = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  useEffect(() => {
    scrollToTop();
  }, [page]);

  return (
    <div
      className={twJoin(
        'mt-3 flex h-[42px] flex-row items-center justify-center gap-3',
        className
      )}
      {...props}
    >
      <div className="flex h-full flex-row items-center gap-3">
        <button
          onClick={() => setPage(1)}
          className={twJoin(
            'group flex h-full w-[42px] items-center justify-center rounded-xl',
            page === 1
              ? 'bg-black-02/50 cursor-not-allowed'
              : 'hover:bg-black-03 bg-black-02 cursor-pointer'
          )}
        >
          <Icon
            ico="i-ri-arrow-left-double-fill"
            className={twJoin(
              '!text-gray-01 text-xl',
              page !== 1 && 'group-hover:text-white-01'
            )}
          />
        </button>
        <button
          onClick={handleClickPrev}
          className={twJoin(
            'group flex h-full w-[42px] items-center justify-center rounded-xl',
            page === 1
              ? 'bg-black-02/50 cursor-not-allowed'
              : 'hover:bg-black-03 bg-black-02 cursor-pointer'
          )}
        >
          <Icon
            ico="i-ri-arrow-left-line"
            className={twJoin(
              '!text-gray-01 text-xl',
              page !== 1 && 'group-hover:text-white-01'
            )}
          />
        </button>
        <p className="tabular-nums">
          {page} / {totalPages}
        </p>
        <button
          onClick={handleClickNext}
          className={twJoin(
            'group flex h-full w-[42px] items-center justify-center rounded-xl',
            page === totalPages
              ? 'bg-black-02/50 cursor-not-allowed'
              : 'hover:bg-black-03 bg-black-02 cursor-pointer'
          )}
        >
          <Icon
            ico="i-ri-arrow-right-line"
            className={twJoin(
              '!text-gray-01 text-xl',
              page === totalPages && 'group-hover:text-white-01'
            )}
          />
        </button>
        <button
          onClick={() => setPage(totalPages)}
          className={twJoin(
            'group flex h-full w-[42px] items-center justify-center rounded-xl',
            page === totalPages
              ? 'bg-black-02/50 cursor-not-allowed'
              : 'hover:bg-black-03 bg-black-02 cursor-pointer'
          )}
        >
          <Icon
            ico="i-ri-arrow-right-double-fill"
            className={twJoin(
              '!text-gray-01 text-xl',
              page === totalPages && 'group-hover:text-white-01'
            )}
          />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
