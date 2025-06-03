import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';
import Link from 'next/link';

function Navigation({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <nav
      className={twJoin('mx-auto flex max-w-[1280px] pt-10', className)}
      {...props}
    >
      <Link href={'/'}>
        <Icon
          ico="i-dotcreators-logo"
          className="!text-red-01 flex text-[32px]"
        />
      </Link>
    </nav>
  );
}

export default Navigation;
