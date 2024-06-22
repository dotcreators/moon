import { ArtistProfile } from '@/utils/models/ArtistProfile';
import Marquee from 'react-fast-marquee';
import useSWR from 'swr';
import { SuggestArtistCard } from '../ArtistsSuggestComponents/SuggestArtistCard';

export default function ArtistsMarquee() {
  const { data: artistProfiles } = useSWR<{
    status: string;
    response: { data: ArtistProfile[]; has_next: boolean };
  }>(
    `${process.env.API_URL}artists?page=1&limit=10`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  return (
    <section className="flex flex-col gap-5">
      <Marquee pauseOnHover={true}>
        {artistProfiles &&
          artistProfiles.response.data.slice(0, 5).map((artist, index) => (
            <div className="mx-3">
              <SuggestArtistCard
                key={index}
                avatar={artist.images.avatar}
                followers={artist.followersCount}
                posts={artist.tweetsCount}
                user={{ name: artist.name || '', username: artist.username }}
                className="bg-dot-primary md:hover:bg-dot-secondary"
              />
            </div>
          ))}
      </Marquee>
      <Marquee direction="right" pauseOnHover={true}>
        {artistProfiles &&
          artistProfiles.response.data.slice(5, 10).map((artist, index) => (
            <div className="mx-3">
              <SuggestArtistCard
                key={index}
                avatar={artist.images.avatar}
                followers={artist.followersCount}
                posts={artist.tweetsCount}
                user={{ name: artist.name || '', username: artist.username }}
                className="bg-dot-primary md:hover:bg-dot-secondary"
              />
            </div>
          ))}
      </Marquee>
    </section>
  );
}
