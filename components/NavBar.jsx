import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

  const { loggedIn, logout, user } = useContext(userContext);

  const router = useRouter();
  const homePath = router.pathname === '/';
  const shading = homePath
    ? 'bg-gradient-to-b from-black-0.4 to-transparent fixed'
    : 'bg-white shadow-lg absolute';

  return (
    <>
      <div className={`${shading}  top-0 left-0 w-full`}>
        <nav className="container relative mx-auto p-4 flex justify-between items-center">
          <div className="justify-self-start">
            <Link href="/">
              <a href="/" className={homePath ? 'text-white' : ''}>
                <Logo />
              </a>
            </Link>
          </div>
          <div className="justify-self-center absolute left-1/2 transform -translate-x-1/2 w-64 md:w-72 xl:w-96">
            <SearchBar />
          </div>
          <button
            type="button"
            onClick={() => setUserMenu(!userMenu)}
            onBlur={() => setTimeout(() => setUserMenu(!userMenu), 100)}
            className="justify-self-end relative"
          >
            <div className="h-11 bg-white rounded-full border border-gray-200 text-sm pl-3 px-2 py-1 min-w-full flex justify-between items-center hover:shadow-md transition duration-300 ease-in-out">
              <img src="/icons/menu.svg" alt="Menu" className="w-5 h-5 mr-2" />
              <img src="/icons/user.svg" alt="User" className="w-5 h-5" />
            </div>
            {userMenu && (
              <ul className="bg-white rounded-xl border border-gray-200 top-0 right-0 transform translate-y-14 hover:shadow-md absolute w-40 transition duration-300">
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
                    <li className="border-b px-5 py-2 w-full text-gray-400">
                      {`${user.fName} ${user.lName}`}
                    </li>
                    <li className="p-2 w-full">
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
          </button>
        </nav>
      </div>
      {login && <Login close={() => setLogin(false)} />}
      {register && <Register close={() => setRegister(false)} />}
    </>
  );
}
