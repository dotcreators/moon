import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiMoneyDollarBoxFill from '~icons/ri/money-dollar-box-fill';
import RiHeartFill from '~icons/ri/heart-fill';
import RiCodeFill from '~icons/ri/code-fill';
import RiInputMethodFill from '~icons/ri/input-method-fill';
import RiSquareFill from '~icons/ri/square-fill';
import RiShape2Fill from '~icons/ri/shape-2-fill';
import RiBox3Fill from '~icons/ri/box-3-fill';
import { useRouter } from 'next/router';
import { searchTagsArray } from '@/utils/Tags';

interface Props {
  onTagsChanged: Function;
}

export const SearchTags: FC<Props> = props => {
  const tags = searchTagsArray;
  const [toggleTag, setToggledTag] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    let tags = router.query.tags;
    if (typeof tags === 'string') {
      tags = [tags];
    }

    if (tags && tags.length > 0) {
      const getTags = tags.map(tag =>
        tag === 'workoffers'
          ? 'Work offers'
          : tag.charAt(0).toUpperCase() + tag.slice(1)
      );
      setSelectedTags(getTags);
      props.onTagsChanged(getTags);
    }
  }, [router.isReady, router.query.tags]);

  function selectedTagsHandler(tag: string) {
    if (!selectedTags.includes(tag)) {
      let newGenresArray: string[] = [...selectedTags];
      newGenresArray.push(tag);
      props.onTagsChanged(newGenresArray);
      setSelectedTags(newGenresArray);
    } else {
      let newGenresArray: string[] = selectedTags.filter(item => item !== tag);
      props.onTagsChanged(newGenresArray);
      setSelectedTags(newGenresArray);
    }
  }

  return (
    <section>
      <button
        onClick={() => setToggledTag(!toggleTag)}
        className={classNames(
          'flex w-full flex-col items-center justify-center gap-3 bg-dot-primary p-3 px-5 outline-none transition-padding duration-200 ease-in-out',
          {
            'bg-dot-secondary rounded-t-3xl': toggleTag,
            'rounded-3xl': !toggleTag,
            'p-5': selectedTags.length !== 0,
          }
        )}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <p>Tags</p>
          <div className="flex flex-row items-center gap-3">
            <p
              className={classNames(
                'flex flex-wrap items-center justify-end gap-1 rounded-full p-1 px-3 text-sm text-zinc-400 transition-colors duration-200 ease-in-out',
                {
                  'bg-dot-secondary': !toggleTag,
                  'bg-dot-tertiary': toggleTag,
                  hidden: selectedTags.length !== 0,
                }
              )}
            >
              {selectedTags.length === 0 && 'Select tags...'}
            </p>
            <RiArrowDownSLine
              className={classNames(
                'transition-transform duration-200 ease-in-out',
                { 'rotate-180': toggleTag }
              )}
            />
          </div>
        </div>
        <div
          className={classNames(
            'flex w-full flex-wrap items-start justify-start gap-2',
            { hidden: selectedTags.length === 0 }
          )}
        >
          {selectedTags.map((tag, index) => (
            <span
              key={index}
              className={classNames(
                'flex flex-row items-center justify-center gap-1.5 rounded-full p-1 px-3 text-sm transition-colors duration-200 ease-in-out',
                {
                  'bg-dot-tertiary text-[#fdfdfd]': selectedTags.length > 0,
                  'bg-dot-secondary': !toggleTag,
                  'bg-dot-tertiary': toggleTag,
                }
              )}
            >
              {tag == 'Commissions' || tag == 'Work offers' ? (
                <RiMoneyDollarBoxFill className="text-zinc-400" />
              ) : tag == 'NSFW' ? (
                <RiHeartFill className="text-zinc-400" />
              ) : tag == 'Pixelart' ? (
                <RiSquareFill className="text-zinc-400" />
              ) : tag == 'Textmode' ? (
                <RiInputMethodFill className="text-zinc-400" />
              ) : tag == 'Lowpoly' ? (
                <RiShape2Fill className="text-zinc-400" />
              ) : tag == 'Voxel' ? (
                <RiBox3Fill className="text-zinc-400" />
              ) : tag == 'Gamedev' ? (
                <RiCodeFill className="text-zinc-400" />
              ) : (
                ''
              )}
              {tag}
            </span>
          ))}
        </div>
      </button>
      <section
        className={classNames(
          'grid grid-cols-2 flex-wrap place-items-start gap-1 rounded-b-3xl bg-dot-primary p-3 text-sm',
          { hidden: !toggleTag }
        )}
      >
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => selectedTagsHandler(tag)}
            className={classNames(
              'md:hover:bg-dot-secondary flex w-full flex-row items-center justify-center gap-1.5 rounded-full bg-dot-primary p-2 px-3 transition-colors duration-200 ease-in-out',
              { 'bg-dot-secondary': selectedTags.includes(tag) }
            )}
          >
            {tag == 'Commission' || tag == 'Work offers' ? (
              <RiMoneyDollarBoxFill className="text-zinc-400" />
            ) : tag == 'NSFW' ? (
              <RiHeartFill className="text-zinc-400" />
            ) : tag == 'Pixelart' ? (
              <RiSquareFill className="text-zinc-400" />
            ) : tag == 'Textmode' ? (
              <RiInputMethodFill className="text-zinc-400" />
            ) : tag == 'Lowpoly' ? (
              <RiShape2Fill className="text-zinc-400" />
            ) : tag == 'Voxel' ? (
              <RiBox3Fill className="text-zinc-400" />
            ) : (
              <RiCodeFill className="text-zinc-400" />
            )}
            {tag}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedTags([]);
            props.onTagsChanged([]);
          }}
          className="bg-dot-secondary md:hover:bg-dot-tertiary col-span-2 mt-3 w-full rounded-full p-2 px-3 text-sm transition-colors duration-200 ease-in-out"
        >
          Reset tags
        </button>
      </section>
    </section>
  );
};
