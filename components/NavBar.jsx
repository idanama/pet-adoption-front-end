import { useContext, useState } from 'react';
import Link from 'next/link';
import Button from './base/Button';
import Logo from './base/Logo';
import Login from './Login';
import Register from './Register';
import SearchBar from './SearchBar';
import userContext from '../context/userContext';

export default function NavBar() {
  const [userMenu, setUserMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const { loggedIn, logout } = useContext(userContext);

  return (
    <>
      <div className="bg-white fixed top-0 left-0 w-full">
        <nav className="container relative mx-auto p-4 flex justify-between items-center">
          <div className="justify-self-start">
            <Logo />
          </div>
          <div className="justify-self-center absolute left-1/2 transform -translate-x-1/2 w-64 md:w-72 xl:w-96">
            <SearchBar />
          </div>
          <div className="justify-self-end relative">
            <button
              type="button"
              onClick={() => setUserMenu(!userMenu)}
              className="h-11 bg-white rounded-full border border-gray-200 text-sm pl-3 px-2 py-1 min-w-full flex justify-between items-center hover:shadow-md transition duration-300 ease-in-out"
            >
              <img src="/icons/menu.svg" alt="Menu" className="w-5 h-5 mr-2" />
              <img src="/icons/user.svg" alt="User" className="w-5 h-5" />
            </button>
            {userMenu && (
              <ul className="bg-white rounded-xl border border-gray-200 p-3 top-0 right-0 transform translate-y-14 hover:shadow-md absolute w-40 transition duration-300">
                {!loggedIn && (
                  <>
                    <li className="border-b p-2 w-full">
                      <Button
                        onClick={() => setLogin(true)}
                        transparent
                        fullWidth
                        className="text-left"
                      >
                        Login
                      </Button>
                    </li>
                    <li className="p-2 w-full">
                      <Button
                        onClick={() => setRegister(true)}
                        transparent
                        fullWidth
                        className="text-left"
                      >
                        Register
                      </Button>
                    </li>
                  </>
                )}
                {loggedIn && (
                  <>
                    <li className="border-b p-2 w-full">
                      <Button
                        link="/profile"
                        transparent
                        fullWidth
                        className="text-left"
                      >
                        Profile
                      </Button>
                    </li>
                    <li className="border-b p-2 w-full">
                      <Button
                        link="/mypets"
                        transparent
                        fullWidth
                        className="text-left"
                      >
                        My Pets
                      </Button>
                    </li>
                    <li className="p-2 w-full">
                      <Button
                        transparent
                        fullWidth
                        className="text-left"
                        onClick={() => logout()}
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </nav>
      </div>
      {login && <Login close={() => setLogin(false)} />}
      {register && <Register close={() => setRegister(false)} />}
    </>
  );
}
