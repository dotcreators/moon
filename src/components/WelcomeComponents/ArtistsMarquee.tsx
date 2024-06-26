import { ArtistProfile } from '@/utils/models/ArtistProfile';
import Marquee from 'react-fast-marquee';
import { SuggestArtistCard } from '../ArtistsSuggestComponents/SuggestArtistCard';
import SuggestArtistCardSkeleton from '../ArtistsSuggestComponents/SuggestArtistCardSkeleton';
import { FC } from 'react';

interface Props {
  artists: ArtistProfile[] | undefined;
}

export const ArtistsMarquee: FC<Props> = ({ artists: artistProfiles }) => {
  return (
    <section className="flex flex-col gap-5">
      {!artistProfiles ? (
        <>
          <Marquee pauseOnHover={true}>
            {[...Array(15)].map((_, index) => (
              <div className="mx-3">
                <SuggestArtistCardSkeleton key={index} />
              </div>
            ))}
          </Marquee>
          <Marquee direction="right" pauseOnHover={true}>
            {[...Array(15)].map((_, index) => (
              <div className="mx-3">
                <SuggestArtistCardSkeleton key={index} />
              </div>
            ))}
          </Marquee>
        </>
      ) : (
        <>
          <Marquee pauseOnHover={true}>
            {artistProfiles &&
              artistProfiles.slice(0, 15).map((artist, index) => (
                <div className="mx-3">
                  <SuggestArtistCard
                    key={index}
                    avatar={artist.images.avatar}
                    followers={artist.followersCount}
                    posts={artist.tweetsCount}
                    user={{
                      name: artist.name || '',
                      username: artist.username,
                    }}
                    isTwitterLink={false}
                    className="bg-dot-primary md:hover:bg-dot-secondary"
                  />
                </div>
              ))}
          </Marquee>
          <Marquee direction="right" pauseOnHover={true}>
            {artistProfiles &&
              artistProfiles.slice(15, 30).map((artist, index) => (
                <div className="mx-3">
                  <SuggestArtistCard
                    key={index}
                    avatar={artist.images.avatar}
                    followers={artist.followersCount}
                    posts={artist.tweetsCount}
                    user={{
                      name: artist.name || '',
                      username: artist.username,
                    }}
                    isTwitterLink={false}
                    className="bg-dot-primary md:hover:bg-dot-secondary"
                  />
                </div>
              ))}
          </Marquee>
        </>
      )}
    </section>
  );
};
