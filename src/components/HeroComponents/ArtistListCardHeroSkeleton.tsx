export default function ArtistListCardHeroSkeleton() {
  return (
    <>
      <section
        className={
          'flex w-full animate-pulse flex-col justify-between gap-5 overflow-hidden rounded-2xl bg-dot-primary'
        }
      >
        <div className={'relative flex flex-col gap-5 '}>
          <div className="h-48 w-full bg-dot-secondary object-cover" />
          <div className="flex w-full flex-col gap-5 px-5 pb-5">
            <div className="flex flex-row gap-3">
              <div className="h-[75px] w-[75px] rounded-xl bg-dot-secondary" />
              <div className="flex flex-col justify-center gap-3">
                <div className="w-48 rounded-full bg-dot-secondary p-3" />
                <div className="w-28 rounded-full bg-dot-secondary p-2" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-96 rounded-full bg-dot-secondary p-2" />
              <div className="w-96 rounded-full bg-dot-secondary p-2" />
            </div>
            <div className="flex w-full flex-row">
              <div className="h-[240px] w-full rounded-2xl bg-dot-tertiary/50" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
