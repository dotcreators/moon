import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

function BannerButton({
  className,
  children,
  isImageExist,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { isImageExist: boolean }) {
  return (
    <button
      className={twJoin(
        'flex flex-row gap-2 rounded-lg',
        'h-[36px] w-[36px] cursor-pointer items-center justify-center',
        isImageExist ? 'hover:bg-black-03' : 'hover:bg-black-04',
        'transition-colors duration-200 ease-in-out',
        isImageExist ? 'bg-black-03/50 backdrop-blur-md' : 'bg-black-03',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { BannerButton };
