import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import classNames from 'classnames';
import { FC } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import RiArrowDownSFill from '~icons/ri/arrow-down-s-fill';

interface Props {
  artistInfo: ArtistProfile;
  trendData: ArtistTrend[];
  trendBy: 'followers' | 'tweets';
  height?: number;
}

export const ArtistTrendGraph: FC<Props> = props => {
  function getArtistTrendValue() {
    if (
      props.trendBy === 'followers' &&
      props.artistInfo.weeklyFollowersGrowingTrend
    ) {
      if (props.artistInfo.weeklyFollowersGrowingTrend > 0) return true;
      else return false;
    }

    if (
      props.trendBy === 'tweets' &&
      props.artistInfo.weeklyPostsGrowingTrend
    ) {
      if (props.artistInfo.weeklyPostsGrowingTrend > 0) return true;
      else return false;
    }
  }

  function getArtistValue(): string {
    return props.trendBy + 'Count';
  }

  function getTrendDifference(trendBy: 'followers' | 'tweets'): number {
    const selectedData =
      trendBy === 'followers'
        ? props.trendData.map(data => data.followersCount)
        : props.trendData.map(data => data.tweetsCount);

    const trendDifference =
      selectedData[selectedData.length - 1] - selectedData[0];

    return trendDifference;
  }

  return (
    <div className="relative flex w-full flex-col gap-5 rounded-2xl bg-dot-tertiary/50 p-5">
      <p className="text-sm text-zinc-400">
        {props.trendBy.charAt(0).toUpperCase() + props.trendBy.slice(1)} growing
        trend
      </p>
      <ResponsiveContainer
        width="100%"
        height={props.height ? props.height : 200}
      >
        <AreaChart
          data={props.trendData}
          margin={{ top: 0, right: 30, left: -20, bottom: -10 }}
        >
          <defs>
            <linearGradient id={getArtistValue()} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={getArtistTrendValue() ? '#a3e635' : '#FA4545'}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={getArtistTrendValue() ? '#a3e635' : '#FA4545'}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="recordedAt"
            strokeOpacity={0.1}
            tickFormatter={(value: string) =>
              new Date(value).toLocaleDateString('en-EN', {
                month: 'long',
                day: 'numeric',
              })
            }
          />
          <YAxis strokeOpacity={0.1} />
          <CartesianGrid strokeOpacity={0.1} />
          <Tooltip
            contentStyle={{
              color: '#A1A1AA',
              backgroundColor: '#303030',
              border: 'none',
            }}
            itemStyle={{
              color: '#FDFDFD',
            }}
            labelFormatter={(value: string) =>
              new Date(value).toLocaleDateString()
            }
            formatter={(value: number, name: string, props: any) => [
              value,
              getArtistValue() === 'followersCount' ? 'Followers' : 'Tweets',
              props,
            ]}
            separator=": "
          />
          <Area
            type="bump"
            dataKey={getArtistValue()}
            stroke={getArtistTrendValue() ? '#a3e635' : '#FA4545'}
            strokeWidth={3}
            fillOpacity={0.5}
            fill={`url(#${getArtistValue()})`}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex flex-row items-center justify-between gap-5">
        <p className="text-sm text-zinc-400">Last 7d</p>
        <div className="flex flex-row items-center gap-5">
          <p className="leading text-xl font-bold">
            {getTrendDifference(props.trendBy) > 0
              ? '+' + getTrendDifference(props.trendBy)
              : getTrendDifference(props.trendBy)}
          </p>
          <h1
            className={classNames(
              'flex flex-row items-center gap-1 rounded-lg p-2 px-4 text-base font-bold',
              {
                'bg-[#a3e635]/10 text-[#a3e635]': getArtistTrendValue(),
                'bg-[#FA4545]/10 text-[#FA4545]': !getArtistTrendValue(),
              }
            )}
          >
            <RiArrowDownSFill
              className={classNames({
                'rotate-180': getArtistTrendValue(),
              })}
            />
            {props.trendBy === 'followers'
              ? props.artistInfo.weeklyFollowersGrowingTrend &&
                Math.abs(props.artistInfo.weeklyFollowersGrowingTrend)
              : props.artistInfo.weeklyPostsGrowingTrend &&
                Math.abs(props.artistInfo.weeklyPostsGrowingTrend)}
            %
          </h1>
        </div>
      </div>
    </div>
  );
};
