import { Images } from './images';

type TrackingStatus = 'active' | 'suspended' | 'not_found';

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
  ranking: number;
  previousRanking: number;
  rankingChange: number;
  createdAt: Date;
  joinedAt: Date;
  updatedAt: Date;
  name: string | null;
  bio: string | null;
  trackingStatus?: TrackingStatus;
};

export type { Artist, TrackingStatus };
