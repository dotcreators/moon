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
    <div className={classNames('relative overflow-hidden', props.className)}>
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        draggable={false}
        className={classNames('transition-opacity', {
          'opacity-0': !isLoaded,
          'opacity-100': isLoaded,
        })}
        onLoad={() => setIsLoaded(true)}
      />
      <div
        className={classNames(
          'absolute inset-0 h-full w-full animate-pulse bg-dark-inner-hover/50 transition-opacity',
          {
            'opacity-0': isLoaded,
            'opacity-100': !isLoaded,
          }
        )}
      />
    </div>
  );
};
