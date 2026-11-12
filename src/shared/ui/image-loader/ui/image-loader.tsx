import Image, { ImageProps } from 'next/image';
import { ReactNode, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

type ImeageLoaderProps = ImageProps & {
  variant?: '01' | '02' | '03' | '04';
  className?: string;
  fallback?: ReactNode;
  brokenClassName?: string;
};

function ImageLoader({
  className,
  variant = '01',
  src,
  width,
  height,
  alt,
  fallback,
  brokenClassName,
  onError,
  ...props
}: ImeageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [failedSrc, setFailedSrc] = useState<ImageProps['src'] | null>(null);
  const [prevSrc, setPrevSrc] = useState(src);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setIsLoaded(false);
    setFailedSrc(null);
  }

  const isBroken = !src || failedSrc === src;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError: ImageProps['onError'] = event => {
    setFailedSrc(src);
    onError?.(event);
  };

  return (
    <div
      className={twMerge(
        'relative items-center justify-center overflow-hidden',
        className,
        isBroken && brokenClassName
      )}
    >
      {!isBroken && (
        <Image
          alt={alt}
          src={src}
          onLoad={handleImageLoad}
          onError={handleImageError}
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
      )}
      {isBroken
        ? fallback && (
            <div className="text-gray-01 absolute inset-0 flex items-center justify-center">
              {fallback}
            </div>
          )
        : !isLoaded && (
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
