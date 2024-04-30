import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TopNavigation() {
  const path = usePathname()

  return (
    <header className="fixed inset-x-0 top-5 z-40 mx-auto flex w-fit flex-row gap-1 rounded-full bg-dark-inner-hover/50 p-3 px-4 text-sm backdrop-blur-xl backdrop:brightness-200">
      <Link
        className={classNames(
          'rounded-full p-1 px-5 transition-all duration-200 ease-in-out md:hover:bg-dark-double-inner',
          { 'bg-dark-double-inner': path === '/' }
        )}
        href="/"
      >
        Home
      </Link>
      <Link
        className={classNames(
          'rounded-full p-1 px-5 transition-all duration-200 ease-in-out md:hover:bg-dark-double-inner',
          { 'bg-dark-double-inner': path === '/lists' }
        )}
        href="/lists"
      >
        Lists
      </Link>
      <Link
        className={classNames(
          'rounded-full p-1 px-5 transition-all duration-200 ease-in-out md:hover:bg-dark-double-inner',
          { 'bg-dark-double-inner': path === '/suggest' }
        )}
        href="/suggest"
      >
        Suggest artist
      </Link>
    </header>
  )
}
