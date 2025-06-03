import { createContext, useContext, useState, ReactNode } from 'react';
import { Artist } from '@/shared/types/artist';

type ArtistModalContextType = {
  selectedArtist: Artist | null;
  isModalOpen: boolean;
  openModal: (artist: Artist) => void;
  closeModal: () => void;
};

const ArtistModalContext = createContext<ArtistModalContextType>({
  selectedArtist: null,
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

function ArtistModalProvider({ children }: { children: ReactNode }) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtist(null);
  };

  return (
    <ArtistModalContext.Provider
      value={{
        selectedArtist,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ArtistModalContext.Provider>
  );
}

function useArtistModal() {
  const context = useContext(ArtistModalContext);
  if (!context) {
    throw new Error(
      'useArtistModal must be used within an ArtistModalProvider'
    );
  }
  return context;
}

export { ArtistModalProvider, useArtistModal };
