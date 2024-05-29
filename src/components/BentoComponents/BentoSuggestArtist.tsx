import classNames from 'classnames';
import { BentoQueueCard } from './BentoQueueCard';
import { InnerButton } from '../InnerButton';

export default function BentoSuggestArtist() {
  return (
    <section
      className={classNames(
        `relative col-span-2 flex h-80 w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl bg-dot-primary p-8`
      )}
    >
      <h1 className="w-20 font-hubot-sans text-2xl">Recently added artists</h1>
      <div className="absolute inset-y-0 right-8 top-8 flex flex-col gap-3">
        <BentoQueueCard
          user={{ username: 'anivire', tag: 'aniv1re' }}
          avatar="https://pbs.twimg.com/profile_images/1373358165513940997/mpI3fLp-_bigger.jpg"
        />
        <BentoQueueCard
          user={{ username: '08games', tag: 'the08games' }}
          avatar="https://pbs.twimg.com/profile_images/638296836629921792/iGrx8Wo5_bigger.png"
        />
        <BentoQueueCard
          user={{ username: 'galette', tag: 'galetitta' }}
          avatar="https://pbs.twimg.com/profile_images/1646367427658227712/fwXOeFTH_bigger.jpg"
        />
        <BentoQueueCard
          user={{ username: 'NOP', tag: 'NOP_Pixels' }}
          avatar="https://pbs.twimg.com/profile_images/1676628741533884418/myoEqu08_bigger.jpg"
        />
      </div>
      <InnerButton title={'Suggest artists'} link="/suggest" />
    </section>
  );
}
