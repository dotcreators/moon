import { Transition } from '@headlessui/react';
import { HTMLAttributes, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import Icon from '../../icon';
import Button from '../../button';

type ModalWrapperProps = HTMLAttributes<HTMLDivElement> & {
  isShowed: boolean;
  onClose: (isShowed: boolean) => void;
};

function ModalWrapper({
  isShowed,
  onClose,
  children,
  className,
  ...props
}: ModalWrapperProps) {
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsLaptop(mediaQuery.matches);

    const handleResize = () => {
      setIsLaptop(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isShowed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isShowed]);

  useEffect(() => {
    if (isLaptop) onClose(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLaptop]);

  return (
    <Transition
      as={'div'}
      show={isShowed}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={twJoin(
        'bg-black-02 fixed inset-0 z-[10] flex h-full w-screen flex-col overscroll-none',
        className
      )}
      {...props}
    >
      <div className="flex-1 overflow-y-auto p-3">
        <Button.Flat
          onClick={() => onClose(true)}
          className="flex w-full flex-row items-center gap-2"
          variant="02"
        >
          <Icon ico="i-ri-arrow-go-back-fill" />
          <p>Back to artists</p>
        </Button.Flat>
        <div className="mt-3">{children}</div>
      </div>
    </Transition>
  );
}

export { ModalWrapper };
