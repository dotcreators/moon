import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'hubot-sans': ['var(--font-hubot-sans)'],
      },
      colors: {
        'dark-bg': '#0A0A0A',
        'dark-inner': '#151515',
        'dark-inner-hover': '#202020',
        'dark-double-inner': '#303030',
        'dark-double-inner-hover': '#454545',
        'dark-text': '#FDFDFD',
        'c-amber-light': '#FF9D41',
        'c-amber-dark': '#F97039',
        'c-rose-light': '#FC3E42',
        'c-rose-dark': '#C92020',
      },
      transitionProperty: {
        'max-height': 'max-height',
        padding: 'padding',
      },
    },
  },
  plugins: [],
};
export default config;
