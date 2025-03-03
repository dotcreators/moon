export interface ArtistProfile {
  id: string;
  twitterUserId: string;
  username: string;
  name?: string;
  tweetsCount: number;
  followersCount: number;
  weeklyTweetsTrend?: number;
  weeklyFollowersTrend?: number;
  images: {
    avatar: string;
    banner?: string;
  };
  tags?: string[];
  url: string;
  country?: string;
  website?: string;
  bio?: string;
  createdAt: Date;
  joinedAt: Date;
  updatedAt: Date;
}
