import { Children, useState } from 'react';

export default function Selection({
  children,
  category,
  value,
  options,
  action,
  open,
  xl,
  onClick,
}) {
  const selectionButtonStyle = {
    all: `relative rounded-full cursor-pointer`,
    open: 'bg-white shadow-static',
    regular: 'border py-1 px-3 ',
    xl: 'py-3 px-6 w-full',
  };

  const openButtonStyle = {
    xl: {
      all:
        'absolute -bottom-4 w-full transform translate-y-full bg-white rounded-3xl py-5',
      left: 'max-w-sm',
      right: 'right-0 max-w-sm',
      full: '',
    },
    regular:
      'absolute -bottom-1 transform translate-y-full bg-white rounded-lg py-1',
  };

  return (
    <>
      <div
        className={`${selectionButtonStyle.all}
        ${open ? selectionButtonStyle.open : 'hover:bg-gray-100'}
        ${xl ? selectionButtonStyle.xl : selectionButtonStyle.regular}`}
        onClick={onClick}
      >
        {xl && (
          <div className="font-semibold text-xs tracking-wider">{category}</div>
        )}
        {value === '' && <div className="text-gray-500">{action}</div>}
        {value !== '' && <div className="capitalize">{value}</div>}
      </div>
      <ul
        className={`${
          xl
            ? `${openButtonStyle.xl[xl]} ${openButtonStyle.xl.all}`
            : openButtonStyle.regular
        } ${open ? '' : 'hidden'}`}
      >
        {children}
      </ul>
    </>
  );
}
