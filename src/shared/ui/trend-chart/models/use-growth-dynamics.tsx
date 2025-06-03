import { useMemo } from 'react';

const useGrowthDynamics = (difference: number) => {
  return useMemo(() => {
    if (difference === 0) return 'neutral';
    return difference > 0 ? 'positive' : 'negative';
  }, [difference]);
};

export { useGrowthDynamics };
