import { twJoin } from 'tailwind-merge';
import Icon from '@/shared/ui/icon';
import {
  ChangeEvent,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

function Select() {}

export type SelectItem = {
  value: string;
  node: ReactNode;
  additionalValue?: string;
};

type SelectItemProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  items: SelectItem[];
  selectedValue: string[] | null;
  isDefaultValueNode?: boolean;
  isMultiselect?: boolean;
  variant?: '01' | '02' | '03';
  onSelectedItem: (value: string | string[]) => void;
};

function Item({
  className,
  label,
  items,
  selectedValue,
  isDefaultValueNode = false,
  isMultiselect = false,
  variant = '01',
  onSelectedItem,
  ...props
}: SelectItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleItemSelect = (value: string | null) => {
    if (!value) {
      onSelectedItem([]);
      return;
    }

    if (!selectedValue) {
      return;
    }

    if (isMultiselect) {
      const newSelected = selectedValue.includes(value)
        ? selectedValue.filter(item => item !== value)
        : [...selectedValue, value];
      onSelectedItem(newSelected);
    } else {
      onSelectedItem([value]);
    }
  };

  const renderSelectedValue = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return 'Select value';
    }

    if (isMultiselect) {
      if (selectedValue.length > 1) {
        const firstItem = isDefaultValueNode
          ? items.find(x => x.value === selectedValue[0])?.node
          : selectedValue[0];
        return (
          <div className="line-clamp-1 flex flex-row items-center gap-1 text-ellipsis">
            {firstItem} <p>+ {selectedValue.length - 1}</p>
          </div>
        );
      } else {
        return isDefaultValueNode
          ? items.find(x => x.value === selectedValue[0])?.node
          : selectedValue[0];
      }
    } else {
      return isDefaultValueNode
        ? items.find(x => x.value === selectedValue[0])?.node
        : selectedValue[0];
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section
      ref={selectRef}
      onClick={() => setIsOpen(p => !p)}
      className={twJoin(
        'flex h-12 w-full flex-col justify-center gap-5 pl-6',
        'group relative justify-between',
        'hover:bg-black-03',
        'transition-colors duration-200 ease-in-out',
        variant === '01' &&
          (!isOpen ? 'bg-black-02 rounded-3xl' : 'bg-black-03 rounded-t-3xl'),
        variant === '02' &&
          (!isOpen ? 'bg-black-03 rounded-3xl' : 'bg-black-04 rounded-t-3xl'),
        variant === '03' &&
          (!isOpen ? 'bg-black-04 rounded-3xl' : 'bg-black-05 rounded-t-3xl'),
        className
      )}
      {...props}
    >
      <button
        className={twJoin(
          'flex w-full flex-row items-center gap-5 text-left',
          'group-hover:cursor-pointer'
        )}
      >
        <p className="grow">{label}</p>
        <div
          className={twJoin(
            'flex h-12 flex-row items-center gap-2',
            'rounded-3xl p-4 pr-5'
          )}
        >
          <div
            className={twJoin(
              'text-gray-01 rounded-full p-1.5 px-3 text-sm',
              'group-hover:bg-black-04',
              !isOpen ? 'bg-black-03' : 'bg-black-04',
              'transition-colors duration-200 ease-in-out'
            )}
          >
            {renderSelectedValue()}
          </div>
          <Icon
            ico="i-ri-arrow-down-s-line"
            className={twJoin(
              'text-xl',
              'transition-transform duration-200 ease-in-out',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </button>
      {isOpen && (
        <div
          className={twJoin(
            'bg-black-02 absolute grid grid-cols-2 gap-2 rounded-b-3xl',
            'absolute top-12 left-0 z-[2]',
            'border-black-03 border-x-2 border-b-2',
            'w-full p-2'
          )}
        >
          {items.map(item => (
            <button
              key={item.value}
              onClick={e => {
                if (isMultiselect) e.stopPropagation();
                handleItemSelect(item.value);
              }}
              className={twJoin(
                'flex flex-row items-center justify-center rounded-full p-2',
                'cursor-pointer',
                'transition-colors duration-200 ease-in-out',
                'hover:bg-black-03',
                selectedValue &&
                  selectedValue.includes(item.value) &&
                  'bg-black-03'
              )}
            >
              {item.node}
            </button>
          ))}
          <button
            onClick={e => {
              if (isMultiselect) e.stopPropagation();
              handleItemSelect(null);
            }}
            className={twJoin(
              'flex flex-row items-center justify-center rounded-full p-2',
              'bg-black-03 col-span-2 cursor-pointer',
              'transition-colors duration-200 ease-in-out',
              'hover:bg-black-04'
            )}
          >
            Reset
          </button>
        </div>
      )}
    </section>
  );
}

type SelectScrollItemsProps = HTMLAttributes<HTMLDivElement> & {
  items: SelectItem[];
  label: string;
  selectedValue: string[] | null;
  isWithSearch?: boolean;
  searchPlaceholder?: string;
  isDefaultValueNode?: boolean;
  isMultiselect?: boolean;
  variant?: '01' | '02' | '03';
  onSelectedItem: (value: string | string[]) => void;
};

function ScrollItems({
  className,
  items,
  selectedValue,
  label,
  isWithSearch = true,
  searchPlaceholder = 'Input country...',
  isDefaultValueNode = false,
  isMultiselect = false,
  variant = '01',
  onSelectedItem,
  ...props
}: SelectScrollItemsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const selectRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleItemSelect = (value: string | null) => {
    if (!value) {
      onSelectedItem([]);
      return;
    }

    if (!selectedValue) {
      return;
    }

    if (isMultiselect) {
      const newSelected = selectedValue.includes(value)
        ? selectedValue.filter(item => item !== value)
        : [...selectedValue, value];
      onSelectedItem(newSelected);
    } else {
      onSelectedItem([value]);
    }
  };

  const renderSelectedValue = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return 'Select value';
    }

    if (isMultiselect) {
      if (selectedValue.length > 1) {
        const firstItem = isDefaultValueNode
          ? items.find(x => x.value === selectedValue[0])?.node
          : selectedValue[0];
        return (
          <div className="line-clamp-1 flex flex-row items-center gap-1 text-ellipsis">
            {firstItem} <p>+ {selectedValue.length - 1}</p>
          </div>
        );
      } else {
        return isDefaultValueNode
          ? items.find(x => x.value === selectedValue[0])?.node
          : selectedValue[0];
      }
    } else {
      return isDefaultValueNode
        ? items.find(x => x.value === selectedValue[0])?.node
        : selectedValue[0];
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        searchRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        console.log('clicked outside');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredItems: SelectItem[] = items.filter(
    c =>
      c.additionalValue &&
      c.additionalValue
        .toLocaleLowerCase()
        .includes(searchFilter.toLocaleLowerCase())
  );

  return (
    <section
      ref={selectRef}
      onClick={e => {
        e.stopPropagation();
        setIsOpen(p => !p);
      }}
      className={twJoin(
        'flex h-12 w-full flex-col justify-center gap-5 pl-6',
        'group relative justify-between',
        'hover:bg-black-03',
        'transition-colors duration-200 ease-in-out',
        variant === '01' &&
          (!isOpen ? 'bg-black-02 rounded-3xl' : 'bg-black-03 rounded-t-3xl'),
        variant === '02' &&
          (!isOpen ? 'bg-black-03 rounded-3xl' : 'bg-black-04 rounded-t-3xl'),
        variant === '03' &&
          (!isOpen ? 'bg-black-04 rounded-3xl' : 'bg-black-05 rounded-t-3xl'),
        className
      )}
      {...props}
    >
      <button
        className={twJoin(
          'flex w-full flex-row items-center gap-5 text-left',
          'group-hover:cursor-pointer'
        )}
      >
        <p className="grow">{label}</p>
        <div
          className={twJoin(
            'flex h-12 flex-row items-center gap-2',
            'rounded-3xl p-4 pr-5'
          )}
        >
          <div
            className={twJoin(
              'text-gray-01 rounded-full p-1.5 px-3 text-sm',
              'group-hover:bg-black-04',
              !isOpen ? 'bg-black-03' : 'bg-black-04',
              'transition-colors duration-200 ease-in-out'
            )}
          >
            {renderSelectedValue()}
          </div>
          <Icon
            ico="i-ri-arrow-down-s-line"
            className={twJoin(
              'text-xl',
              'transition-transform duration-200 ease-in-out',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </button>
      {isOpen && (
        <div
          ref={searchRef}
          className={twJoin(
            'bg-black-02 absolute flex flex-col gap-2 rounded-b-3xl',
            'absolute top-12 left-0 z-[2]',
            'border-black-03 border-x-2 border-b-2',
            'w-full p-2'
          )}
        >
          {isWithSearch && (
            <div
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className={twJoin(
                'flex h-10 w-full flex-row items-center gap-3 rounded-full px-5',
                'bg-black-03 outline-red-01',
                'focus-within:outline-red-01 focus-within:outline',
                className
              )}
              {...props}
            >
              <Icon ico="i-ri-search-2-line" className="text-xl" />
              <input
                onChange={e => setSearchFilter(e.target.value)}
                type={'search'}
                placeholder={searchPlaceholder}
                value={searchFilter}
                className={twJoin(
                  'h-full w-full bg-transparent outline-none',
                  'placeholder:text-gray-01 placeholder:text-sm'
                )}
              />
              <button
                onClick={() => setSearchFilter('')}
                className={twJoin('cursor-pointer')}
              >
                <Icon ico="i-ri-close-fill" className="text-lg" />
              </button>
            </div>
          )}

          <div className="flex max-h-52 flex-col gap-0.5 overflow-auto pr-3">
            {filteredItems.length !== 0 ? (
              filteredItems.map(item => (
                <button
                  key={item.value}
                  onClick={e => {
                    if (isMultiselect) e.stopPropagation();
                    handleItemSelect(item.value);
                  }}
                  className={twJoin(
                    'flex flex-row items-center gap-2 rounded-full p-2',
                    'w-full cursor-pointer',
                    'transition-colors duration-200 ease-in-out',
                    'hover:bg-black-03',
                    selectedValue &&
                      selectedValue.includes(item.value) &&
                      'bg-black-03'
                  )}
                >
                  {item.node}
                </button>
              ))
            ) : (
              <p className="text-gray-01 py-5 text-center text-sm">
                No items found.
              </p>
            )}
          </div>
          <button
            onClick={e => {
              if (isMultiselect) e.stopPropagation();
              handleItemSelect(null);
            }}
            className={twJoin(
              'flex flex-row items-center justify-center rounded-full p-2',
              'bg-black-03 col-span-2 cursor-pointer',
              'transition-colors duration-200 ease-in-out',
              'hover:bg-black-04'
            )}
          >
            Reset
          </button>
        </div>
      )}
    </section>
  );
}

type ItemNodeProps = HTMLAttributes<HTMLDivElement> & {
  icon?: string | ReactNode;
  label: string;
};

function ItemNode({ className, icon, label, ...props }: ItemNodeProps) {
  return (
    <div
      className={twJoin('flex flex-row items-center gap-1.5', className)}
      {...props}
    >
      {icon &&
        (typeof icon === 'string' ? (
          <Icon ico={icon} className="!text-gray-01 text-md" />
        ) : (
          icon
        ))}

      <p className="block truncate text-sm text-ellipsis">{label}</p>
    </div>
  );
}

type SelectInputProps = HTMLAttributes<HTMLDivElement> & {
  value: string | number | readonly string[] | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};

function Input({
  value,
  type,
  onChange,
  placeholder = undefined,
  className,
  ...props
}: SelectInputProps) {
  const handleClear = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <section
      className={twJoin(
        'flex h-12 w-full flex-row items-center gap-3 rounded-full px-5',
        'bg-black-02 outline-red-01',
        'focus-within:outline-red-01 focus-within:outline',
        className
      )}
      {...props}
    >
      <Icon ico="i-ri-search-2-line" className="text-xl" />
      <input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
        className={twJoin(
          'h-full w-full bg-transparent outline-none',
          'placeholder:text-gray-01 placeholder:text-sm'
        )}
      />
      {type === 'search' && (
        <button onClick={handleClear} className={twJoin('cursor-pointer')}>
          <Icon ico="i-ri-close-fill" className="text-lg" />
        </button>
      )}
    </section>
  );
}

Select.Item = Item;
Select.ScrollItems = ScrollItems;
Select.ItemNode = ItemNode;
Select.Input = Input;

export default Select;
