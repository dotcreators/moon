import { create } from 'zustand';

type Preferences = {
  artistsLayout: 'split' | 'column';
  isBannerShowed: boolean;
  isPinnedArtistsShowed: boolean;
};

type PreferencesStoreProps = {
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
  savePreferencesConfig: () => void;
  loadPreferencesConfig: () => void;
};

const usePreferences = create<PreferencesStoreProps>(set => ({
  preferences: {
    artistsLayout: 'split',
    isBannerShowed: true,
    isPinnedArtistsShowed: true,
  },
  savePreferencesConfig: () => {
    set(state => {
      localStorage.setItem('preferences', JSON.stringify(state.preferences));

      return state;
    });
  },
  setPreferences: (preferences: Preferences) => {
    set({ preferences });
  },
  loadPreferencesConfig: () => {
    if (typeof window !== 'undefined') {
      const p = localStorage.getItem('preferences');
      if (p) {
        try {
          const parsedP = JSON.parse(p) as Preferences;
          set({ preferences: parsedP });
        } catch (error) {
          console.error('Error while loading user preferences:', error);
          set({
            preferences: {
              artistsLayout: 'split',
              isBannerShowed: true,
              isPinnedArtistsShowed: true,
            },
          });
        }
      } else {
        set({
          preferences: {
            artistsLayout: 'split',
            isBannerShowed: true,
            isPinnedArtistsShowed: true,
          },
        });
      }
    }
  },
}));

export default usePreferences;
