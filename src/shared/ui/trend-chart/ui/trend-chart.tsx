import { Artist } from '@/shared/types/artist';
import { Trend } from '@/shared/types/trend';
import { trimValue } from '@/shared/utils/trim-value';
import { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
import { twJoin } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';
import { useTrendData } from '../models/use-trend-data';
import { useGrowthDynamics } from '../models/use-growth-dynamics';
import { useStrokeColor } from '../models/use-stroke-color';

type TrendChartProps = HTMLAttributes<HTMLDivElement> & {
  artistData: Artist;
  data: Trend[];
  range: number;
  trendBy: 'followers' | 'tweets';
  height?: string | number;
};

function TrendChart({
  className,
  artistData,
  data,
  trendBy,
  height = '100%',
  ...props
}: TrendChartProps) {
  const [trendValue, setTrendValue] = useState<number | null>(null);
  const { difference, percent } = useTrendData(data, trendBy);
  const growthDynamics = useGrowthDynamics(difference);
  const strokeColor = useStrokeColor(growthDynamics);

  useEffect(() => {
    setTrendValue(percent);
  }, [percent]);

  const getArtistValue = () =>
    trendBy === 'followers' ? 'followersCount' : 'tweetsCount';

  const showIcon = () => {
    if (trendValue) {
      if (trendValue == 0) {
        return <Icon ico="i-ri-equal-line" className="!text-xl" />;
      } else if (trendValue > 0) {
        return <Icon ico="i-ri-arrow-up-s-line" className="!text-xl" />;
      } else {
        return <Icon ico="i-ri-arrow-down-s-line" className="!text-xl" />;
      }
    }
  };

  const diff = () => {
    let r = 0;

    if (trendBy === 'followers') {
      const early = data[0].followersCount;
      const lasts = data[data.length - 1].followersCount;
      r = ((lasts - early) / early) * 100;
    } else {
      const early = data[0].tweetsCount;
      const lasts = data[data.length - 1].tweetsCount;
      r = ((lasts - early) / early) * 100;
    }

    return r;
  };

  return (
    <div
      className={twJoin('flex h-full flex-col gap-2 text-xs', className)}
      {...props}
    >
      <div className="flex flex-row items-center justify-between gap-3 rounded-lg">
        <div className="flex w-full flex-row items-center justify-between">
          <p className="text-sm text-zinc-400">
            {trendBy.charAt(0).toUpperCase() + trendBy.slice(1)}
          </p>
          <p className="text-base font-bold">
            {difference > 0 ? `+${difference}` : difference}
          </p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <p
            className={twJoin(
              'flex flex-row items-center gap-1 rounded-md p-1.5 pr-3 pl-2 text-sm font-bold',
              growthDynamics === 'neutral' && 'bg-zinc-400/10 text-zinc-400',
              growthDynamics === 'positive' && 'bg-[#a3e635]/10 text-[#a3e635]',
              growthDynamics === 'negative' && 'bg-[#FA4545]/10 text-[#FA4545]'
            )}
          >
            {showIcon()}
            {parseFloat(Math.abs(diff()).toFixed(3)).toString()}%
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 0, left: -60, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id={`${getArtistValue()}-${artistData.twitterUserId}-${trendBy}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.5} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis
            strokeOpacity={0.1}
            tickSize={10}
            tickCount={4}
            domain={['auto', 'auto']}
            interval={0}
            tickFormatter={(value: number) => trimValue(value)}
          />
          <XAxis
            dataKey="createdAt"
            strokeOpacity={0}
            tickSize={12}
            interval={'preserveStartEnd'}
            tickFormatter={(value: string) =>
              new Date(value).toLocaleDateString('en-EN', {
                month: '2-digit',
                day: 'numeric',
              })
            }
          />
          <CartesianGrid strokeOpacity={0.1} />
          <Tooltip
            contentStyle={{
              color: '#9f9fa8',
              backgroundColor: '#202020',
              border: 'none',
              borderRadius: '8px',
            }}
            itemStyle={{
              color: '#FDFDFD',
            }}
            labelFormatter={(value: string) =>
              new Date(value).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            }
            formatter={(value: number) => [
              value,
              trendBy === 'followers' ? 'Followers' : 'Tweets',
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
            fill={`url(#${getArtistValue()}-${artistData.twitterUserId}-${trendBy})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;
