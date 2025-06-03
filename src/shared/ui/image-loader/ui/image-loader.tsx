import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { twJoin } from 'tailwind-merge';

type ImeageLoaderProps = ImageProps & {
  variant?: '01' | '02' | '03' | '04';
  className?: string;
};

function ImageLoader({
  className,
  variant = '01',
  src,
  width,
  height,
  alt,
  ...props
}: ImeageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={twJoin(
        'relative items-center justify-center overflow-hidden',
        className
      )}
    >
      <Image
        alt={alt}
        src={src}
        onLoad={handleImageLoad}
        draggable={false}
        width={width}
        height={height}
        {...props}
        className={twJoin(
          'h-full w-full object-cover text-xs',
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
      {!isLoaded && (
        <div
          className={twJoin(
            'absolute inset-0 h-full w-full',
            'animate-pulse',
            variant === '01' && 'bg-black-01',
            variant === '02' && 'bg-black-02',
            variant === '03' && 'bg-black-03',
            variant === '04' && 'bg-black-04'
          )}
        />
      )}
    </div>
  );
}

export default ImageLoader;
