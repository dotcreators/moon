import { DotcreatorsLogoResponsive } from '@/components/DotcreatorsLogoResponsive';
import DotcreatorsLogoFooter from '@/components/HeroComponents/DotcreatorsLogoFooter';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <NextSeo title="Privacy policy" />
      <section className="relative mx-auto mt-[100px] flex h-full max-w-xl flex-col items-center gap-5 rounded-2xl p-10 md:mt-48">
        <h1 className="mb-3 text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text text-center font-hubot-sans text-5xl uppercase leading-[95.9%] text-transparent md:text-7xl">
          Privacy Policy
        </h1>
        <div className="flex flex-col gap-5 text-pretty text-center text-lg md:text-start md:text-xl">
          <p>We do not collect any data about users on the website</p>
          <p>
            We use{' '}
            <Link
              href="https://umami.is/"
              target="_blank"
              className="text-dot-rose-light"
            >
              unami
            </Link>{' '}
            to roughly understand how many people are using it
          </p>
          <p>
            We use only public sources to gather information about authors
            (public profiles on{' '}
            <Link
              href="https://x.com/"
              target="_blank"
              className="text-dot-rose-light"
            >
              X
            </Link>{' '}
            ex Twitter)
          </p>
          <p>
            You can contact us{' '}
            <Link
              href="mailto:anivire.work@gmail.com"
              target="_blank"
              className="text-dot-rose-light"
            >
              us
            </Link>{' '}
            at any time if you would not like to be featured on our platform
          </p>
          <div className="mx-auto mt-3">
            <DotcreatorsLogoResponsive width={30} height={28} />
          </div>
        </div>
      </section>
    </>
  );
}
