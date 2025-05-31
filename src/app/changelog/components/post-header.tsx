'use client';

import ImageLoader from '@/shared/ui/image-loader';
import { StaticImageData } from 'next/image';
import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

type PostHeaderProps = HTMLAttributes<HTMLDivElement> & {
  image: StaticImageData;
  date: Date;
  title: string;
  ver: string;
};

function PostHeader({
  image,
  date,
  title,
  ver,
  className,
  ...props
}: PostHeaderProps) {
  return (
    <section
      className={twJoin('flex flex-col gap-5 pb-5', className)}
      {...props}
    >
      <ImageLoader
        alt="Banner image for changelog"
        src={image}
        className="border-white-01/10 rounded-xl border"
      />
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-row items-center gap-3">
          <p className="bg-black-02 font-mona-sans w-fit rounded-md px-3 py-2">
            v{ver}
          </p>
          <h1 className="font-mona-sans text-xl">{title}</h1>
        </div>
        <p className="text-gray-01 w-fit">
          {new Date(date).toLocaleDateString('en-EN', {
            dateStyle: 'full',
          })}
        </p>
      </div>
    </section>
  );
}

export { PostHeader };
