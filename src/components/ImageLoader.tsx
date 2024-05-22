import classNames from 'classnames';
import Image from 'next/image';
import { FC, useState } from 'react';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ImageLoader: FC<Props> = props => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div
      className={classNames(
        'relative h-fit w-fit overflow-hidden',
        props.className
      )}
    >
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        draggable={false}
        className={classNames('transition-opacity', {
          'opacity-0 blur-sm': !isLoaded,
          'opacity-100 blur-0 ': isLoaded,
        })}
        onLoad={() => setIsLoaded(true)}
      />
      <div
        className={classNames(
          'absolute inset-0 h-full w-full bg-dark-double-inner-hover/50 transition-opacity',
          {
            'opacity-0': isLoaded,
            'animate-pulse opacity-100': !isLoaded,
          }
        )}
      />
    </div>
  );
};
