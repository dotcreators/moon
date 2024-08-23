export default function ArtistListCardSkeletonLoader() {
  return (
    <>
      <section
        className={
          'flex h-[51px] w-full animate-pulse flex-row items-center justify-between gap-3 overflow-hidden bg-dot-primary p-2 px-3 md:rounded-2xl md:px-5'
        }
      >
        <div className={'flex flex-row items-center gap-3'}>
          <div className="h-8 w-8 rounded-full bg-dot-secondary md:h-[35px] md:w-[35px]" />
          <div className={'flex h-10 flex-row items-center gap-3'}>
            <div className={'h-5 w-24 rounded-full bg-dot-secondary md:w-48'} />
            <div className={'h-5 w-16 rounded-full bg-dot-secondary md:w-28'} />
          </div>
        </div>
      </section>
    </>
  );
}
