import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import classNames from 'classnames';
import { FC, useState } from 'react';
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
import RiEqualFill from '~icons/ri/equal-fill';
import RiLineChartFill from '~icons/ri/line-chart-fill';

interface Props {
  artistInfo: ArtistProfile;
  trendData: ArtistTrend[];
  trendBy: 'followers' | 'tweets';
  range: number;
  isSmall: boolean;
  height?: number;
  bgColor?: string;
}

export const TrendGraph: FC<Props> = props => {
  const [trendValue, setTrendvalue] = useState<number | undefined>(() => {
    if (props.trendBy === 'followers') {
      return props.artistInfo.weeklyFollowersGrowingTrend;
    } else {
      return props.artistInfo.weeklyPostsGrowingTrend;
    }
  });

  const [trendDifference, setTrendDifference] = useState<number>(() => {
    if (props.trendBy === 'followers') {
      return (
        props.trendData[props.trendData.length - 1].followersCount -
        props.trendData[0].followersCount
      );
    } else {
      return (
        props.trendData[props.trendData.length - 1].tweetsCount -
        props.trendData[0].tweetsCount
      );
    }
  });

  const [growthDynamics, setGrowthDynamics] = useState<
    'positive' | 'neutral' | 'negative'
  >(() => {
    let trendValue: number | undefined = 0;

    if (props.trendBy === 'followers') {
      trendValue = props.artistInfo.weeklyFollowersGrowingTrend;
    } else {
      trendValue = props.artistInfo.weeklyPostsGrowingTrend;
    }

    if (trendValue === 0.0 || trendValue === undefined) return 'neutral';
    if (trendValue > 0) return 'positive';
    else return 'negative';
  });

  const [strokeColor, setStrokeColor] = useState<string>(
    growthDynamics === 'neutral'
      ? '#a1a1aa'
      : growthDynamics === 'positive'
        ? '#a3e635'
        : '#fa4545'
  );

  function getArtistValue(): string {
    return props.trendBy + 'Count';
  }

  return props.isSmall ? (
    <div
      className={classNames(
        'relative flex w-full flex-col gap-5 rounded-2xl p-5 text-xs',
        props.bgColor,
        { 'bg-dot-tertiary/50': !props.bgColor }
      )}
    >
      <div className="flex flex-row items-center justify-between gap-5">
        <p className="text-sm text-zinc-400">
          {props.trendBy.charAt(0).toUpperCase() + props.trendBy.slice(1)}{' '}
          growing trend
        </p>
        <div className="flex flex-row items-center gap-5">
          <p className="leading text-xl font-bold">
            {trendDifference > 0 ? '+' + trendDifference : trendDifference}
          </p>
          <p
            className={classNames(
              'flex flex-row items-center gap-1 rounded-lg p-2 px-4 text-base font-bold',
              {
                'bg-zinc-400/10 text-zinc-400': growthDynamics === 'neutral',
                'bg-[#a3e635]/10 text-[#a3e635]': growthDynamics === 'positive',
                'bg-[#FA4545]/10 text-[#FA4545]': growthDynamics === 'negative',
              }
            )}
          >
            {trendValue === 0 ? (
              <RiEqualFill />
            ) : (
              <RiArrowDownSFill
                className={classNames({
                  'rotate-180': trendValue! > 0,
                })}
              />
            )}
            {props.trendBy === 'followers'
              ? props.artistInfo.weeklyFollowersGrowingTrend &&
                Math.round(
                  Math.abs(props.artistInfo.weeklyFollowersGrowingTrend) * 100
                ) / 100
              : props.artistInfo.weeklyPostsGrowingTrend &&
                Math.round(
                  Math.abs(props.artistInfo.weeklyPostsGrowingTrend) * 100
                ) / 100}
            %
          </p>
        </div>
      </div>
      <ResponsiveContainer
        key={props.artistInfo.userId + props.trendBy}
        width="100%"
        height={props.height ? props.height : 200}
      >
        <AreaChart
          data={props.trendData}
          margin={{ top: 5, right: 25, left: 0, bottom: -5 }}
        >
          <defs>
            <linearGradient
              id={getArtistValue() + props.artistInfo.userId + props.trendBy}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="recordedAt"
            strokeOpacity={0.1}
            tickSize={12}
            interval={0}
            tickFormatter={(value: string) =>
              new Date(value).toLocaleDateString('en-EN', {
                month: 'short',
                day: 'numeric',
              })
            }
          />
          <YAxis
            strokeOpacity={0.1}
            tickSize={10}
            tickCount={5}
            tickFormatter={(value: number) => Math.round(value).toString()}
            domain={['auto', 'auto']}
            interval={0}
          />
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
              new Date(value).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })
            }
            formatter={(value: number, name: string, props: any) => [
              value,
              getArtistValue() === 'followersCount' ? 'Followers' : 'Tweets',
              props,
            ]}
            separator=": "
          />
          <Area
            isAnimationActive={false}
            type="bump"
            dataKey={getArtistValue()}
            stroke={strokeColor}
            strokeWidth={3}
            fillOpacity={0.5}
            fill={`url(#${getArtistValue() + props.artistInfo.userId + props.trendBy})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div
      className={classNames(
        'relative flex w-full flex-col gap-5 rounded-2xl p-5 text-xs',
        props.bgColor,
        { 'bg-dot-tertiary/50': !props.bgColor }
      )}
    >
      <div className="flex flex-row items-center justify-between gap-5">
        <p className="text-sm text-zinc-400">
          {props.trendBy.charAt(0).toUpperCase() + props.trendBy.slice(1)}{' '}
          growing trend
        </p>
        <div className="flex flex-row items-center gap-5">
          <p className="leading text-xl font-bold">
            {trendDifference > 0 ? '+' + trendDifference : trendDifference}
          </p>
          <p
            className={classNames(
              'flex flex-row items-center gap-1 rounded-lg p-2 px-4 text-base font-bold',
              {
                'bg-zinc-400/10 text-zinc-400': growthDynamics === 'neutral',
                'bg-[#a3e635]/10 text-[#a3e635]': growthDynamics === 'positive',
                'bg-[#FA4545]/10 text-[#FA4545]': growthDynamics === 'negative',
              }
            )}
          >
            {trendValue === 0 ? (
              <RiEqualFill />
            ) : (
              <RiArrowDownSFill
                className={classNames({
                  'rotate-180': trendValue! > 0,
                })}
              />
            )}
            {props.trendBy === 'followers'
              ? props.artistInfo.weeklyFollowersGrowingTrend &&
                Math.round(
                  Math.abs(props.artistInfo.weeklyFollowersGrowingTrend) * 100
                ) / 100
              : props.artistInfo.weeklyPostsGrowingTrend &&
                Math.round(
                  Math.abs(props.artistInfo.weeklyPostsGrowingTrend) * 100
                ) / 100}
            %
          </p>
        </div>
      </div>
      <ResponsiveContainer
        key={props.artistInfo.userId + props.trendBy}
        width="100%"
        height={props.height ? props.height : 200}
      >
        <AreaChart
          data={props.trendData}
          margin={{ top: 5, right: 25, left: 0, bottom: -5 }}
        >
          <defs>
            <linearGradient
              id={getArtistValue() + props.artistInfo.userId + props.trendBy}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="recordedAt"
            strokeOpacity={0.1}
            tickSize={12}
            interval={
              props.range === 31
                ? 1
                : props.range === 93
                  ? 3
                  : props.range === 186
                    ? 5
                    : props.range === 372
                      ? 8
                      : 0
            }
            tickFormatter={(value: string) =>
              new Date(value).toLocaleDateString('en-EN', {
                month: 'short',
                day: 'numeric',
              })
            }
          />
          <YAxis
            strokeOpacity={0.1}
            tickSize={10}
            tickCount={5}
            tickFormatter={(value: number) => Math.round(value).toString()}
            domain={['auto', 'auto']}
            interval={0}
          />
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
              new Date(value).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })
            }
            formatter={(value: number, name: string, props: any) => [
              value,
              getArtistValue() === 'followersCount' ? 'Followers' : 'Tweets',
              props,
            ]}
            separator=": "
          />
          <Area
            isAnimationActive={false}
            type="bump"
            dataKey={getArtistValue()}
            stroke={strokeColor}
            strokeWidth={3}
            fillOpacity={0.5}
            fill={`url(#${getArtistValue() + props.artistInfo.userId + props.trendBy})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
