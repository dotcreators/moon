import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';

export const MIN_TREND_POINTS = 3;

function TrendPlaceholder({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twJoin(
        'bg-black-03 flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl p-5 text-center',
        className
      )}
      {...props}
    >
      <Icon ico="line-chart-fill" className="text-gray-01 text-3xl" />
      <p className="font-bold">Not enough data yet</p>
      <p className="text-gray-01 max-w-72 text-sm">
        Trends appear after {MIN_TREND_POINTS} days of tracking.
      </p>
    </div>
  );
}

export default TrendPlaceholder;
