import { FC, useState } from 'react';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { ArtistListCardTrendGraph } from '../ArtistsSearchComponents/ArtistListCardTrendGraph';

interface Props {
  artist: ArtistProfile;
  trendData: ArtistTrend[];
  range: number;
  className?: string;
}

export const ArtistPageTrendGraph: FC<Props> = props => {
  return (
    <>
      <div className="z-20 flex w-full flex-col justify-between divide-y divide-dot-secondary rounded-2xl bg-dot-primary text-xs md:gap-5 md:divide-none md:divide-transparent md:bg-transparent lg:flex-row">
        <div className="grow">
          <ArtistListCardTrendGraph
            key={'followersGraph'}
            artistInfo={props.artist}
            trendBy="followers"
            trendData={props.trendData}
            range={props.range}
            bgColor="bg-dot-primary"
          />
        </div>
        <div className="grow">
          <ArtistListCardTrendGraph
            key={'tweetsGraph'}
            artistInfo={props.artist}
            trendBy="tweets"
            trendData={props.trendData}
            range={props.range}
            bgColor="bg-dot-primary"
          />
        </div>
      </div>
    </>
  );
};
