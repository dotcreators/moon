import { Images } from './images';

type PinnedArtist = {
  id: string;
  twitterUserId: string;
  username: string;
  name?: string;
  images: Images;
};

export type { PinnedArtist };
