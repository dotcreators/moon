import { HTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';
import Link from 'next/link';
import { LINK } from '@/shared/constants/links';
import { FOOTER } from '@/shared/constants/footer';

function Footer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={twJoin(
        'mx-auto mb-5 flex w-full max-w-[1280px] flex-col p-5',
        className
      )}
      {...props}
    >
      <div className="bg-black-02 flex flex-col gap-8 rounded-xl p-8">
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col gap-4">
            <div className="!text-red-01 flex flex-row items-center gap-2">
              <Icon ico="i-dotcreators-logo" className="text-xl" />
              <p className="font-mona-sans text-2xl">dotcreators</p>
            </div>
            <p className="max-w-[300px] text-sm">
              Track, share and grow together with a community of talented pixel
              artists
            </p>
            <div className="text-sm">
              <span>dotcreators is </span>
              <Link
                href={LINK.github}
                target="_blank"
                className="text-red-01 inline-flex items-center gap-1"
              >
                <span>open source</span>
                <Icon ico="i-ri-arrow-right-up-line" />
              </Link>
            </div>
          </div>
          <div className="flex flex-row gap-12">
            <div className="text-gray-01 flex flex-col gap-1.5 text-sm">
              <h3 className="font-mona-sans text-white-01 mb-1 text-xl uppercase">
                Support
              </h3>
              {FOOTER.Support.map(item => (
                <Link
                  key={item.label.toLowerCase().replace(/ /, '-')}
                  href={item.link}
                  target={item.target}
                  className={twJoin(
                    'hover:text-red-01 inline-flex items-center gap-1',
                    'transition-colors duration-200 ease-in-out'
                  )}
                >
                  <span>{item.label}</span>
                  <Icon ico="i-ri-arrow-right-up-line" />
                </Link>
              ))}
            </div>
            <div className="text-gray-01 flex flex-col gap-1.5 text-sm">
              <h3 className="font-mona-sans text-white-01 mb-1 text-xl uppercase">
                Legal
              </h3>
              {FOOTER.Legal.map(item => (
                <Link
                  key={item.label.toLowerCase().replace(/ /, '-')}
                  href={item.link}
                  target={item.target}
                  className={twJoin(
                    'hover:text-red-01 inline-flex items-center gap-1',
                    'transition-colors duration-200 ease-in-out'
                  )}
                >
                  <span>{item.label}</span>
                  <Icon ico="i-ri-arrow-right-up-line" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row justify-between gap-2">
          <div className="bg-black-03 flex flex-row items-center gap-1.5 rounded-xl p-3 text-xs">
            <div className="bg-green-01/20 flex h-[14px] w-[14px] animate-pulse items-center justify-center rounded-full">
              <div className="bg-green-01 h-[6px] w-[6px] rounded-full" />
            </div>
            <p>Services online</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link
              href={'/settings'}
              className={twJoin(
                'bg-black-03 flex aspect-square h-full items-center justify-center rounded-md',
                'hover:bg-black-04 cursor-pointer',
                'transition-colors duration-200 ease-in-out'
              )}
            >
              <Icon ico="i-ri-settings-4-fill" />
            </Link>
            <button
              className={twJoin(
                'bg-black-03 flex aspect-square h-full items-center justify-center rounded-md',
                'hover:bg-black-04 cursor-pointer',
                'transition-colors duration-200 ease-in-out'
              )}
            >
              <Icon ico="i-ri-moon-fill" />
              {/* <Icon ico="i-ri-sun-fill" /> */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
