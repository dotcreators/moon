import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
import RiAddLine from '~icons/ri/add-line';
import { useRouter } from 'next/router';
import { DotcreatorsLogoResponsive } from '../Other/DotcreatorsLogoResponsive';

export default function StartExploring() {
  const router = useRouter();
  return (
    <section className="relative mx-auto flex h-full max-w-7xl flex-col items-center gap-5 p-3 pt-20 md:p-0 md:pt-48">
      <span className="absolute -top-8 -z-10">
        <div className="absolute h-full w-full bg-gradient-to-b from-transparent from-5% to-dot-body to-65%" />
        <div className="hidden md:block">
          <DotcreatorsLogoResponsive width={400} height={380} />
        </div>
        <div className="block md:hidden">
          <DotcreatorsLogoResponsive width={200} height={180} />
        </div>
      </span>
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-5xl uppercase leading-[95.9%] text-transparent md:text-7xl">
          Start <br />
          exploring!
        </h1>
        <p className="text-pretty text-xl md:text-2xl">
          Search wonderful creators using our filters{' '}
          <br className="hidden md:block" />
          or suggest yourself as an artist!
        </p>
      </div>
      <div className="flex w-full flex-row gap-3 md:mt-5 md:w-fit">
        <button
          onClick={() => router.push('/artists')}
          className="flex w-full flex-row items-center justify-between gap-3 rounded-[2rem] border border-dot-white/10 bg-dot-primary p-4 px-5 duration-200 ease-in-out md:w-80 md:p-5 md:px-8 md:hover:rounded-xl md:hover:bg-dot-secondary"
        >
          Go to Artists
          <RiArrowRightUpLine />
        </button>
        <button
          onClick={() => router.push('/suggest')}
          className="flex w-fit flex-row items-center gap-3 rounded-full border border-dot-white/10 bg-dot-rose p-4 font-bold text-dot-body duration-200 ease-in-out md:p-5 md:px-8 md:hover:bg-dot-rose-light"
        >
          <span className="hidden md:block">Suggest artists</span>
          <RiAddLine className="text-2xl md:text-base" />
        </button>
      </div>
    </section>
  );
}
