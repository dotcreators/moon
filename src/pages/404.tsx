import { DotcreatorsLogoResponsive } from '@/components/DotcreatorsLogoResponsive';
import { useRouter } from 'next/router';
import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="relative mx-auto flex h-full max-w-7xl flex-col items-center gap-5 pt-20 mt-48 md:pt-44 p-3 md:p-0">
      <span className="-top-8 -z-10 absolute">
        <div className="absolute h-full w-full bg-gradient-to-b from-5% from-transparent to-65% to-dot-body" />
        <div className="hidden md:block">
          <DotcreatorsLogoResponsive width={400} height={380} />
        </div>
        <div className="block md:hidden">
          <DotcreatorsLogoResponsive width={200} height={180} />
        </div>
      </span>
      <div className="flex flex-col md:gap-3 text-center">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-[8rem] text-transparent uppercase leading-[95.9%] md:text-[12rem]">
          404
        </h1>
        <p className="text-pretty text-base md:text-2xl">
          Page not found, sorry...
        </p>
        <div className="flex flex-row gap-3 w-full md:w-fit mx-auto">
          <button
            onClick={() => router.back()}
            className="flex mt-5 w-48 mx-auto flex-row items-center justify-between gap-3 rounded-[2rem] border border-dot-white/10 bg-dot-primary p-2 text-zinc-400 px-5 md:p-5 md:px-8 duration-200 ease-in-out md:hover:rounded-xl md:hover:bg-dot-secondary"
          >
            Back
            <RiArrowRightUpLine />
          </button>
        </div>
      </div>
    </section>
  );
}
