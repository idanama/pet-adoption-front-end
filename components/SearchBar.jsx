import { useState } from 'react';
import {
  RiEmpathizeLine,
  RiHandHeartLine,
  RiHeartLine,
  RiSearchLine,
} from 'react-icons/ri';
import Button from './base/Button';
import Selection from './base/Selection';

export default function SearchBar() {
  const [active, setActive] = useState(true);
  // const [animal, setAnimal] = useState('');
  // const [relationship, setRelationship] = useState('');
  const [open, setOpen] = useState(null);

  const [form, setForm] = useState({ animal: '', relationship: '' });

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const searchBarPosition = {
    all: `justify-self-center absolute left-1/2 transform -translate-x-1/2 transition-all duration-300`,
    static: `max-w-xs w-full mt-0 overflow-hidden`,
    active: `max-w-xl w-full mt-5 translate-y-full`,
  };

  const searchBarStyle = {
    all: `relative rounded-full border border-gray-200 text-sm min-w-full flex justify-between items-center hover:shadow-md transition duration-300 ease-in-out`,
    static: `h-11 bg-white cursor-pointer`,
    active: ` bg-white`,
  };

  const searchButton = {
    all:
      'absolute right-2 w-full bg-green-400 rounded-full p-2 flex flex-row-reverse items-center cursor-pointer text-white transition-all duration-200',
    minimized: 'max-w-small',
    expanded: 'max-w-medium',
  };

  return (
    <div
      className={`${searchBarPosition.all} ${
        active ? searchBarPosition.active : searchBarPosition.static
      }`}
    >
      <form
        role="menuitem"
        tabIndex="0"
        onClick={() => setActive(true)}
        onKeyPress={() => setActive(true)}
        onBlur={(e) => {
          if (open !== null) {
            setTimeout(() => {
              setOpen(null);
              return setTimeout(() => {
                e.target.focus();
              }, 100);
            }, 300);
          }
          setActive(false);
        }}
        className={`${searchBarStyle.all} ${
          active ? searchBarStyle.active : searchBarStyle.static
        } ${open ? 'bg-gray-200' : ''}`}
      >
        {!active && <div className="pl-4">Start your search</div>}
        {active && (
          <>
            <Selection
              category="Animal"
              value={form.animal}
              open={open === 'animal'}
              onClick={() => setOpen('animal')}
              action="What is your type?"
              xl="left"
            >
              <label
                htmlFor="anypet"
                className="block px-6 pt-2 pb-4 border-b hover:bg-gray-200 text-lg"
              >
                <input
                  id="anypet"
                  name="animal"
                  type="radio"
                  value="any"
                  className="opacity-0 pointer-events-none"
                  onClick={handleForm}
                />
                Any
              </label>
              <label
                htmlFor="dogpet"
                className="block px-6 py-2 hover:bg-gray-200 text-lg"
              >
                <input
                  id="dogpet"
                  name="animal"
                  type="radio"
                  value="dog"
                  className="opacity-0  pointer-events-none"
                  onClick={handleForm}
                />
                Dog
              </label>
              <label
                htmlFor="catpet"
                className="block px-6 py-2 hover:bg-gray-200 text-lg"
              >
                <input
                  id="catpet"
                  name="animal"
                  type="radio"
                  value="cat"
                  className="opacity-0 pointer-events-none"
                  onClick={handleForm}
                />
                Cat
              </label>
            </Selection>
            <div className={open ? `` : `border-l h-7`}></div>
            <Selection
              category="Relationship"
              value={form.relationship}
              action="Any arrangement"
              open={open === 'relationship'}
              onClick={() => setOpen('relationship')}
              xl="right"
            >
              <li className="flex items-center px-6 py-2 hover:bg-gray-200 text-lg">
                <RiHeartLine className="mr-5" />
                Any
              </li>
              <div className="border-b my-2"></div>
              <li className="flex items-center px-6 py-2 hover:bg-gray-200 text-lg">
                <RiEmpathizeLine className="mr-5" />
                Adopt
              </li>
              <li className="flex items-center px-6 py-2 hover:bg-gray-200 text-lg">
                <RiHandHeartLine className="mr-5" />
                Foster
              </li>
            </Selection>
          </>
        )}
        <button
          type="submit"
          className={`${searchButton.all} ${
            open ? searchButton.expanded : searchButton.minimized
          }`}
        >
          <RiSearchLine className="text-xl" />
          {open && <span className="pr-2">Search</span>}
        </button>
      </form>
    </div>
  );
}
