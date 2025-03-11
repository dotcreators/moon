import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

type IconProps = HTMLAttributes<HTMLDivElement> & { ico: string };

function Icon({ className, ico, ...props }: IconProps) {
  return <span className={twJoin(ico, className)} {...props} />;
}

export default Icon;
