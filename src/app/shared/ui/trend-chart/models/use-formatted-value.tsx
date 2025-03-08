import { Artist } from '@/app/shared/types/artist';
import { useMemo } from 'react';

const useFormattedValue = (
  trendBy: 'followers' | 'tweets',
  artistData: Artist,
  range: number,
  percent: number
) => {
  return useMemo(() => {
    const value =
      trendBy === 'followers'
        ? artistData.weeklyFollowersTrend
        : artistData.weeklyTweetsTrend;
    return Math.round(Math.abs(range < 7 ? value! : percent) * 100) / 100;
  }, [trendBy, artistData, range, percent]);
};

export { useFormattedValue };
