import { Metadata } from 'next';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

export const metadata: Metadata = {
  title: 'Data Gathering › Wiki',
};

function DataGathering() {
  return (
    <div
      className={twJoin(
        'bg-black-02 flex flex-col gap-5 rounded-xl p-5',
        'laptop:p-8 laptop:gap-8'
      )}
    >
      <h1 className="text-3xl font-bold">Data Gathering</h1>

      <p className="bg-black-03 text-gray-01 w-fit rounded-xl p-3 px-5">
        Last update: <span className="text-white">08.01.2026</span>
      </p>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl">What information we collect</h2>
        <div className="flex flex-col gap-6">
          <div className="bg-black-03 flex flex-col gap-3 rounded-xl p-4">
            <h3 className="text-lg">Information about featured artists</h3>
            <p className="text-gray-01">
              We gather information about artists featured on our platform
              exclusively from public sources, such as public profiles on{' '}
              <Link
                href={'https://x.com/'}
                className={twJoin(
                  'text-red-01 inline-flex items-center gap-1',
                  'transition-colors duration-200 ease-in-out'
                )}
              >
                x.com (formerly twitter.com)
              </Link>
              . This information may include:
            </p>
            <ul className="text-gray-01 my-1 flex list-disc flex-col gap-2 pl-4">
              <li>
                <b>Public</b> accounts data
              </li>
              <li>
                Other details available in the <b>public</b> domain
              </li>
            </ul>
            <p className="text-gray-01">
              We do not collect or use private or non-public information about
              authors.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">How we use information</h2>
        <p className="text-gray-01">
          Publicly available information about artists is used to feature their
          work on our platform, promoting their contributions in accordance with
          their public profiles.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Sharing of information</h2>
        <p className="text-gray-01">
          We do not share, sell or disclose any information collected through
          website with third parties, except as required by law or to protect
          the rights, property or safety of{' '}
          <Link
            href={'https://dotcreators.xyz'}
            className={twJoin(
              'text-red-01 inline-flex items-center gap-1',
              'transition-colors duration-200 ease-in-out'
            )}
          >
            dotcreators.xyz
          </Link>
          , its users or the public.
        </p>
      </div>
    </div>
  );
}

export default DataGathering;
