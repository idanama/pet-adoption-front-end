import { useState } from 'react';

export default function Input({
  type,
  name,
  label,
  value,
  error,
  onChange,
  required,
  suffix,
  placeholder,
  className,
}) {
  const [focus, setFocus] = useState(false);

  const labelPlaceholder = !value && !focus;
  const placeholderInputPadding =
    !label || labelPlaceholder ? 'py-3' : 'pt-5 pb-1';

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="relative flex w-full">
        {label && (
          <div
            className={`absolute left-3 duration-100 z-10 ${
              labelPlaceholder
                ? 'top-1/2 transform -translate-y-1/2'
                : 'text-sm top-1'
            }`}
          >
            {label}
          </div>
        )}
        {type !== 'textarea' && (
          <input
            required={required}
            type={type}
            name={name}
            id={name}
            value={
              type !== 'date'
                ? value
                : value && new Date(value).toISOString().replace(/T.*/, '')
            }
            placeholder={placeholder}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            onChange={(e) => {
              onChange({ [e.target.name]: e.target.value });
            }}
            min={0}
            className={`border px-3
            ${error ? 'border-error' : ''}
            ${className} transition-all duration-100 ${placeholderInputPadding} w-full rounded-md focus:border-black focus:border-2`}
          />
        )}
        {suffix && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            {suffix}
          </span>
        )}
        {type === 'textarea' && (
          <textarea
            className={`border 
              ${error ? 'border-error' : ''}
              px-3 ${className} ${placeholderInputPadding} w-full rounded-md focus:border-black focus:border-2`}
            name={name}
            id={name}
            value={value}
            placeholder={placeholder}
            cols="30"
            rows="3"
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            onChange={(e) => {
              onChange({ [e.target.name]: e.target.value });
            }}
          />
        )}
      </label>
      {error && (
        <div className="text-base font-normal font-sans ml-3 mt-1 text-error">
          {error}
        </div>
      )}
    </div>
  );
}
