import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { RiMenuLine, RiUserLine } from 'react-icons/ri';
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
  const [isSearchBarActive, setIsSearchBarActive] = useState(true);

  const { loggedIn, logout, user } = useContext(userContext);

  const router = useRouter();
  const homePath = router.pathname === '/';
  const shading = homePath
    ? 'bg-gradient-to-b from-black-0.4 to-transparent '
    : 'bg-white shadow-lg';
  const navBarHeight = isSearchBarActive ? 'max-h-40' : 'max-h-20';

  return (
    <>
      {!homePath && (
        <div className={`h-40 ${navBarHeight} transition-all duration-300`} />
      )}
      <div
        className={`${shading} z-10 fixed top-0 left-0 w-full transition-all duration-300 h-full
        ${navBarHeight}`}
      >
        <nav className="container relative mx-auto p-4 flex justify-between items-center">
          <div className="justify-self-start">
            <Link href="/">
              <a href="/" className={homePath ? 'text-white' : ''}>
                <Logo />
              </a>
            </Link>
          </div>
          <SearchBar updateNavSize={setIsSearchBarActive} />
          <div
            role="button"
            tabIndex={-1}
            onClick={() => setUserMenu(!userMenu)}
            onBlur={() => setTimeout(() => setUserMenu(false), 100)}
            onKeyUp={() => setUserMenu(!userMenu)}
            className="justify-self-end relative"
          >
            <div className="h-11 bg-white rounded-full border border-gray-200 text-xl px-3 py-2 min-w-full grid grid-flow-col gap-1 items-center hover:shadow-md transition duration-300 ease-in-out">
              <RiMenuLine />
              <RiUserLine />
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
                    {user.role === 'admin' && (
                      <>
                        <li className="p-2 w-full">
                          <Button
                            link="/admin/pets/add"
                            transparent
                            fullWidth
                            className="text-left"
                          >
                            Add Pet
                          </Button>
                        </li>
                        <li className="border-b p-2 w-full">
                          <Button
                            link="/admin"
                            transparent
                            fullWidth
                            className="text-left"
                          >
                            Dashboard
                          </Button>
                        </li>
                      </>
                    )}
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
