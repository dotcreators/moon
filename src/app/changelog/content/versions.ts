import { StaticImageData } from 'next/image';

import v20BannerImage from '../assets/new-begining-banner.webp';

type Version = {
  file: string;
  title: string;
  date: string;
  banner: StaticImageData;
};

const CHANGELOG: Record<string, Version> = {
  '2.0': {
    file: 'a-new-begining',
    title: 'A new begining!',
    date: '2025-05-30T11:25:21.422Z',
    banner: v20BannerImage,
  },
} as const;

export { CHANGELOG, type Version };
