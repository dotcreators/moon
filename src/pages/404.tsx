import { DotcreatorsLogoResponsive } from '@/components/Other/DotcreatorsLogoResponsive';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <NextSeo
        title="Page not found"
        description="Error, page not found!"
        noindex={true}
        nofollow={true}
      />
      <section className="relative mx-auto mt-48 flex h-full max-w-7xl flex-col items-center gap-5 p-3 pt-20 md:p-0 md:pt-44">
        <span className="absolute -top-8 -z-10">
          <div className="absolute h-full w-full bg-gradient-to-b from-transparent from-5% to-dot-body to-65%" />
          <div className="hidden md:block">
            <DotcreatorsLogoResponsive width={400} height={380} />
          </div>
          <div className="block md:hidden">
            <DotcreatorsLogoResponsive width={200} height={180} />
          </div>
        </span>
        <div className="flex flex-col text-center md:gap-3">
          <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-[8rem] uppercase leading-[95.9%] text-transparent md:text-[12rem]">
            404
          </h1>
          <p className="text-pretty text-base md:text-2xl">
            Page not found, sorry...
          </p>
          <div className="mx-auto flex w-full flex-row gap-3 md:w-fit">
            <button
              onClick={() => router.back()}
              className="mx-auto mt-5 flex w-48 flex-row items-center justify-between gap-3 rounded-[2rem] border border-dot-white/10 bg-dot-primary p-2 px-5 text-zinc-400 duration-200 ease-in-out md:p-5 md:px-8 md:hover:rounded-xl md:hover:bg-dot-secondary"
            >
              Back
              <RiArrowRightUpLine />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
