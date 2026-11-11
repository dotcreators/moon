import { Trend } from '@/shared/types/trend';
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
    const percent = initialCount > 0 ? (difference / initialCount) * 100 : 0;

    return { difference, percent };
  }, [data, trendBy]);
};

export { useTrendData };
