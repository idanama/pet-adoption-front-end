import { useState } from 'react';

export default function Input({ type, name, value, error, onChange }) {
  const [focus, setFocus] = useState(false);
  return (
    <label htmlFor={name} className="relative mb-4">
      <div
        className={`absolute left-3 duration-100 z-10 ${
          !focus && !value ? ' top-3 text-lg' : 'top-1 text-sm'
        }`}
      >
        {name}
      </div>
      <input
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
          onChange(e.target.value);
        }}
        min={0}
        className="border px-3 pt-5 pb-2 w-full rounded-md focus:border-black"
      />
      {error && <div className="ml-3 mt-1 text-red-700">{error}</div>}
    </label>
  );
}
