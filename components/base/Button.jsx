import { Children } from 'react';
import Link from 'next/link';

export default function Button({
  children,
  submit,
  primary,
  white,
  transparent,
  fullWidth,
  xl,
  onClick,
  className,
  link,
}) {
  const buttonClass = `rounded px-3
      ${!white && !transparent ? 'bg-gray-500 text-white' : ''}
      ${primary ? 'bg-green-500 text-white' : ''}
      ${white ? 'bg-white text-black' : ''}
      ${transparent ? 'bg-transparent text-current' : ''}
      ${xl ? 'py-3' : 'py-1'}
      ${fullWidth ? 'w-full' : ''}
      ${className || ''}
      `;

  return (
    <>
      {!link && (
        <button
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick();
            }
          }}
          className={buttonClass}
          type={submit ? 'submit' : 'button'}
        >
          {children}
        </button>
      )}
      {link && (
        <Link href={link}>
          <button className={buttonClass} type={submit ? 'submit' : 'button'}>
            {children}
          </button>
        </Link>
      )}
    </>
  );
}
