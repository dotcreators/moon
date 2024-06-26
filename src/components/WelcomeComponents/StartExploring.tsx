import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
import RiAddLine from '~icons/ri/add-line';
import { useRouter } from 'next/router';
import { DotcreatorsLogoResponsive } from '../DotcreatorsLogoResponsive';

export default function StartExploring() {
  const router = useRouter();
  return (
    <section className="relative mx-auto flex h-full max-w-7xl flex-col items-center gap-5 pt-20 md:pt-48 p-3 md:p-0">
      <span className="-top-8 -z-10 absolute">
        <div className="absolute h-full w-full bg-gradient-to-b from-5% from-transparent to-65% to-dot-body" />
        <div className="hidden md:block">
          <DotcreatorsLogoResponsive width={400} height={380} />
        </div>
        <div className="block md:hidden">
          <DotcreatorsLogoResponsive width={200} height={180} />
        </div>
      </span>
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-5xl text-transparent uppercase leading-[95.9%] md:text-7xl">
          Start <br />
          exploring!
        </h1>
        <p className="text-pretty text-xl md:text-2xl">
          Search wonderful creators using our filters{' '}
          <br className="hidden md:block" />
          or suggest yourself as an artist!
        </p>
      </div>
      <div className="md:mt-5 flex flex-row gap-3 w-full md:w-auto">
        <button
          onClick={() => router.push('/lists')}
          className="flex w-full md:w-80 flex-row items-center justify-between gap-3 rounded-[2rem] border border-dot-white/10 bg-dot-primary p-4 px-5 md:p-5 md:px-8 duration-200 ease-in-out md:hover:rounded-xl md:hover:bg-dot-secondary"
        >
          Artists list
          <RiArrowRightUpLine />
        </button>
        <button
          onClick={() => router.push('/suggest')}
          className="flex w-fit flex-row items-center gap-3 rounded-full border border-dot-white/10 bg-dot-rose p-4 md:p-5 md:px-8 font-bold text-dot-body duration-200 ease-in-out md:hover:bg-dot-rose-light"
        >
          <span className="hidden md:block">Suggest artists</span>
          <RiAddLine className="md:text-base text-2xl" />
        </button>
      </div>
    </section>
  );
}
