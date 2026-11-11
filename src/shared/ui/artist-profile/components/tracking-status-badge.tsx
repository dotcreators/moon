import { twMerge } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';
import { Tooltip } from '@/shared/ui/tooltip';
import { TrackingStatus } from '@/shared/types/artist';

const STATUS_DESCRIPTION: Record<Exclude<TrackingStatus, 'active'>, string> = {
  suspended: 'This profile is suspended on X, its data is not being updated',
  not_found:
    'This profile was not found on X, it may have been deleted or renamed. Its data is not being updated',
};

type TrackingStatusBadgeProps = {
  status?: TrackingStatus;
  className?: string;
};

function TrackingStatusBadge({ status, className }: TrackingStatusBadgeProps) {
  if (!status || status === 'active') return null;

  return (
    <Tooltip
      role="img"
      aria-label="Tracking paused"
      className={twMerge(
        'bg-yellow-01/10 text-yellow-01 shrink-0 rounded-md p-1 text-sm',
        className
      )}
      content={
        <div className="flex flex-col gap-0.5">
          <p className="text-yellow-01 font-bold">Tracking paused</p>
          <p className="text-gray-01">{STATUS_DESCRIPTION[status]}</p>
        </div>
      }
    >
      <Icon ico="pause-circle-fill" />
    </Tooltip>
  );
}

export { TrackingStatusBadge };
