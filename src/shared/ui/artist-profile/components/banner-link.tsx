import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';

function BannerLink({
  className,
  children,
  isImageExist,
  ...props
}: LinkProps & {
  isImageExist: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      target={'_blank'}
      className={twJoin(
        'flex flex-row gap-2 rounded-lg',
        'h-[32px] w-[32px] cursor-pointer items-center justify-center',
        isImageExist ? 'hover:bg-black-03' : 'hover:bg-black-04',
        'transition-colors duration-200 ease-in-out',
        isImageExist ? 'bg-black-03/50 backdrop-blur-md' : 'bg-black-03',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export { BannerLink };
