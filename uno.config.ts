import presetIcons from '@unocss/preset-icons';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [
    presetIcons(),
    presetIcons({
      collections: {
        custom: {
          logo: `
            <svg viewBox="0 0 26 20">
              <path d="M0 0H10.4V5H5.2V10H10.4V15H15.6V10H20.8V5H15.6V0H26V10H20.8V15H15.6V20H10.4V15H5.2V10H0V0Z" fill="currentColor"/>
            </svg>
          `,
          circle:
            '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
        },
      },
      prefix: 'i-dotcreators-',
    }),
  ],
});
