import { FC, useState } from 'react';
import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import { TrendGraph } from '../TrendGraphComponent/TrendGraph';

interface Props {
  artist: ArtistProfile;
  trendData: ArtistTrend[];
  range: number;
  className?: string;
}

export const ArtistPageTrendGraph: FC<Props> = props => {
  return (
    <>
      {/* lg:flex-row */}
      <div className="z-20 flex w-full flex-col justify-between divide-y divide-dot-secondary rounded-2xl bg-dot-primary text-xs md:gap-5 md:divide-none md:divide-transparent md:bg-transparent">
        <div className="grow">
          <TrendGraph
            artistInfo={props.artist}
            trendData={props.trendData}
            trendBy="followers"
            range={props.range}
            bgColor="bg-dot-primary"
            isSmall={false}
          />
        </div>
        <div className="grow">
          <TrendGraph
            artistInfo={props.artist}
            trendData={props.trendData}
            trendBy="tweets"
            range={props.range}
            bgColor="bg-dot-primary"
            isSmall={false}
          />
        </div>
      </div>
    </>
  );
};
