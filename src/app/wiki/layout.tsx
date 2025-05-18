'use client';

import Button from '@/shared/ui/button';
import Icon from '@/shared/ui/icon';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section
      className={twJoin(
        'relative mx-auto flex max-w-[1280px] flex-col',
        'mb-3 gap-3 px-3',
        'laptop:flex-row laptop:px-5 laptop:mb-5 laptop:gap-5'
      )}
    >
      <section
        className={twJoin(
          'bg-black-02 flex h-fit flex-col gap-5 rounded-xl p-3',
          'laptop:w-64 laptop:min-w-64 laptop:p-5',
          'desktop:w-72 desktop:min-w-72'
        )}
      >
        <div className="flex flex-col gap-1">
          <Button.Link
            href={'/wiki/privacy'}
            variant={pathname === '/wiki/privacy' ? '02' : '01'}
            isCentered={false}
          >
            <div className="flex flex-row items-center gap-2">
              <Icon ico="i-ri-lock-fill" className="!text-gray-01" />
              <p>Privacy Policy</p>
            </div>
          </Button.Link>
          <Button.Link
            href={'/wiki/data-gathering'}
            variant={pathname === '/wiki/data-gathering' ? '02' : '01'}
            isCentered={false}
          >
            <div className="flex flex-row items-center gap-2">
              <Icon ico="i-ri-archive-2-fill" className="!text-gray-01" />
              <p>Data Gathering</p>
            </div>
          </Button.Link>
        </div>
      </section>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
