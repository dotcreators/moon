import { Metadata } from 'next';
import { CHANGELOG } from './content/versions';

const getLatestVersion = () => {
  return Object.keys(CHANGELOG).sort().reverse()[0];
};

export async function generateMetadata(): Promise<Metadata> {
  const latestVersion = getLatestVersion();
  return {
    title: `${CHANGELOG[latestVersion].title} › Changelog`,
  };
}

export default async function Page() {
  const latestVersion = getLatestVersion();

  const { default: Content } = await import(
    `@/app/changelog/content/${CHANGELOG[latestVersion].file}.mdx`
  );

  return (
    <div className="changelog-container">
      <Content />
    </div>
  );
}
