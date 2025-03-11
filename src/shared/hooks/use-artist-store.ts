import { Artist } from '@/shared/types/artist';
import { create } from 'zustand';

type ArtistStore = {
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
};

const useArtistStore = create<ArtistStore>(set => ({
  selectedArtist: null,
  setSelectedArtist: (artist: Artist | null) => {
    set({ selectedArtist: artist });
  },
}));

export default useArtistStore;
