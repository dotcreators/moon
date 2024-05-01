export default function LiveArtistsQueue() {
  return (
    <section className="flex w-full flex-row items-center justify-start gap-5 overflow-hidden">
      <div className="flex flex-row items-center gap-2">
        <div className="mx-auto flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-[#7BEF44]/10">
          <div className="h-2 w-2 rounded-full bg-[#7BEF44]/80" />
        </div>
        <p>Live</p>
      </div>
      <section className="flex flex-row gap-3">
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-dark-inner"></div>
      </section>
    </section>
  );
}
