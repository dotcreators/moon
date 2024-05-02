export interface FetchedArtistProfile {
  avatar: string;
  followers: number;
  tweets: number;
  user: {
    username: string;
    name?: string;
  };
}
