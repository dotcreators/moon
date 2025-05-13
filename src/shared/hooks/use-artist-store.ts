import { Artist } from '@/shared/types/artist';
import { create } from 'zustand';

type ArtistStore = {
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
  artistsData: Artist[] | null;
  setArtistsData: (artist: Artist[] | null) => void;
};

const useArtistStore = create<ArtistStore>(set => ({
  selectedArtist: null,
  setSelectedArtist: (artist: Artist | null) => {
    set({ selectedArtist: artist });
  },
  artistsData: null,
  setArtistsData: (artists: Artist[] | null) => {
    set({ artistsData: artists });
  },
}));

export default useArtistStore;
