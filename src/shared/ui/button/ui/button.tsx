import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';

function Button() {}

type FlatButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isCentered?: boolean;
  variant?: '01' | '02' | '03';
};

function Flat({
  className,
  children,
  isCentered = true,
  variant = '01',
  ...props
}: FlatButtonProps) {
  return (
    <button
      className={twJoin(
        'flex h-fit flex-row rounded-xl p-3 px-4',
        'cursor-pointer transition-colors duration-200 ease-in-out',
        variant === '01' && 'bg-black-02 hover:bg-black-03',
        variant === '02' && 'bg-black-03 hover:bg-black-04',
        variant === '03' && 'bg-black-04 hover:bg-black-05',
        isCentered && 'items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = LinkProps & {
  children: ReactNode;
  className?: string;
  isCentered?: boolean;
  variant?: '01' | '02' | '03';
};

function ButtonLink({
  className,
  children,
  isCentered = true,
  variant = '01',
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={twJoin(
        'flex h-fit flex-row rounded-xl p-3 px-4',
        'cursor-pointer transition-colors duration-200 ease-in-out',
        variant === '01' && 'bg-black-02 hover:bg-black-03',
        variant === '02' && 'bg-black-03 hover:bg-black-04',
        variant === '03' && 'bg-black-04 hover:bg-black-05',
        isCentered && 'items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

Button.Flat = Flat;
Button.Link = ButtonLink;

export default Button;
