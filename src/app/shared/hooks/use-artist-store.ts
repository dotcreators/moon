import { Artist } from '@/app/shared/types/artist';
import { create } from 'zustand';

interface ArtistStore {
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
}

const useArtistStore = create<ArtistStore>(set => ({
  selectedArtist: null,
  setSelectedArtist: (artist: Artist | null) => {
    set({ selectedArtist: artist });
  },
}));

export default useArtistStore;
