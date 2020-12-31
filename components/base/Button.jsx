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
  text,
  color,
}) {
  const buttonClass = `rounded px-3
      ${
        !white && !transparent && !text && !color
          ? 'bg-gray-400 text-white'
          : ''
      }
      ${primary ? 'bg-green-500 text-white font-semibold' : ''}
      ${white ? 'bg-white text-black border' : ''}
      ${transparent ? 'bg-transparent text-current' : ''}
      ${text ? 'bg-transparent text-left underline' : ''}
      ${xl ? 'py-3' : 'py-1'}
      ${fullWidth ? 'w-full' : ''}
      ${className || ''}
      ${color && color}
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
