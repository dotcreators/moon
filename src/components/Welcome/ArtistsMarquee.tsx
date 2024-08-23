import { ArtistProfile } from '@/utils/models/ArtistProfile';
import Marquee from 'react-fast-marquee';
import { FC } from 'react';
import SuggestArtistCardSkeleton from '../ArtistsSuggest/SuggestArtistCardSkeleton';
import { SuggestArtistCard } from '../ArtistsSuggest/SuggestArtistCard';

interface Props {
  artists: ArtistProfile[] | undefined;
}

export const ArtistsMarquee: FC<Props> = ({ artists: artistProfiles }) => {
  return (
    <section className="relative mx-auto flex max-w-[1920px] flex-col gap-5">
      <div className="absolute left-0 z-20 h-full w-10 bg-gradient-to-r from-dot-body via-dot-body/50 to-transparent" />
      <div className="absolute right-0 z-20 h-full w-10 bg-gradient-to-l from-dot-body via-dot-body/50 to-transparent" />
      {!artistProfiles ? (
        <>
          <Marquee pauseOnHover={true}>
            {[...Array(15)].map((_, index) => (
              <div className="mx-3" key={index + 'array1'}>
                <SuggestArtistCardSkeleton key={index} />
              </div>
            ))}
          </Marquee>
          <Marquee direction="right" pauseOnHover={true}>
            {[...Array(15)].map((_, index) => (
              <div className="mx-3" key={index + 'array2'}>
                <SuggestArtistCardSkeleton />
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
