'use client';

import usePreferences from '@/shared/hooks/use-preferences-store';
import Button from '@/shared/ui/button';
import Icon from '@/shared/ui/icon';
import Select from '@/shared/ui/select/ui/select';
import { twJoin } from 'tailwind-merge';

function Settings() {
  const { preferences, setPreferences, savePreferencesConfig } =
    usePreferences();

  const handleLayoutClick = (value: 'split' | 'column') => {
    setPreferences({
      ...preferences,
      artistsLayout: value,
    });
    savePreferencesConfig();
  };

  const handleBannerClick = (value: 'show' | 'hide') => {
    setPreferences({
      ...preferences,
      isBannerShowed: value === 'show' ? true : false,
    });
    savePreferencesConfig();
  };

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-row gap-4 p-5">
      <section className="bg-black-02 col-span-1 flex h-fit w-72 flex-col gap-4 rounded-xl p-5">
        <h1 className="text-xl font-semibold">Settings</h1>
        <Button.Flat variant="02">
          <Icon ico="i-ri-palette-line" />
          <p>Appearance</p>
        </Button.Flat>
      </section>

      <div className="flex grow flex-col gap-4">
        <section
          className={twJoin(
            'bg-black-02 flex grow flex-col gap-8 rounded-xl p-8'
          )}
        >
          <h2 className="text-gray-01 text-xl">Artist profile</h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold">Layout</h3>
              <p className="text-gray-01">
                Select your preferred layout for displaying artist profile
                information
              </p>
            </div>
            <Select
              items={[
                { value: 'split', label: 'Split view' },
                { value: 'column', label: 'Column view' },
              ]}
              onSelectedItem={value =>
                handleLayoutClick(value as 'split' | 'column')
              }
              selectedItem={preferences.artistsLayout}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold">Banner</h3>
              <p className="text-gray-01">
                Select your preferred display mode for artist Twitter banner
              </p>
            </div>
            <Select
              items={[
                { value: 'show', label: 'Show' },
                { value: 'hide', label: 'Hide' },
              ]}
              onSelectedItem={value =>
                handleBannerClick(value as 'show' | 'hide')
              }
              selectedItem={preferences.isBannerShowed ? 'show' : 'hide'}
            />
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4 rounded-xl p-4"></div>
      </div>
    </div>
  );
}

export default Settings;
