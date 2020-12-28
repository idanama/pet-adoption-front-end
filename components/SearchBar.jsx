import { useRef, useState, useEffect } from 'react';
import {
  RiEmpathizeLine,
  RiHandHeartLine,
  RiHeartLine,
  RiSearchLine,
} from 'react-icons/ri';
import Selection from './base/Selection';
import { useRouter } from 'next/router';

export default function SearchBar({ updateNavSize }) {
  const router = useRouter();

  const [active, setActive] = useState(true);
  const [selection, setSelection] = useState(null);
  const [form, setForm] = useState({ animal: '', relationship: '' });
  const formRef = useRef(null);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    updateNavSize(active);
  }, [active]);

  useEffect(() => {
    if (router.route === '/search' || router.route === '/') {
      setForm({
        animal: router.query.animal || '',
        relationship: router.query.relationship || '',
      });
    } else {
      setActive(false);
    }
  }, [router.query]);

  const searchBarPosition = {
    all: `justify-self-center absolute left-1/2 transform -translate-x-1/2 transition-all duration-300`,
    static: `max-w-xs w-full mt-0 overflow-hidden`,
    active: `max-w-xl w-full mt-5 translate-y-full`,
  };

  const searchBarStyle = {
    all: `relative  bg-white rounded-full border border-gray-200 text-sm min-w-full flex justify-between items-center hover:shadow-md transition duration-300 ease-in-out`,
    small: `h-11 cursor-pointer`,
    medium: ``,
    large: ``,
  };

  const searchButtonStyle = {
    all:
      'absolute w-full bg-green-400 rounded-full flex flex-row-reverse items-center cursor-pointer text-white transition-all duration-200',
    small: 'p-2  right-1 max-w-small',
    medium: 'p-3 right-2 max-w-medium',
    large: 'p-3 right-2 max-w-large',
  };

  const formNotEmpty = Object.values(form).some((el) => el);
  const searchBarState = () => {
    if (!active) {
      return 'small';
    }
    if (!!selection || (formNotEmpty && active)) {
      return 'large';
    }
    return 'medium';
  };

  return (
    <div
      className={`${searchBarPosition.all} ${
        active ? searchBarPosition.active : searchBarPosition.static
      }`}
    >
      <form
        onClick={() => setActive(true)}
        onKeyPress={() => setActive(true)}
        onBlur={(e) => {
          e.stopPropagation();
          if (selection !== null) {
            return setTimeout(() => {
              setSelection(null);
              formRef.current.focus();
            }, 200);
          }
          if ((e.relatedTarget || e.currentTarget) === e.target) {
            setActive(false);
          }
        }}
        onSubmit={(e) => {
          e.preventDefault();
          router.push({
            pathname: '/search',
            query: { animal: form.animal, relationship: form.relationship },
          });
          setActive(false);
        }}
        role="menuitem"
        tabIndex="0"
        className={`
        ${searchBarStyle.all} 
        ${searchBarStyle[searchBarState()]} ${selection ? 'bg-gray-200' : ''}
        `}
        action="/search"
        method="get"
        ref={formRef}
      >
        {searchBarState() === 'small' && formNotEmpty && (
          <div className="pl-4 capitalize">{`${
            form.relationship === 'any' ? '' : form.relationship
          } ${form.animal === 'any' ? '' : `a ${form.animal}`}`}</div>
        )}
        {searchBarState() === 'small' && !formNotEmpty && (
          <div className="pl-4">Start your search</div>
        )}
        {searchBarState() !== 'small' && (
          <>
            <Selection
              category="Animal"
              value={form.animal}
              open={selection === 'animal'}
              onClick={() => setSelection('animal')}
              action="What is your type?"
              xl="left"
            >
              <label
                htmlFor="anypet"
                className="flex items-center px-6 py-2 border-b hover:bg-gray-200 text-lg cursor-pointer"
              >
                <input
                  id="anypet"
                  name="animal"
                  type="radio"
                  value="any"
                  className="opacity-0 pointer-events-none"
                  onChange={handleForm}
                  checked={form.animal === 'any'}
                />
                <img
                  src="\generic\panda-square.png"
                  className="rounded-lg h-10 mr-5"
                />
                Any
              </label>
              <label
                htmlFor="dogpet"
                className="flex items-center px-6 py-2 hover:bg-gray-200 text-lg cursor-pointer"
              >
                <input
                  id="dogpet"
                  name="animal"
                  type="radio"
                  value="dog"
                  className="opacity-0  pointer-events-none"
                  onChange={handleForm}
                  checked={form.animal === 'dog'}
                />
                <img
                  src="\generic\dog-square.png"
                  className="rounded-lg h-10 mr-5"
                />
                Dog
              </label>
              <label
                htmlFor="catpet"
                className="flex items-center px-6 py-2 hover:bg-gray-200 text-lg cursor-pointer"
              >
                <input
                  id="catpet"
                  name="animal"
                  type="radio"
                  value="cat"
                  className="opacity-0 pointer-events-none"
                  onChange={handleForm}
                  checked={form.animal === 'cat'}
                />
                <img
                  src="\generic\cat-square.png"
                  className="rounded-lg h-10 mr-5"
                />
                Cat
              </label>
            </Selection>
            <div className={selection ? `` : `border-l h-7`}></div>
            <Selection
              category="Relationship"
              value={form.relationship}
              action="Any arrangement"
              open={selection === 'relationship'}
              onClick={() => setSelection('relationship')}
              xl="right"
            >
              <label
                htmlFor="anyrel"
                className="flex items-center px-6 py-2 border-b hover:bg-gray-200 text-lg cursor-pointer"
              >
                <input
                  id="anyrel"
                  name="relationship"
                  type="radio"
                  value="any"
                  className="opacity-0 pointer-events-none"
                  onChange={handleForm}
                  checked={form.relationship === 'any'}
                />
                <RiHeartLine className="mr-5" />
                Any
              </label>
              <label
                htmlFor="adoptrel"
                className="flex items-center px-6 py-2 hover:bg-gray-200 text-lg cursor-pointer"
              >
                <input
                  id="adoptrel"
                  name="relationship"
                  type="radio"
                  value="adopt"
                  className="opacity-0  pointer-events-none"
                  onChange={handleForm}
                  checked={form.relationship === 'adopt'}
                />
                <RiEmpathizeLine className="mr-5" />
                Adopt
              </label>
              <label
                htmlFor="fosterrel"
                className="flex items-center px-6 py-2 hover:bg-gray-200 text-lg cursor-pointer"
              >
                <input
                  id="fosterrel"
                  name="relationship"
                  type="radio"
                  value="foster"
                  className="opacity-0 pointer-events-none"
                  onChange={handleForm}
                  checked={form.relationship === 'foster'}
                />
                <RiHandHeartLine className="mr-5" />
                Foster
              </label>
            </Selection>
          </>
        )}
        <button
          type="submit"
          className={`
          ${searchButtonStyle.all} 
          ${searchButtonStyle[searchBarState()]}
          `}
        >
          <RiSearchLine className="text-xl" />
          {searchBarState() === 'large' && <span className="pr-2">Search</span>}
        </button>
      </form>
    </div>
  );
}
