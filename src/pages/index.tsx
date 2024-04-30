import BentoArtistsList from '@/components/BentoComponents/BentoArtistsList'
import BentoIamArtist from '@/components/BentoComponents/BentoIamArtist'
import BentoSuggestArtist from '@/components/BentoComponents/BentoSuggestArtist'
import BentoWeeklyArtist from '@/components/BentoComponents/BentoWeeklyArtist'
import LiveArtistsQueue from '@/components/LiveArtistsQueue'

export default function Home() {
  return (
    <>
      <section className="m-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center pt-10">
        <LiveArtistsQueue />
        <section className="m-5 grid w-full grid-cols-3 gap-5">
          <BentoIamArtist />
          <BentoArtistsList />
          <BentoWeeklyArtist />
          <BentoSuggestArtist />
        </section>
      </section>
    </>
  )
}
