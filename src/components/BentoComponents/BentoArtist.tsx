import classNames from 'classnames';
import { BentoUserCard } from './BentoUserCard';
import { InnerButton } from '../InnerButton';

export default function BentoArtist() {
  return (
    <section
      style={{ willChange: 'transform' }}
      className={classNames(
        `relative col-span-2 flex h-80 w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl bg-dot-primary p-8`
      )}
    >
      <h1 className="w-20 font-hubot-sans text-2xl">You're an artist?</h1>
      <div className="absolute inset-y-0 -right-16 -top-32 flex -rotate-12 flex-col gap-3">
        <BentoUserCard
          user={{ username: 'anivire', tag: 'aniv1re' }}
          followers={640}
          posts={124}
          avatar="https://pbs.twimg.com/profile_images/1373358165513940997/mpI3fLp-_400x400.jpg"
        />
        <BentoUserCard
          user={{ username: '08games', tag: 'the08games' }}
          followers={159400}
          posts={5550}
          avatar="https://pbs.twimg.com/profile_images/638296836629921792/iGrx8Wo5_400x400.png"
        />
        <BentoUserCard
          user={{ username: 'galette', tag: 'galetitta' }}
          followers={3792}
          posts={6467}
          avatar="https://pbs.twimg.com/profile_images/1646367427658227712/fwXOeFTH_400x400.jpg"
        />
        <BentoUserCard
          user={{ username: 'NOP', tag: 'NOP_Pixels' }}
          followers={96700}
          posts={15700}
          avatar="https://pbs.twimg.com/profile_images/1676628741533884418/myoEqu08_400x400.jpg"
        />
      </div>
      <InnerButton title={'Submit'} func={() => {}} />
    </section>
  );
}
