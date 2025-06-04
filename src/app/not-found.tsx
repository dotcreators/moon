import Button from '@/shared/ui/button';
import Icon from '@/shared/ui/icon';
import { Metadata } from 'next';
import { twJoin } from 'tailwind-merge';

export const metadata: Metadata = {
  title: 'Page not found',
};

function NotFound() {
  return (
    <section
      className={twJoin(
        'relative mx-auto mt-3 flex w-full max-w-[900px] flex-col items-center gap-3 px-3 py-24',
        'laptop:px-5 laptop:mb-5 laptop:gap-5 laptop:py-32'
      )}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-red-01 font-mona-sans text-7xl">404</h1>
        <h1 className="text-gray-01">Page not found</h1>
      </div>
      <Button.Link
        href={'/'}
        className="flex w-fit flex-row items-center gap-2"
      >
        <Icon ico="i-ri-arrow-go-back-fill" />
        <p>Back</p>
      </Button.Link>
    </section>
  );
}

export default NotFound;
