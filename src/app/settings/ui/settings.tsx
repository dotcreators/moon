import Button from '@/shared/ui/button';
import Icon from '@/shared/ui/icon';
// import { twJoin } from 'tailwind-merge';

function Settings() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-row gap-4 p-5">
      <section className="bg-black-02 col-span-1 flex w-72 flex-col gap-4 rounded-xl p-5">
        <h1 className="font-mona-sans text-xl">Settings</h1>
        <Button.Flat variant="02">
          <Icon ico="i-ri-palette-line" />
          <p>Appearance</p>
        </Button.Flat>
      </section>

      {/* <div className="flex grow flex-col gap-4">
        <section
          className={twJoin(
            'bg-black-02 flex grow flex-col gap-4 rounded-xl p-5'
          )}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-mona-sans text-xl">
                Profile information layouts
              </h3>
              <p className="text-gray-01">
                Select your preferred layout for artist profile information
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4 rounded-xl p-4">
          <div className="flex w-full max-w-48 flex-col gap-2 justify-self-center rounded-xl">
            <ArtistProfileCard />
            <ArtistProfileCard />
            <ArtistProfileCardDetailed />
            <ArtistProfileCard /> 
          </div>
          <div className="flex w-full flex-row gap-2 rounded-xl">
            <div className="flex w-full max-w-48 flex-col gap-2">
              <ArtistProfileCard isSelected={true} />
              <ArtistProfileCard isSelected={true} />
              <ArtistProfileCard isSelected={true} />
              <ArtistProfileCard isSelected={true} />
              <ArtistProfileCard isSelected={true} />
            </div>
            <ArtistProfileCardDetailed isSelected={true} />
          </div>
        </div>
      </div> */}
    </div>
  );
}

// const ArtistProfileCard = ({ isSelected }: { isSelected: boolean }) => {
//   return (
//     <div
//       className={twJoin(
//         'flex h-[15px] w-full flex-row items-center justify-between gap-4 rounded-md px-4',
//         isSelected ? 'bg-red-01/20 border-red-01/80 border' : 'bg-black-02'
//       )}
//     />
//   );
// };

// const ArtistProfileCardDetailed = ({ isSelected }: { isSelected: boolean }) => {
//   return (
//     <div
//       className={twJoin(
//         'flex h-fit w-full flex-col items-center gap-4 overflow-hidden rounded-md',
//         isSelected ? 'bg-red-01/20 border-red-01/80 border' : 'bg-black-02'
//       )}
//     >
//       <div className="flex w-full flex-row items-center gap-4">
//         <div
//           className={twJoin(
//             'h-[30px] w-full',
//             isSelected ? 'bg-red-01/20' : 'bg-black-02'
//           )}
//         />
//       </div>
//       <div className="flex h-[30px] w-full flex-row items-center justify-between gap-4 px-5" />
//     </div>
//   );
// };

export default Settings;
