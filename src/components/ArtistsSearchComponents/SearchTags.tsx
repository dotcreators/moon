import classNames from "classnames";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line'
import RiMoneyDollarBoxFill from '~icons/ri/money-dollar-box-fill'
import RiHeartFill from '~icons/ri/heart-fill'
import RiCodeFill from '~icons/ri/code-fill'
import RiInputMethodFill from '~icons/ri/input-method-fill'
import RiSquareFill from '~icons/ri/square-fill'
import RiShape2Fill from '~icons/ri/shape-2-fill'
import RiBox3Fill from '~icons/ri/box-3-fill'

interface Props {
    onTagsChanged: Function
}

export const SearchTags: FC<Props> = (props) => {
    const tags = ['Commissions', 'Work offers', 'NSFW', 'Pixelart', 'Textmode', 'Lowpoly', 'Voxel', 'Gamedev'];
    const [toggleTag, setToggledTag] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
                className={classNames("flex flex-col gap-3 items-center bg-dark-inner p-3 px-5 w-full justify-center transition-padding duration-200 ease-in-out outline-none", {"rounded-t-3xl bg-dark-inner-hover": toggleTag, "rounded-3xl": !toggleTag, "p-5": selectedTags.length !== 0})}>
                <div className="flex flex-row items-center justify-between w-full">
                    <p>Tags</p>
                    <div className="flex flex-row gap-3 items-center">
                        <p className={classNames("text-sm text-zinc-400 flex flex-wrap justify-end items-center gap-1 p-1 px-3 rounded-full transition-colors duration-200 ease-in-out", {"bg-dark-inner-hover": !toggleTag, "bg-dark-double-inner": toggleTag, "hidden": selectedTags.length !== 0})}>
                            { selectedTags.length === 0 && 'Select tags...'}
                        </p>
                        <RiArrowDownSLine className={classNames("transition-transform duration-200 ease-in-out", {"rotate-180": toggleTag})}/>
                    </div>
                </div>
                <div className={classNames("flex flex-wrap gap-2 items-start justify-start w-full", {"hidden": selectedTags.length === 0})}>
                    {
                        selectedTags.map((tag, index) => 
                            <span className={classNames("flex flex-row gap-1.5 text-sm justify-center items-center rounded-full p-1 px-3 duration-200 ease-in-out transition-colors", {'text-[#fdfdfd] bg-dark-double-inner': selectedTags.length > 0, "bg-dark-inner-hover": !toggleTag, "bg-dark-double-inner": toggleTag})}>
                                {
                                    tag == "Commissions" || tag == "Work offers"
                                    ? <RiMoneyDollarBoxFill className="text-zinc-400"/>
                                    : tag == "NSFW"
                                    ? <RiHeartFill className="text-zinc-400"/>
                                    : tag == "Pixelart"
                                    ? <RiSquareFill className="text-zinc-400"/>
                                    : tag == "Textmode"
                                    ? <RiInputMethodFill className="text-zinc-400"/>
                                    : tag == "Lowpoly"
                                    ? <RiShape2Fill className="text-zinc-400"/>
                                    : tag == "Voxel"
                                    ? <RiBox3Fill className="text-zinc-400"/>
                                    : tag == "Gamedev"
                                    ? <RiCodeFill className="text-zinc-400"/>
                                    : ''
                                }
                                {tag}
                            </span>
                        )
                    }
                </div>
            </button>
            <section className={classNames("bg-dark-inner rounded-b-3xl p-3 grid grid-cols-2 gap-1 flex-wrap text-sm place-items-start", {"hidden": !toggleTag})}>
                {
                    tags.map((tag, index) => 
                        <button 
                            key={index}
                            onClick={() => selectedTagsHandler(tag)} 
                            className={classNames("items-center gap-1.5 flex flex-row bg-dark-inner p-2 px-3 w-full justify-center rounded-full transition-colors duration-200 ease-in-out md:hover:bg-dark-inner-hover", {"bg-dark-inner-hover": selectedTags.includes(tag)})}>
                            {
                                tag == "Commission" || tag == "Work offers"
                                ? <RiMoneyDollarBoxFill className="text-zinc-400"/>
                                : tag == "NSFW"
                                ? <RiHeartFill className="text-zinc-400"/>
                                : tag == "Pixelart"
                                ? <RiSquareFill className="text-zinc-400"/>
                                : tag == "Textmode"
                                ? <RiInputMethodFill className="text-zinc-400"/>
                                : tag == "Lowpoly"
                                ? <RiShape2Fill className="text-zinc-400"/>
                                : tag == "Voxel"
                                ? <RiBox3Fill className="text-zinc-400"/>
                                : <RiCodeFill className="text-zinc-400"/>
                            }
                            {tag}
                        </button>
                    )
                }
                <button
                    onClick={() => {
                        setSelectedTags([]);
                        props.onTagsChanged([]);
                    }} 
                    className="col-span-2 w-full bg-dark-inner-hover md:hover:bg-dark-double-inner p-2 px-3 rounded-full mt-3 transition-colors duration-200 ease-in-out text-sm">
                    Reset tags
                </button>
            </section>
        </section>
    )
}