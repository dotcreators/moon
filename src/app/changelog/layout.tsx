'use client';

import { twJoin } from 'tailwind-merge';

function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={twJoin(
        'relative mx-auto mt-5 flex w-full max-w-[900px] flex-col gap-3 px-3',
        'laptop:px-5 laptop:mb-5 laptop:gap-5 laptop:mt-5'
      )}
    >
      <div className={twJoin('flex flex-col gap-3')}>{children}</div>
    </section>
  );
}

export default ChangelogLayout;
