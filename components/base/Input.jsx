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
}) {
  const [focus, setFocus] = useState(false);

  const labelPlaceholder = !value && !focus;
  const placeholderInputPadding =
    !label || labelPlaceholder ? 'py-3' : 'pt-5 pb-1';

  return (
    <label htmlFor={name} className="relative mb-4 flex">
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
          value={value}
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
          className={`border px-3  transition-all duration-100 ${placeholderInputPadding} w-full rounded-md focus:border-black`}
        />
      )}
      {suffix && (
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          {suffix}
        </span>
      )}
      {type === 'textarea' && (
        <textarea
          className={`border px-3 ${placeholderInputPadding} w-full rounded-md focus:border-black`}
          name={name}
          id={name}
          value={value}
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
      {error && <div className="ml-3 mt-1 text-red-700">{error}</div>}
    </label>
  );
}
