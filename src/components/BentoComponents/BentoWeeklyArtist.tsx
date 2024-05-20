import classNames from 'classnames';
import Image from 'next/image';
import RiArrowDropUpLine from '~icons/ri/arrow-drop-up-line';

export default function BentoWeeklyArtist() {
  const author = {
    username: '@moawko',
    name: 'moaw! 🧄',
    followersCount: '43.2K',
    tweetsCount: '23.7K',
    country: 'KR',
  };
  return (
    <section
      style={{ willChange: 'transform' }}
      className={classNames(
        `group relative flex h-80 w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl bg-dark-inner p-8`
      )}
    >
      <h1 className="z-20 w-20 font-hubot-sans text-2xl transition-all duration-200 ease-in-out group-hover:opacity-0">
        Weekly most growing author
      </h1>
      <div className="z-20 mt-2 flex flex-col gap-8 transition-all duration-300 ease-in-out group-hover:mt-0 group-hover:-translate-y-36">
        <div className="flex flex-row gap-5">
          <Image
            alt={'Avatar for' + author.username}
            src="https://pbs.twimg.com/profile_images/1669135340446023680/1X9kFGt0_bigger.jpg"
            width={100}
            height={100}
            draggable={false}
            className="z-20 h-24 w-24 rounded-2xl"
          />
          <div className="w-full">
            <p className="flex w-fit flex-wrap items-center rounded-full bg-green-900/50 px-3 font-black text-emerald-400">
              <RiArrowDropUpLine className="text-2xl" /> 10%
            </p>
            <h1 className="truncate text-ellipsis font-hubot-sans text-3xl font-black">
              {author.name}
            </h1>
            <p className="truncate text-ellipsis text-xl text-zinc-400">
              {author.username}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5 transition-all duration-200 ease-in-out">
          <div>
            <h1 className="font-hubot-sans text-2xl font-black">
              {author.followersCount}
            </h1>
            <p className="text-zinc-400">followers</p>
          </div>
          <div>
            <h1 className="font-hubot-sans text-2xl font-black">
              {author.tweetsCount}
            </h1>
            <p className="text-zinc-400">posts</p>
          </div>
          <div>
            <h1 className="font-hubot-sans text-2xl font-black">
              {author.country}
            </h1>
            <p className="text-zinc-400">country</p>
          </div>
        </div>
      </div>

      <Image
        alt={'Background avatar for ' + author.username}
        src="https://pbs.twimg.com/profile_images/1669135340446023680/1X9kFGt0_mini.jpg"
        width={25}
        height={25}
        draggable={false}
        className="absolute inset-0 z-10 m-auto h-full w-full opacity-25 blur-3xl transition-transform duration-200 ease-in-out group-hover:scale-75"
      />
    </section>
  );
}
