import { HTMLAttributes, ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';
import Icon from '../../icon';

type SelectProps = HTMLAttributes<HTMLDivElement> & {
  items: { value: string; label?: string; node?: ReactNode }[];
  selectedItem: string;
  onSelectedItem: (value: string) => void;
};

function Select({
  className,
  items,
  selectedItem,
  onSelectedItem,
  ...props
}: SelectProps) {
  return (
    <div className={twJoin('flex flex-row gap-4', className)} {...props}>
      {items.map(item => (
        <button
          key={item.value}
          onClick={() => onSelectedItem(item.value)}
          className={twJoin(
            'flex cursor-pointer flex-row items-center gap-2 rounded-xl border p-3 px-4',
            'transition-colors duration-200 ease-in-out',
            selectedItem === item.value ? 'border-red-01' : 'border-white-01/10'
          )}
        >
          {selectedItem === item.value ? (
            <Icon
              ico={'i-ri-checkbox-blank-circle-fill'}
              className="!text-red-01"
            />
          ) : (
            <Icon ico={'i-ri-checkbox-blank-circle-line'} />
          )}
          {item.label && (
            <p
              className={twJoin(
                selectedItem === item.value ? 'text-white-01' : 'text-gray-01'
              )}
            >
              {item.label}
            </p>
          )}
          {item.node}
        </button>
      ))}
    </div>
  );
}

export default Select;
