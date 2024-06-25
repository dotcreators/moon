import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
import RiAddLine from '~icons/ri/add-line';
import DotcreatorsLogoFooter from '../HeroComponents/DotcreatorsLogoFooter';
import { useRouter } from 'next/router';

export default function StartExploring() {
  const router = useRouter();
  return (
    <section className="relative mx-auto flex h-full max-w-7xl flex-col items-center gap-5 pt-48">
      <span className="-top-8 -z-10 absolute">
        <div className="absolute h-full w-full bg-gradient-to-b from-5% from-transparent to-65% to-dot-body" />
        <DotcreatorsLogoFooter />
      </span>
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-7xl text-transparent uppercase leading-[95.9%]">
          Start <br />
          exploring!
        </h1>
        <p className="text-pretty text-2xl">
          Search wonderful creators using our filters <br />
          or suggest yourself as an artist!
        </p>
      </div>
      <div className="mt-5 flex flex-row gap-3">
        <button
          onClick={() => router.push('/lists')}
          className="flex w-80 flex-row items-center justify-between gap-3 rounded-[2rem] border border-dot-white/10 bg-dot-primary p-5 px-8 duration-200 ease-in-out md:hover:rounded-xl md:hover:bg-dot-secondary"
        >
          Artists list
          <RiArrowRightUpLine />
        </button>
        <button
          onClick={() => router.push('/suggest')}
          className="flex w-fit flex-row items-center gap-3 rounded-full border border-dot-white/10 bg-dot-rose p-5 px-8 font-bold text-dot-body duration-200 ease-in-out md:hover:bg-dot-rose-light"
        >
          Suggest artists
          <RiAddLine />
        </button>
      </div>
    </section>
  );
}
