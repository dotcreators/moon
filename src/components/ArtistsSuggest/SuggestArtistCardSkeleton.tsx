export default function SuggestArtistCardSkeleton() {
  return (
    <div
      className={'flex w-full flex-col gap-5 rounded-2xl bg-dot-primary p-5'}
    >
      <section className="flex w-full animate-pulse flex-row items-center gap-5">
        <div className="min-h-[75px] min-w-[75px] rounded-2xl bg-dot-secondary" />
        <div className="flex flex-col gap-3">
          <div className="w-32 rounded-full bg-dot-secondary p-3" />
          <div className="w-28 rounded-full bg-dot-secondary p-2" />
        </div>
      </section>
    </div>
  );
}
