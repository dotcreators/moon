import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

function ProfileComponent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twJoin(
        'bg-black-03 w-fit rounded-lg p-3 px-4',
        'flex flex-row items-center gap-2',
        'text-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ProfileComponent };
