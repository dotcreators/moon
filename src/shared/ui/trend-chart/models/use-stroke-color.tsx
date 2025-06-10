import { useMemo } from 'react';

const useStrokeColor = (growthDynamics: string) => {
  return useMemo(() => {
    switch (growthDynamics) {
      case 'positive':
        return '#a3e635';
      case 'negative':
        return '#fa4545';
      default:
        return '#a1a1aa';
    }
  }, [growthDynamics]);
};

export { useStrokeColor };
