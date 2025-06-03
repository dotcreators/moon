import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

type IconProps = HTMLAttributes<HTMLDivElement> & {
  ico: string;
};

function Icon({ className, ico, ...props }: IconProps) {
  if (ico === 'i-dotcreators-logo') {
    return (
      <span className={twJoin(className)}>
        <svg viewBox="0 0 26 26" className="inline-block h-[1em] w-[1em]">
          <path
            d="M0 0H10.4V5H5.2V10H10.4V15H15.6V10H20.8V5H15.6V0H26V10H20.8V15H15.6V20H10.4V15H5.2V10H0V0Z"
            fill="currentColor"
          />
        </svg>
      </span>
    );
  } else {
    return <span className={twJoin('block', ico, className)} {...props} />;
  }
}

export default Icon;
