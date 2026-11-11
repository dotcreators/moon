import { twJoin } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';
import { Tooltip } from '@/shared/ui/tooltip';
import { isNewArtist } from '@/shared/utils/is-new-artist';

type NewArtistBadgeProps = {
  createdAt: Date | string;
  className?: string;
};

function NewArtistBadge({ createdAt, className }: NewArtistBadgeProps) {
  if (!isNewArtist(createdAt)) return null;

  return (
    <Tooltip
      role="img"
      aria-label="New artist"
      className={twJoin('text-green-01 shrink-0', className)}
      content={
        <div className="flex flex-col gap-0.5">
          <p className="text-green-01 font-bold">New artist</p>
          <p className="text-gray-01">
            This artist was added recently, trend data is still being collected
          </p>
        </div>
      }
    >
      <Icon ico="seedling-fill" />
    </Tooltip>
  );
}

export { NewArtistBadge };
