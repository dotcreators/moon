import { Images } from './images';

type Artist = {
  id: string;
  twitterUserId: string;
  username: string;
  tweetsCount: number;
  followersCount: number;
  weeklyTweetsTrend: number;
  weeklyFollowersTrend: number;
  images: Images;
  tags: string[];
  url: string;
  country: string;
  website: string;
  createdAt: Date;
  joinedAt: Date;
  updatedAt: Date;
  name: string | null;
  bio: string | null;
};

export type { Artist };
