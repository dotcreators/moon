import { Metadata } from 'next';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

export const metadata: Metadata = {
  title: 'Privacy Policy › Wiki',
};

function PrivacyPage() {
  return (
    <div
      className={twJoin(
        'bg-black-02 flex flex-col gap-5 rounded-xl p-5',
        'laptop:p-8 laptop:gap-8'
      )}
    >
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p className="bg-black-03 text-gray-01 w-fit rounded-xl p-3 px-5">
        Last update: <span className="text-white">08.01.2026</span>
      </p>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl">Visitor data collection</h2>
        <div className="bg-black-03 flex flex-col gap-3 rounded-xl p-4">
          <h3 className="text-lg">Anonymous analytics</h3>
          <p className="text-gray-01">
            To better understand usage trends, we utilize{' '}
            <Link
              href={'https://umami.is/'}
              className={twJoin(
                'text-red-01 inline-flex items-center gap-1',
                'transition-colors duration-200 ease-in-out'
              )}
            >
              Umami
            </Link>
            , an open-source, privacy-focused analytics tool. Umami gathers
            anonymized, aggregated data about website activity, including:
          </p>
          <ul className="text-gray-01 my-1 flex list-disc flex-col gap-2 pl-4">
            <li>Number of visitors</li>
            <li>Page views</li>
            <li>General geographic regions (e.g., country-level data)</li>
          </ul>
          <p className="text-gray-01">
            This information is completely anonymized and does not allow
            individual users to be identified.
          </p>
        </div>
        <p className="text-gray-01">
          We do not collect or store any personally identifiable information,
          such as names, email addresses or IP addresses, from website visitors.
          Our platform is designed to prioritize privacy and operate without
          gathering personal data.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Opt-out for featured artists</h2>
        <p className="text-gray-01">
          If you are an artists featured on our platform and would prefer not to
          have your public information displayed, you may contact us at any time
          to request removal. Please reach out to us at{' '}
          <Link
            href={'mailto:hi@anivire.xyz'}
            className={twJoin(
              'text-red-01 inline-flex items-center gap-1',
              'transition-colors duration-200 ease-in-out'
            )}
          >
            hi@anivire.xyz
          </Link>{' '}
          and we will promptly address your request.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Cookies and tracking technologies</h2>
        <p className="text-gray-01">
          We use cookies and tracking technologies solely for the operation of
          our analytics system. These technologies do not collect personal
          information and are configured with user privacy in mind.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Third-party links</h2>
        <p className="text-gray-01">
          Website contain links to third-party websites or services, such as{' '}
          <Link
            href={'https://x.com/'}
            className={twJoin(
              'text-red-01 inline-flex items-center gap-1',
              'transition-colors duration-200 ease-in-out'
            )}
          >
            x.com (formerly twitter.com)
          </Link>{' '}
          profiles or other public platforms. We are not responsible for the
          privacy practices or content of these third-party sites. We encourage
          you to review the privacy policies of any external sites you visit.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPage;
