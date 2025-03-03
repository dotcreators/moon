import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
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
import { useMediaQuery } from 'react-responsive';

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
  const [trendValue, setTrendValue] = useState<number | undefined>(() => {
    return props.trendBy === 'followers'
      ? props.artistInfo.weeklyFollowersTrend
      : props.artistInfo.weeklyTweetsTrend;
  });

  const [trendDifference, setTrendDifference] = useState<number>(0);
  const [trendsPercent, setTrendsPercent] = useState<number>(0);
  const [growthDynamics, setGrowthDynamics] = useState<
    'positive' | 'neutral' | 'negative'
  >('neutral');
  const [strokeColor, setStrokeColor] = useState<string>('#a1a1aa');

  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 600px) and (max-width: 1024px)',
  });
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

  useEffect(() => {
    const lastIndex = props.trendData.length - 1;

    const calculateTrend = (currentCount: number, initialCount: number) => {
      const difference = currentCount - initialCount;
      const percent = ((initialCount - currentCount) / currentCount) * 100;
      return { difference, percent };
    };

    if (props.trendBy === 'followers') {
      const { difference, percent } = calculateTrend(
        props.trendData[lastIndex].followersCount,
        props.trendData[0].followersCount
      );
      setTrendDifference(difference);
      setTrendsPercent(percent);
    } else {
      const { difference, percent } = calculateTrend(
        props.trendData[lastIndex].tweetsCount,
        props.trendData[0].tweetsCount
      );
      setTrendDifference(difference);
      setTrendsPercent(percent);
    }

    if (trendDifference === 0 || trendDifference === undefined) {
      setGrowthDynamics('neutral');
    } else if (trendDifference > 0) {
      setGrowthDynamics('positive');
    } else {
      setGrowthDynamics('negative');
    }

    if (growthDynamics === 'neutral') {
      setStrokeColor('#a1a1aa');
    } else if (growthDynamics === 'positive') {
      setStrokeColor('#a3e635');
    } else {
      setStrokeColor('#fa4545');
    }

    setTrendValue(trendsPercent);
  }, [props.trendData, trendDifference, growthDynamics, props.trendBy]);

  const getArtistValue = (): string => {
    return props.trendBy + 'Count';
  };

  return (
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
                  'rotate-180': trendValue! < 0,
                })}
              />
            )}
            {props.trendBy === 'followers'
              ? Math.round(
                  Math.abs(
                    props.range < 7
                      ? props.artistInfo.weeklyFollowersTrend!
                      : trendsPercent
                  ) * 100
                ) / 100
              : Math.round(
                  Math.abs(
                    props.range < 7
                      ? props.artistInfo.weeklyTweetsTrend!
                      : trendsPercent
                  ) * 100
                ) / 100}
            %
          </p>
        </div>
      </div>
      <ResponsiveContainer
        key={props.artistInfo.twitterUserId + props.trendBy}
        width="100%"
        height={props.height ? props.height : 200}
      >
        <AreaChart
          data={props.trendData}
          margin={
            !isMobile
              ? { top: 5, right: 25, left: 0, bottom: -5 }
              : { top: 5, right: 0, left: 0, bottom: 0 }
          }
        >
          <defs>
            <linearGradient
              id={
                getArtistValue() +
                props.artistInfo.twitterUserId +
                props.trendBy
              }
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            hide={isMobile ? true : false}
            dataKey="createdAt"
            strokeOpacity={0.1}
            tickSize={12}
            interval={
              props.range === 31
                ? !isTablet
                  ? 1
                  : 3
                : props.range === 93
                  ? !isTablet
                    ? 3
                    : 7
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
            hide={isMobile ? true : false}
            strokeOpacity={0.1}
            tickSize={10}
            tickCount={!isMobile ? 5 : 2}
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
            fill={`url(#${getArtistValue() + props.artistInfo.twitterUserId + props.trendBy})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
