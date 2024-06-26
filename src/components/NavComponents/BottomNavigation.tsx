import Link from 'next/link';
import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
import SimpleIconsBoosty from '~icons/simple-icons/boosty';
import RiDiscordFill from '~icons/ri/discord-fill';
import DotcreatorsLogo from '../DotcreatorsLogo';
import { DotcreatorsLogoResponsive } from '../DotcreatorsLogoResponsive';
import RiAddFill from '~icons/ri/add-fill';
import classNames from 'classnames';

export default function BottomNavigation() {
  const supportLinks = [
    {
      title: 'Contact',
      link: 'https://anivire.xyz',
      newTab: true,
    },
    {
      title: 'Issues',
      link: 'https://github.com/dotcreators/moon/issues',
      newTab: true,
    },
    {
      title: 'Feedback',
      link: 'https://github.com/orgs/dotcreators/discussions',
      newTab: true,
    },
  ];
  const legalLinks = [
    {
      title: 'Privacy Policy',
      link: '/privacy',
      newTab: false,
    },
    {
      title: 'Terms of Service',
      link: '/terms',
      newTab: false,
    },
  ];

  return (
    <section className="w-full md:py-16">
      <div className="mx-auto flex md:h-56 max-w-7xl flex-col justify-between gap-8 md:gap-5 rounded-t-3xl md:rounded-2xl bg-dot-primary p-10 md:flex-row">
        {/* <div className="flex flex-row gap-5">
          <button
            onClick={() => {}}
            className="group relative flex w-24 flex-col items-center justify-center gap-3 rounded-2xl bg-[#5865F2]/10 p-3 px-5 text-center transition-colors duration-200 ease-in-out hover:bg-[#5865F2]/15"
          >
            <RiDiscordFill className="text-4xl text-[#5865F2]/70" />
            <RiArrowRightUpLine className="absolute right-3 top-3 inline text-sm text-[#5865F2]/50 transition-transform duration-200 ease-in-out md:group-hover:rotate-45" />
          </button>
          <button
            onClick={() => {}}
            className="group relative flex w-24 flex-col items-center justify-center gap-3 rounded-2xl bg-[#ff6f37]/10 p-3 px-5 text-center transition-colors duration-200 ease-in-out hover:bg-[#ff6f37]/15"
          >
            <SimpleIconsBoosty className="text-4xl text-[#ff6f37]/70" />
            <RiArrowRightUpLine className="absolute right-3 top-3 inline text-sm text-[#ff6f37]/50 transition-transform duration-200 ease-in-out md:group-hover:rotate-45" />
          </button>
        </div> */}

        <div className="flex flex-col justify-between gap-3">
          <h1 className="flex flex-row items-center gap-2 font-hubot-sans text-dot-rose text-xl uppercase">
            <DotcreatorsLogoResponsive width={20} height={18} />
            dotcreators
          </h1>
          <p className="max-w-96 text-sm md:text-base">
            Track, share and grow together with community of talented
            pixel-related artists.
          </p>
          <p className="hidden md:block max-w-96 text-sm md:text-base text-zinc-400">
            Dotcreators is{' '}
            <Link
              href={'https://github.com/dotcreators'}
              target="_blank"
              className="inline-flex items-center text-dot-rose"
            >
              open source
              <RiArrowRightUpLine />
            </Link>
          </p>
        </div>

        <div className="flex flex-col md:flex-row place-items-start gap-6 md:gap-16">
          <div className="grid grid-rows-1 gap-2">
            <h1 className="mb-1 font-hubot-sans text-lg font-semibold uppercase">
              Support
            </h1>
            {supportLinks.map((link, indexLink) => (
              <Link
                key={indexLink}
                className="inline max-w-40 text-base text-zinc-400 duration-200 ease-in-out md:hover:text-dot-white"
                href={link.link}
                target={link.newTab ? '_blank' : '_parent'}
              >
                {link.title} <RiArrowRightUpLine className="inline" />
              </Link>
            ))}
          </div>
          <div className="grid grid-rows-1 gap-2">
            <h1 className="mb-1 font-hubot-sans text-lg font-semibold uppercase">
              Legal
            </h1>
            {legalLinks.map((link, indexLink) => (
              <Link
                key={indexLink}
                className="inline max-w-40 text-base text-zinc-400 duration-200 ease-in-out md:hover:text-dot-white"
                href={link.link}
                target={link.newTab ? '_blank' : '_parent'}
              >
                {link.title} <RiArrowRightUpLine className="inline" />
              </Link>
            ))}
          </div>
        </div>

        <p className="block md:hidden max-w-96 text-sm md:text-base text-zinc-400">
          Dotcreators is{' '}
          <Link
            href={'https://github.com/dotcreators'}
            target="_blank"
            className="inline-flex items-center text-dot-rose"
          >
            open source
            <RiArrowRightUpLine />
          </Link>
        </p>

        <Link
          className={classNames(
            'flex md:hidden flex-row items-center gap-1 justify-between bg-dot-rose text-dot-body font-semibold rounded-full p-3 px-4'
          )}
          href="/suggest"
        >
          Suggest artist
          <RiAddFill className="text-lg" />
        </Link>
      </div>
    </section>
  );
}
