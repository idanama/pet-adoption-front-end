import { Children } from 'react';

export default function Button({
  children,
  action,
  submit,
  primary,
  white,
  transparent,
  fullWidth,
  xl,
  onClick,
  className,
}) {
  return (
    <button
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`rounded px-3
      ${!white && !transparent ? 'bg-gray-500 text-white' : ''}
      ${primary ? 'bg-green-500 text-white' : ''}
      ${white ? 'bg-white text-black' : ''}
      ${transparent ? 'bg-transparent text-current' : ''}
      ${xl ? 'py-3' : 'py-1'}
      ${fullWidth ? 'w-full' : ''}
      ${className || ''}
      `}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
