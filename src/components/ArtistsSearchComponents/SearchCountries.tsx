import { FC, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "@/components/ArtistsSearchComponents/SearchCountries.module.css";
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import RiQuestionMark from '~icons/ri/question-mark';
import { CountryCodes } from "@/utils/CountryCode";

interface Props {
    onCountryChanges: Function;
}

export const SearchCountries: FC<Props> = (props) => {
    const [toggleCountries, setToggleCountries] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<{ title: string, value: string }>({ title: '', value: '' });
    const [searchText, setSearchText] = useState<string>("");

    const filteredCountries = CountryCodes.filter((country) =>
        country.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <section className="overflow-hidden rounded-3xl">
            <button onClick={() => setToggleCountries(!toggleCountries)}
                className={classNames("flex h-15 flex-row gap-5 w-full items-center bg-dark-inner p-3 px-5 outline-none transition-colors duration-200 ease-in-out", { "rounded-t-3xl bg-dark-inner-hover": toggleCountries, "rounded-3xl": !toggleCountries })}>
                <p>Country</p>
                <div className="flex flex-row gap-3 items-center justify-end w-full">
                    {
                        selectedCountry.title 
                        ? <section className={classNames("flex items-center flex-row gap-3 p-2 px-3 text-sm cursor-pointer w-fit rounded-3xl", { "bg-dark-double-inner": toggleCountries, "bg-dark-inner-hover": !toggleCountries })}>
                            {
                                selectedCountry.title === "Unknown"
                                ? <RiQuestionMark />
                                : <Image alt={`${selectedCountry.title}`} src={`https://flagcdn.com/${selectedCountry.value.toLowerCase()}.svg`} width={24} height={20} className={"rounded-md h-5 w-7"} />
                            }
                            <p className="truncate text-ellipsis max-w-20">{selectedCountry.title}</p>
                          </section>
                        : <p className={classNames("text-sm text-zinc-400 flex flex-wrap justify-end items-center gap-1 p-1 px-3 rounded-full transition-colors duration-200 ease-in-out", { "bg-dark-double-inner": toggleCountries, "bg-dark-inner-hover": !toggleCountries })}>Select country...</p>
                    }
                    <RiArrowDownSLine className={classNames("transition-transform duration-200 ease-in-out", { "rotate-180": toggleCountries })}/>
                </div>
            </button>
            <section className={classNames("bg-dark-inner rounded-b-3xl p-3 gap-2 scroll-smooth flex flex-col", { "hidden": !toggleCountries })}>
                <div className="flex flex-row gap-3 items-center justify-center">
                    <input
                        type="text"
                        placeholder="Input country..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="p-2 w-full outline-none border-b-2 border-transparent focus:border-dark-double-inner rounded-md bg-dark-inner-hover text-sm px-3 placeholder:text-zinc-400"
                    />
                </div>
                <section className={classNames("max-h-64 overflow-y-auto overscroll-none", styles["searchContainer"])}>
                    {filteredCountries.map((country, index) => (
                        <button key={index} onClick={() => {
                            setSelectedCountry({ title: country.title, value: country.value });
                            props.onCountryChanges({ title: country.title, value: country.value });
                        }} className={classNames("flex transition-colors duration-200 ease-in-out flex-row gap-3 p-2 px-3 text-sm md:hover:bg-dark-inner-hover cursor-pointer w-fit rounded-3xl", { "bg-dark-inner-hover": selectedCountry.value == country.value })}>
                            {
                                country.title === "Unknown"
                                ? <RiQuestionMark />
                                : <Image alt={`${country.title}`} src={`https://flagcdn.com/${country.value.toLowerCase()}.svg`} width={24} height={20} className={"rounded-md h-5 w-7"} />
                            }
                            <p className="text-left">{country.title}</p>
                        </button>
                    ))}
                </section>
                <button onClick={() => {
                    setSelectedCountry({ title: '', value: '' });
                    props.onCountryChanges({ title: '', value: '' });
                }} className="col-span-2 w-full bg-dark-inner-hover md:hover:bg-dark-double-inner p-2 px-3 rounded-full mt-3 transition-colors duration-200 ease-in-out text-sm">
                    Reset country
                </button>
            </section>
        </section>
    );
};