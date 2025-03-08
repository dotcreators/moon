import Image, { ImageProps } from 'next/image';
import { twJoin } from 'tailwind-merge';

type FlagProps = Omit<ImageProps, 'src' | 'alt'> & { country: string };

function Flag({ className, country, ...props }: FlagProps) {
  return (
    <Image
      alt={`${country.toUpperCase()}`}
      src={`https://flagcdn.com/24x18/${country.toLowerCase()}.webp`}
      width={24}
      height={18}
      className={twJoin('h-auto w-[24px] rounded-sm', className)}
      aria-label={`Flag of ${country.toUpperCase()}`}
      title={`Flag of ${country.toUpperCase()}`}
      {...props}
    />
  );
}

export { Flag };
