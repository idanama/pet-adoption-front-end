import { useState, useRef } from 'react';

export default function Options({
  label,
  value,
  children,
  fullwidth,
  className,
}) {
  const [open, setOpen] = useState(false);
  const selectorRef = useRef(null);

  const selectionButtonStyle = {
    all: `relative bg-white rounded-full cursor-pointer`,
    open: 'border-black',
    regular: 'border py-3 px-3 ',
  };

  const openButtonStyle =
    'bg-white rounded-3xl py-1 border border-black border-2 mt-2 overflow-hidden ';

  return (
    <div
      className={`${selectionButtonStyle.all} ${className}
        ${open ? selectionButtonStyle.open : 'hover:bg-gray-100'}
        ${selectionButtonStyle.regular}
        ${fullwidth && 'w-full'}`}
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
  );
}
