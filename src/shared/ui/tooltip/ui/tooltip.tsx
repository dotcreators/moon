import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twJoin } from 'tailwind-merge';

type TooltipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'content'> & {
  content: ReactNode;
};

type TooltipPosition = {
  top: number;
  left: number;
};

function Tooltip({ className, content, children, ...props }: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  const show = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({ top: rect.top, left: rect.left + rect.width / 2 });
    }
  };

  const hide = () => setPosition(null);

  useEffect(() => {
    if (!position) return;

    const handleViewportChange = () => setPosition(null);

    window.addEventListener('scroll', handleViewportChange, true);
    window.addEventListener('resize', handleViewportChange);
    return () => {
      window.removeEventListener('scroll', handleViewportChange, true);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [position]);

  return (
    <span
      ref={triggerRef}
      className={twJoin('inline-flex', className)}
      {...props}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {position &&
        createPortal(
          <div
            role="tooltip"
            style={{ top: position.top, left: position.left }}
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full pb-2"
          >
            <div className="bg-black-04 text-white-01 rounded-lg px-3 py-2 text-sm whitespace-nowrap shadow-lg">
              {content}
            </div>
          </div>,
          document.body
        )}
    </span>
  );
}

export default Tooltip;
