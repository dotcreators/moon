import { create } from 'zustand';

type State = {
  trendsRange: 7 | 14 | 31 | 93 | 186 | 372;
};

type Action = {
  updateTrendsRange: (updatedTrendsRange: 7 | 14 | 31 | 93 | 186 | 372) => void;
};

export const useTrendsStore = create<State & Action>(set => ({
  trendsRange: 31,
  updateTrendsRange: updatedTrendsRange =>
    set({
      trendsRange: updatedTrendsRange,
    }),
}));
