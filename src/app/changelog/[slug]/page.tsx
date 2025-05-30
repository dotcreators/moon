import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const formattedTitle = slug
    .split('-')
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join(' ');
  return {
    title: `${formattedTitle} › Changelog`,
  };
}

export function generateStaticParams() {
  return [{ slug: 'a-new-begining' }];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const { default: Content } = await import(
    `@/app/changelog/[slug]/content/${slug}.mdx`
  );
  return <Content />;
}

export const dynamicParams = false;
