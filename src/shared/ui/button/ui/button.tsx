import { ButtonHTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

function Button() {}

type FlatButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: '01' | '02' | '03';
};

function Flat({
  className,
  children,
  variant = '01',
  ...props
}: FlatButtonProps) {
  return (
    <button
      className={twJoin(
        'flex h-fit flex-row items-center justify-center rounded-xl p-3 px-4',
        'cursor-pointer transition-colors duration-200 ease-in-out',
        variant === '01' && 'bg-black-02 hover:bg-black-03',
        variant === '02' && 'bg-black-03 hover:bg-black-04',
        variant === '03' && 'bg-black-04 hover:bg-black-05',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

Button.Flat = Flat;

export default Button;
