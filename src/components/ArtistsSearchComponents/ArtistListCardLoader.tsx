export default function ArtistListCardLoader() {
  return (
    <>
      <section
        className={
          'flex h-14 w-full animate-pulse flex-row items-center justify-between gap-5 overflow-hidden rounded-xl bg-dark-inner p-2 px-5'
        }
      >
        <div className={'flex flex-row items-center gap-5'}>
          <div className="h-10 w-10 rounded-full bg-dark-inner-hover" />
          <div className={'flex h-10 flex-row items-center gap-3'}>
            <div className={'h-5 w-48 rounded-full bg-dark-inner-hover'} />
            <div className={'h-5 w-28 rounded-full bg-dark-inner-hover'} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-5">
          <div className={'flex flex-row items-center justify-end gap-2'}>
            <div className={'h-5 w-20 rounded-full bg-dark-inner-hover'} />
            <div className={'h-5 w-8 rounded-full bg-dark-inner-hover'} />
          </div>
          <div className={'flex flex-row items-center justify-end gap-2'}>
            <div className={'h-5 w-20 rounded-full bg-dark-inner-hover'} />
            <div className={'h-5 w-8 rounded-full bg-dark-inner-hover'} />
          </div>
        </div>
      </section>
    </>
  );
}
