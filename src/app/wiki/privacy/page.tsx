import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

export default function PrivacyPage() {
  return (
    <div className="bg-black-02 flex flex-col gap-8 rounded-xl p-8">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p className="bg-black-03 text-gray-01 w-fit rounded-xl p-3 px-5">
        Last update: <span className="text-white">18.05.2025</span>
      </p>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">No Personal Data Collection</h2>
        <p className="text-gray-01">
          We do not collect or store any personally identifiable information
          (such as names, email addresses, or IP addresses) from users of the
          Website. Our platform is designed to operate without gathering
          personal data from visitors.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Opt-Out for Featured Authors</h2>
        <p className="text-gray-01">
          If you are an author featured on our platform and would prefer not to
          have your public information displayed, you may contact us at any time
          to request removal. Please reach out to us at{' '}
          <Link
            href={'mailto:hi@anivire.xyz'}
            className={twJoin(
              'hover:text-red-01 inline-flex items-center gap-1',
              'transition-colors duration-200 ease-in-out'
            )}
          >
            hi@anivire.xyz
          </Link>
          , and we will promptly address your request.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Cookies and Tracking Technologies</h2>
        <p className="text-gray-01">
          We use minimal cookies and tracking technologies solely for the
          operation of our analytics system, as described in our Data Gathering
          Policy. These cookies do not collect personal information and are
          configured to respect user privacy. You can manage your cookie
          preferences through your browser settings.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Third-Party Links</h2>
        <p className="text-gray-01">
          The Website may contain links to third-party websites or services,
          such as X profiles or other public platforms. We are not responsible
          for the privacy practices or content of these third-party sites. We
          encourage you to review the privacy policies of any external sites you
          visit.
        </p>
      </div>
    </div>
  );
}
