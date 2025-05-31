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
        Last update: <span className="text-white">31.05.2025</span>
      </p>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Visitor Data Collection</h2>
        <div className="bg-black-03 flex flex-col gap-3 rounded-xl p-4">
          <h3 className="text-lg">Anonymous Analytics</h3>
          <p className="text-gray-01">
            To better understand usage trends, we utilize Umami, an open-source,
            privacy-focused analytics tool. Umami gathers anonymized, aggregated
            data about website activity, including:
          </p>
          <ul className="text-gray-01 my-1 flex list-disc flex-col gap-2 pl-4">
            <li>Number of visitors</li>
            <li>Page views</li>
            <li>General geographic regions (e.g., country-level data)</li>
          </ul>
          <p className="text-gray-01">
            This information is fully anonymized, does not identify individual
            users, and is used exclusively to improve the website and enhance
            your experience.
          </p>
        </div>
        <p className="text-gray-01">
          We do not collect or store any personally identifiable information,
          such as names, email addresses, or IP addresses, from website
          visitors. Our platform is designed to prioritize privacy and operate
          without gathering personal data.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Opt-Out for Featured Artists</h2>
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
        <h2 className="text-xl">Cookies and Tracking Technologies</h2>
        <p className="text-gray-01">
          We don`t use cookies minimal and tracking technologies solely for the
          operation of our analytics system, as described in our Data Gathering
          Policy. These technologies do not collect personal information and are
          configured to respect user privacy.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Third-Party Links</h2>
        <p className="text-gray-01">
          The Website contain links to third-party websites or services, such as
          X profiles or other public platforms. We are not responsible for the
          privacy practices or content of these third-party sites. We encourage
          you to review the privacy policies of any external sites you visit.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPage;
