import BentoArtistsList from "@/components/BentoComponents/BentoArtistsList";
import BentoIamArtist from "@/components/BentoComponents/BentoIamArtist";
import BentoSuggestArtist from "@/components/BentoComponents/BentoSuggestArtist";
import BentoWeeklyArtist from "@/components/BentoComponents/BentoWeeklyArtist";
import LiveArtistsQueue from "@/components/LiveArtistsQueue";


export default function Home() {
  return (
    <>
      <section className="flex flex-col justify-center items-center min-h-screen w-full max-w-7xl m-auto pt-10">
        <LiveArtistsQueue/>
        <section className="grid grid-cols-3 gap-5 w-full m-5">
          <BentoIamArtist/>
          <BentoArtistsList/>
          <BentoWeeklyArtist/>
          <BentoSuggestArtist/>
        </section>
      </section>
    </>
  );
}
