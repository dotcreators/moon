import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line'
import RiUserHeartFill from '~icons/ri/user-heart-fill'
import RiFilePaper2Fill from '~icons/ri/file-paper-2-fill'
import RiLineChartFill from '~icons/ri/line-chart-fill'
import RiAtFill from '~icons/ri/at-fill'
import { useRouter } from "next/router";

interface Props {
    onSortFilterChanges: Function
}

export const SearchSortFilters: FC<Props> = (props) => {
    const sortFilters = ['Followers', 'Username', 'Posts', 'Trending'];
    const [toggleSortFilters, setToggleSortFilters] = useState<boolean>(false);
    const [selectedSortFilter, setSelectedSortFilter] = useState<string>(sortFilters[0]);

    return (
        <section>
            <button 
                onClick={() => setToggleSortFilters(!toggleSortFilters)}
                id="tags" className={classNames("flex h-15 flex-row gap-5 items-center bg-dark-inner p-3 px-5 w-full justify-between transition-colors duration-200 ease-in-out outline-none", {"rounded-t-3xl bg-dark-inner-hover": toggleSortFilters, "rounded-3xl": !toggleSortFilters})}>
                <p>Sort by</p>
                <div className="flex flex-row gap-3 items-center">
                    <p className={classNames("text-sm text-zinc-400 flex flex-wrap justify-end items-center gap-1")}>
                        <span className={classNames("flex flex-row gap-1.5 items-center rounded-full p-1 px-3 text-[#fdfdfd]", {"bg-dark-double-inner duration-200 ease-in-out transition-colors": toggleSortFilters, "bg-dark-inner-hover": !toggleSortFilters})}>
                            {
                                selectedSortFilter == "Username"
                                ? <RiAtFill className="text-zinc-400"/>
                                : selectedSortFilter == "Posts"
                                ? <RiFilePaper2Fill className="text-zinc-400"/>
                                : selectedSortFilter == "Followers"
                                ? <RiUserHeartFill className="text-zinc-400"/>
                                : <RiLineChartFill className="text-zinc-400"/>
                            }
                            {selectedSortFilter}
                        </span>
                    </p>
                    <RiArrowDownSLine className={classNames("transition-transform duration-200 ease-in-out", {"rotate-180": toggleSortFilters})}/>
                </div>
            </button>
            <section className={classNames("bg-dark-inner rounded-b-3xl p-3 grid grid-cols-2 gap-1 flex-wrap text-sm place-items-center", {"hidden": !toggleSortFilters})}>
                {
                    sortFilters.map((filter, index) => 
                        <button 
                            key={index}
                            onClick={() => {
                                setSelectedSortFilter(filter);
                                props.onSortFilterChanges(filter);
                            }} 
                            className={classNames("flex flex-row items-center gap-1.5 bg-dark-inner p-2 px-3 w-full justify-center rounded-full transition-colors duration-200 ease-in-out md:hover:bg-dark-inner-hover", {"bg-dark-inner-hover": filter == selectedSortFilter})}>
                            {
                                filter == "Username"
                                ? <RiAtFill className="text-zinc-400"/>
                                : filter == "Posts"
                                ? <RiFilePaper2Fill className="text-zinc-400"/>
                                : filter == "Followers"
                                ? <RiUserHeartFill className="text-zinc-400"/>
                                : <RiLineChartFill className="text-zinc-400"/>
                            }
                            {filter}
                        </button>
                    )
                }
                <button 
                    onClick={() => {
                        setSelectedSortFilter('Followers');
                        props.onSortFilterChanges('Followers');
                    }} 
                    className="col-span-2 w-full bg-dark-inner-hover md:hover:bg-dark-double-inner p-2 px-3 rounded-full mt-3 transition-colors duration-200 ease-in-out text-sm">
                    Reset sort
                </button>
            </section>
        </section>
    )
}