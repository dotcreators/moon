import { HTMLAttributes, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';
import Link from 'next/link';
import { LINK } from '@/shared/constants/links';
import { FOOTER } from '@/shared/constants/footer';

const API_URL = process.env.API_URL;

function Footer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [status, setStatus] = useState<
    'operational' | 'downtime' | 'degraded' | 'maintenance' | null
  >(null);

  useEffect(() => {
    async function getStatus() {
      try {
        const response = await fetch(`${API_URL}/health-check/status`);

        if (response.ok) {
          const data = await response.json();
          setStatus(data.status);
        }
      } catch (e) {
        console.error(e);
      }
    }

    getStatus();
  }, []);

  return (
    <section
      className={twJoin(
        'relative mx-auto flex w-full max-w-[1280px] flex-col',
        'mb-5 gap-3 px-3',
        'laptop:flex-row laptop:px-5 laptop:gap-5',

        className
      )}
      {...props}
    >
      <div
        className={twJoin(
          'bg-black-02 flex w-full flex-col gap-5 rounded-xl p-5',
          'laptop:gap-8 laptop:p-8'
        )}
      >
        <div
          className={twJoin(
            'flex w-full flex-col gap-5',
            'tablet:flex-row tablet:justify-between'
          )}
        >
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
          <div
            className={twJoin(
              'my-5 flex flex-col gap-5',
              'tablet:flex-row laptop:gap-12 laptop:my-0'
            )}
          >
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
          <Link
            href={LINK.status}
            target="_blank"
            className="bg-black-03 flex flex-row items-center gap-1.5 rounded-xl p-3 text-xs"
          >
            <div
              className={twJoin(
                'flex h-[14px] w-[14px] animate-pulse items-center justify-center rounded-full',
                (!status || status === 'downtime' || status === 'degraded') &&
                  'bg-red-01/20',
                status === 'operational' && 'bg-green-01/20',
                status === 'maintenance' && 'bg-yellow-01/20'
              )}
            >
              <div
                className={twJoin(
                  'h-[6px] w-[6px] rounded-full',
                  status === 'operational' && 'bg-green-01',
                  (!status || status === 'downtime' || status === 'degraded') &&
                    'bg-red-01',
                  status === 'maintenance' && 'bg-yellow-01'
                )}
              />
            </div>
            <p>Services {status ? status : 'unknown'}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Footer;
