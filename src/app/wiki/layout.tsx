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
        'relative mx-auto mb-5 flex max-w-[1280px] flex-row gap-5 px-5'
      )}
    >
      <section className="bg-black-02 flex h-fit w-72 min-w-72 flex-col gap-5 rounded-xl p-5">
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
