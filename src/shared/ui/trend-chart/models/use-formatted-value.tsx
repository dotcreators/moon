import { Artist } from '@/shared/types/artist';
import { useMemo } from 'react';

const useFormattedValue = (
  trendBy: 'followers' | 'tweets',
  artistData: Artist
) => {
  return useMemo(() => {
    const value =
      trendBy === 'followers'
        ? artistData.weeklyFollowersTrend
        : artistData.weeklyTweetsTrend;
    return Math.round(Math.abs(value) * 100) / 100;
  }, [trendBy, artistData]);
};

export { useFormattedValue };
