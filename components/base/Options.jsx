import { useState, useRef } from 'react';
import Button from './Button';

export default function Options({
  label,
  value,
  children,
  fullwidth,
  className,
  error,
  confirm,
  reset,
  compact,
}) {
  const [open, setOpen] = useState(false);
  const selectorRef = useRef(null);

  const selectionButtonStyle = {
    all: `relative bg-white rounded-full cursor-pointer border ${compact ? 'p-1' : 'p-3'}`,
    open: 'border-black',
  };

  const openButtonStyle =
    'bg-white rounded-3xl py-1 border border-black border-2 mt-2 overflow-hidden ';

  return (
    <div className={fullwidth && 'w-full'}>
      <div
        className={`${selectionButtonStyle.all} ${className}
        ${open ? selectionButtonStyle.open : 'hover:bg-gray-100'}
        ${error ? 'border-error' : ''}
        `}
        onClick={() => setOpen(!open)}
        tabIndex="0"
        onBlur={() => !confirm && setOpen(false)}
        ref={selectorRef}
      >
        {value === '' && <div className="text-gray-500">{label}</div>}
        {value !== '' && <div className="capitalize">{value}</div>}
        <div
          className={`${
            !open && 'hidden'
          } absolute left-0 -bottom-0 transform translate-y-full z-10 w-min`}
        >
          <div
            className={openButtonStyle}
            onClick={(e) => (!confirm ? setOpen(false) : e.stopPropagation())}
          >
            {children}
            <div className="flex justify-between p-4">
              <Button
                white
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Clear
              </Button>
              <Button
                primary
                onClick={() => {
                  confirm();
                  setOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      {}
    </div>
  );
}
