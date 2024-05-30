import ArtistSearchPanel from './CustomComponents/ArtistsSearchPanel';

export default function FindCreators() {
  return (
    <section className="grid w-full grid-cols-2 items-center gap-16">
      <div className="flex flex-col gap-5">
        <h1 className="text-pretty bg-gradient-to-b from-dot-rose to-zinc-400 bg-clip-text font-hubot-sans text-7xl uppercase leading-[95.9%] text-transparent">
          Discover creators
        </h1>
        <p className="text-pretty text-2xl">
          Search creators by tags and countries <br />
          or find yourself!
        </p>
      </div>
      <div className="relative overflow-hidden rounded-2xl p-2">
        <div className="rounded-2xl border border-dot-white/5 bg-dot-primary/50 p-8">
          <ArtistSearchPanel />
        </div>
        <div className="absolute bottom-0 left-0 -z-10 h-32 w-full bg-gradient-to-t from-dot-rose via-dot-rose/30 to-transparent  opacity-20 " />
      </div>
    </section>
  );
}
