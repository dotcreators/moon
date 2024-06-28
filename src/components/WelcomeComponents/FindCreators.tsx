import ArtistSearchPanel from './CustomComponents/SearchComponents/ArtistsSearchPanel';

export default function FindCreators() {
  return (
    <section className="grid w-full grid-cols-1 items-center gap-5 p-3 md:p-0 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-5xl uppercase leading-[95.9%] text-transparent md:text-7xl">
          Discover creators
        </h1>
        <p className="text-pretty text-xl md:text-2xl">
          Search creators by tags and countries{' '}
          <br className="hidden md:block" />
          or find yourself!
        </p>
      </div>
      <div className="relative overflow-hidden rounded-2xl p-2 md:min-h-[622px]">
        <div className="h-full rounded-2xl border border-dot-white/5 bg-dot-primary/50 p-3 md:min-h-[622px] md:p-8">
          <ArtistSearchPanel />
        </div>
        <div className="absolute bottom-0 left-0 -z-10 h-32 w-full bg-gradient-to-t from-dot-rose via-dot-rose/30 to-transparent opacity-20 " />
      </div>
    </section>
  );
}
