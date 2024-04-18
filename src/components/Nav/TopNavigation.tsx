import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNavigation() {
    const path = usePathname();

    return (
        <header className="fixed z-40 top-5 inset-x-0 w-fit mx-auto flex text-sm flex-row gap-1 bg-dark-inner-hover/50 p-3 px-4 rounded-full backdrop-blur-xl backdrop:brightness-200">
            <Link className={classNames("md:hover:bg-dark-double-inner transition-all duration-200 ease-in-out p-1 px-5 rounded-full", {'bg-dark-double-inner': path === "/"})} href="/">Home</Link>
            <Link className={classNames("md:hover:bg-dark-double-inner transition-all duration-200 ease-in-out p-1 px-5 rounded-full", {'bg-dark-double-inner': path === "/lists"})} href="/lists">Lists</Link>
            <Link className={classNames("md:hover:bg-dark-double-inner transition-all duration-200 ease-in-out p-1 px-5 rounded-full", {'bg-dark-double-inner': path === "/suggest"})} href="/suggest">Suggest artist</Link>
        </header>
    )
}