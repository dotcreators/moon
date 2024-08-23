import Image from 'next/image';
import { FC } from 'react';
import RiQuestionMark from '~icons/ri/question-mark';

export interface Props {
  title: string;
  value: string;
}

export const CountryFlag: FC<Props> = props => {
  return (
    <>
      <section className="flex flex-row gap-3 rounded-3xl bg-dot-secondary p-1 px-3 text-sm">
        {props.title === 'Unknown' ? (
          <RiQuestionMark />
        ) : (
          <Image
            alt={`${props.title}`}
            src={`https://flagcdn.com/${props.value.toLowerCase()}.svg`}
            className={'rounded-md'}
            fill={true}
          />
        )}
        <p>{props.title}</p>
      </section>
    </>
  );
};
