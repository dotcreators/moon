export interface ArtistProfile {
    id: string,
    username: string,
    userId: string,
    joinedAt: Date,
    tweetsCount: number,
    followersCount: number,
    url: string
    images: {
        avatar: string,
        banner?: string
    },
    name?: string,
    website?: string,
    bio?: string,
    lastUpdateAt: Date,
    createdAt: Date,
    country: string,
    tags: string[],
}