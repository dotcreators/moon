import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

function PostWrapper({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <article
      className={twJoin(
        'bg-black-02 flex flex-col gap-8 rounded-xl p-5',
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
}

export { PostWrapper };
