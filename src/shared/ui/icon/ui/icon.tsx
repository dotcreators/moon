import { SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { ICONS, IconName } from '../models/icons';

type IconProps = SVGAttributes<SVGSVGElement> & {
  ico: IconName;
};

function Icon({ className, ico, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={twMerge('block h-[1em] w-[1em]', className)}
      {...props}
    >
      <use href={`${ICONS[ico].src}#icon`} width="100%" height="100%" />
    </svg>
  );
}

export default Icon;
