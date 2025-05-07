import { create } from 'zustand';
import { PinnedArtist } from '../types/pinned-artist';

type PinnedArtistStore = {
  pinnedArtists: PinnedArtist[] | null;
  addPinnedArtists: (artist: PinnedArtist) => void;
  removePinnedArtist: (artist: PinnedArtist) => void;
  updatePinnedArtist: (updatedArtist: PinnedArtist) => void;
  savePinnedArtists: () => void;
  loadPinnedArtists: () => void;
};

const usePinnedArtistStore = create<PinnedArtistStore>(set => ({
  pinnedArtists: null,
  addPinnedArtists: (artist: PinnedArtist) => {
    set(state => ({
      pinnedArtists: state.pinnedArtists
        ? [artist, ...state.pinnedArtists]
        : [artist],
    }));
  },
  updatePinnedArtist: (updatedArtist: PinnedArtist) => {
    set(state => ({
      pinnedArtists: state.pinnedArtists
        ? state.pinnedArtists.map(artist =>
            artist.id === updatedArtist.id ? updatedArtist : artist
          )
        : [updatedArtist],
    }));
  },
  removePinnedArtist: (artist: PinnedArtist) => {
    set(state => ({
      pinnedArtists: state.pinnedArtists
        ? state.pinnedArtists.filter(a => a.id !== artist.id)
        : [],
    }));
  },
  savePinnedArtists: () => {
    set(state => {
      if (state.pinnedArtists) {
        localStorage.setItem(
          'pinnedArtists',
          JSON.stringify(state.pinnedArtists)
        );
      }
      return state;
    });
  },
  loadPinnedArtists: () => {
    if (typeof window !== 'undefined') {
      const storedArtists = localStorage.getItem('pinnedArtists');
      if (storedArtists) {
        try {
          const parsedArtists = JSON.parse(storedArtists) as PinnedArtist[];
          set({ pinnedArtists: parsedArtists });
        } catch (error) {
          console.error('Error while loading pinned artists:', error);
          set({ pinnedArtists: [] });
        }
      } else {
        set({ pinnedArtists: [] });
      }
    }
  },
}));

usePinnedArtistStore.getState().loadPinnedArtists();

export default usePinnedArtistStore;
