import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';

function Navigation({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <nav
      className={twJoin('mx-auto flex max-w-[1280px] pt-10', className)}
      {...props}
    >
      <Icon
        ico="i-dotcreators-logo"
        className="!text-red-01 flex text-[32px]"
      />
    </nav>
  );
}

export default Navigation;
