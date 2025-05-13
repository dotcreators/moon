import useSearchStore from '@/shared/hooks/use-search-store';
import { HTMLAttributes, useEffect } from 'react';
import Icon from '@/shared/ui/icon';
import { twJoin } from 'tailwind-merge';
import useArtistStore from '@/shared/hooks/use-artist-store';

function Pagination({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { page, setPage, totalPages } = useSearchStore();
  const { artistsData } = useArtistStore();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
  };

  useEffect(() => {
    scrollToTop();
  }, [artistsData]);

  const getButtonStyles = (isDisabled: boolean) =>
    twJoin(
      'group flex h-full w-[42px] items-center justify-center rounded-xl',
      isDisabled
        ? 'bg-black-02/50 cursor-not-allowed'
        : 'hover:bg-black-03 bg-black-02 cursor-pointer'
    );

  const getIconStyles = (isActive: boolean) =>
    twJoin('!text-gray-01 text-xl', isActive && 'group-hover:text-white-01');

  return (
    <div
      className={twJoin(
        'mt-3 flex h-[42px] flex-row items-center justify-center gap-3',
        className
      )}
      {...props}
    >
      <div className="flex h-full flex-row items-center gap-3">
        {/* First Page */}
        <button
          onClick={() => handlePageChange(1)}
          className={getButtonStyles(page === 1)}
          disabled={page === 1}
        >
          <Icon
            ico="i-ri-arrow-left-double-fill"
            className={getIconStyles(page !== 1)}
          />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => handlePageChange(page - 1)}
          className={getButtonStyles(page === 1)}
          disabled={page === 1}
        >
          <Icon
            ico="i-ri-arrow-left-s-line"
            className={getIconStyles(page !== 1)}
          />
        </button>

        {/* Page Indicator */}
        <p className="tabular-nums">
          {page} / {totalPages}
        </p>

        {/* Next Page */}
        <button
          onClick={() => handlePageChange(page + 1)}
          className={getButtonStyles(page === totalPages)}
          disabled={page === totalPages}
        >
          <Icon
            ico="i-ri-arrow-right-s-line"
            className={getIconStyles(page !== totalPages)}
          />
        </button>

        {/* Last Page */}
        <button
          onClick={() => handlePageChange(totalPages)}
          className={getButtonStyles(page === totalPages)}
          disabled={page === totalPages}
        >
          <Icon
            ico="i-ri-arrow-right-double-fill"
            className={getIconStyles(page !== totalPages)}
          />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
