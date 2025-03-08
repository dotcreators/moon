import { Artist } from '@/app/shared/types/artist';
import { Trend } from '@/app/shared/types/trend';
import { trimValue } from '@/app/shared/utils/trim-value';
import { HTMLAttributes, useEffect, useState } from 'react';
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
import { Icon } from '@/app/shared/ui/icon';
import { useTrendData } from '../models/use-trend-data';
import { useGrowthDynamics } from '../models/use-growth-dynamics';
import { useStrokeColor } from '../models/use-stroke-color';
import { useFormattedValue } from '../models/use-formatted-value';

type TrendChartProps = HTMLAttributes<HTMLDivElement> & {
  artistData: Artist;
  data: Trend[];
  range: number;
  trendBy: 'followers' | 'tweets';
  height?: number;
};

function TrendChart({
  className,
  artistData,
  data,
  range,
  trendBy,
  height = 200,
  ...props
}: TrendChartProps) {
  const [trendValue, setTrendValue] = useState<number | null>(null);

  const { difference, percent } = useTrendData(data, trendBy);
  const growthDynamics = useGrowthDynamics(difference);
  const strokeColor = useStrokeColor(growthDynamics);
  const formattedValue = useFormattedValue(trendBy, artistData, range, percent);

  useEffect(() => {
    setTrendValue(percent);
  }, [percent]);

  const getArtistValue = () =>
    trendBy === 'followers' ? 'followersCount' : 'tweetsCount';

  return (
    <div
      className={twJoin('flex flex-col gap-2 text-xs', className)}
      {...props}
    >
      <div className="flex flex-row items-center justify-between gap-5">
        <p className="text-sm text-zinc-400">
          {trendBy.charAt(0).toUpperCase() + trendBy.slice(1)}
        </p>
        <div className="flex flex-row items-center gap-4">
          <p className="text-xl font-bold">
            {difference > 0 ? `+${difference}` : difference}
          </p>
          <p
            className={twJoin(
              'flex flex-row items-center gap-1 rounded-lg p-2 px-4 text-base font-bold',
              growthDynamics === 'neutral' && 'bg-zinc-400/10 text-zinc-400',
              growthDynamics === 'positive' && 'bg-[#a3e635]/10 text-[#a3e635]',
              growthDynamics === 'negative' && 'bg-[#FA4545]/10 text-[#FA4545]'
            )}
          >
            {trendValue === 0 ? (
              <Icon ico="i-ri-arrow-up-s-fill" className="text-2xl" />
            ) : (
              <Icon
                ico="i-ri-arrow-up-s-fill"
                className={twJoin('text-2xl', trendValue! < 0 && 'rotate-180')}
              />
            )}
            {formattedValue}%
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
            tickCount={3}
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

export { TrendChart };
