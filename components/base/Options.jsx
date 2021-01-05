import { useState, useRef } from 'react';

export default function Options({
  label,
  value,
  children,
  fullwidth,
  className,
  error,
}) {
  const [open, setOpen] = useState(false);
  const selectorRef = useRef(null);

  const selectionButtonStyle = {
    all: `relative bg-white rounded-full cursor-pointer`,
    open: 'border-black',
    regular: `border py-3 px-3 ${error ? 'border-error' : ''}`,
  };

  const openButtonStyle =
    'bg-white rounded-3xl py-1 border border-black border-2 mt-2 overflow-hidden ';

  return (
    <div className={fullwidth && 'w-full'}>
      <div
        className={`${selectionButtonStyle.all} ${className}
        ${open ? selectionButtonStyle.open : 'hover:bg-gray-100'}
        ${selectionButtonStyle.regular}
        `}
        onClick={() => {
          setOpen(!open);
        }}
        tabIndex="0"
        onBlur={(e) => {
          console.log('here');
          setTimeout(() => {
            setOpen(false);
          }, 100);
        }}
        onBlur={() => setOpen(false)}
        ref={selectorRef}
      >
        {value === '' && <div className="text-gray-500">{label}</div>}
        {value !== '' && <div className="capitalize">{value}</div>}
        <div
          className={`${
            !open && 'hidden'
          } absolute left-0 -bottom-0 transform translate-y-full z-10 w-min`}
        >
          <div className={openButtonStyle} onClick={() => setOpen(false)}>
            {children}
          </div>
        </div>
      </div>
      {error && <div className="ml-3 mt-1 text-error">{error}</div>}
    </div>
  );
}
