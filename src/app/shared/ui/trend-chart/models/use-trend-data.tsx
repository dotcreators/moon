import { Trend } from '@/app/shared/types/trend';
import { useMemo } from 'react';

const useTrendData = (data: Trend[], trendBy: 'followers' | 'tweets') => {
  return useMemo(() => {
    const lastIndex = data.length - 1;
    const initialCount =
      trendBy === 'followers' ? data[0].followersCount : data[0].tweetsCount;
    const currentCount =
      trendBy === 'followers'
        ? data[lastIndex].followersCount
        : data[lastIndex].tweetsCount;

    const difference = currentCount - initialCount;
    const percent = ((currentCount - initialCount) / initialCount) * 100;

    return { difference, percent };
  }, [data, trendBy]);
};

export { useTrendData };
