import ArtistSearchPanel from './CustomComponents/SearchComponents/ArtistsSearchPanel';

export default function FindCreators() {
  return (
    <section className="grid w-full grid-cols-2 items-center gap-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-7xl text-transparent uppercase leading-[95.9%]">
          Discover creators
        </h1>
        <p className="text-pretty text-2xl">
          Search creators by tags and countries <br />
          or find yourself!
        </p>
      </div>
      <div className="relative min-h-[622px] overflow-hidden rounded-2xl p-2">
        <div className="h-full min-h-[622px] rounded-2xl border border-dot-white/5 bg-dot-primary/50 p-8">
          <ArtistSearchPanel />
        </div>
        <div className="-z-10 absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-dot-rose via-dot-rose/30 to-transparent opacity-20 " />
      </div>
    </section>
  );
}
