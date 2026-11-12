import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { twJoin } from 'tailwind-merge';

type TooltipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'content'> & {
  content: ReactNode;
};

type TooltipPosition = {
  top: number;
  left: number;
};

const VIEWPORT_PADDING = 8;
const TRIGGER_OFFSET = 8;

function Tooltip({ className, content, children, ...props }: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  const show = () => setIsOpen(true);

  const hide = () => {
    setIsOpen(false);
    setPosition(null);
  };

  useLayoutEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef.current?.getBoundingClientRect();
    const tooltip = tooltipRef.current?.getBoundingClientRect();
    if (!trigger || !tooltip) return;

    const viewportWidth = document.documentElement.clientWidth;
    const centeredLeft = trigger.left + trigger.width / 2 - tooltip.width / 2;
    const maxLeft = viewportWidth - tooltip.width - VIEWPORT_PADDING;
    const left = Math.max(VIEWPORT_PADDING, Math.min(centeredLeft, maxLeft));

    const fitsAbove =
      trigger.top - tooltip.height - TRIGGER_OFFSET >= VIEWPORT_PADDING;
    const top = fitsAbove
      ? trigger.top - tooltip.height - TRIGGER_OFFSET
      : trigger.bottom + TRIGGER_OFFSET;

    setPosition({ top, left });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleViewportChange = () => {
      setIsOpen(false);
      setPosition(null);
    };

    window.addEventListener('scroll', handleViewportChange, true);
    window.addEventListener('resize', handleViewportChange);
    return () => {
      window.removeEventListener('scroll', handleViewportChange, true);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [isOpen]);

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
      {isOpen &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            style={{
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              visibility: position ? 'visible' : 'hidden',
            }}
            className="bg-black-04 text-white-01 pointer-events-none fixed z-50 w-max max-w-[min(16rem,calc(100vw-1rem))] rounded-lg px-3 py-2 text-sm shadow-lg"
          >
            {content}
          </div>,
          document.body
        )}
    </span>
  );
}

export default Tooltip;
