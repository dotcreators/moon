import { FC } from 'react';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { ArtistListCardTrendGraph } from '../ArtistsSearchComponents/ArtistListCardTrendGraph';

interface Props {
  artist: ArtistProfile;
  trendData: ArtistTrend[];
  className?: string;
}

export const ArtistPageTrendGraph: FC<Props> = props => {
  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }

  return (
    <>
      <div className="z-20 flex w-full flex-col justify-between divide-y divide-dot-secondary rounded-2xl bg-dot-primary text-xs md:gap-5 md:divide-none md:divide-transparent md:bg-transparent lg:flex-row">
        <div className="grow">
          <ArtistListCardTrendGraph
            key={'followersGraph'}
            artistInfo={props.artist}
            trendBy="followers"
            trendData={props.trendData}
            bgColor="bg-dot-primary"
          />
        </div>
        <div className="grow">
          <ArtistListCardTrendGraph
            key={'tweetsGraph'}
            artistInfo={props.artist}
            trendBy="tweets"
            trendData={props.trendData}
            bgColor="bg-dot-primary"
          />
        </div>
      </div>
    </>
  );
};
