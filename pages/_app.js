/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { useState } from 'react';
import Layout from '../components/Layout';
import userContext from '../context/userContext';

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);
  const [user, setUser] = useState({
    fName: '',
    lName: '',
    email: '',
    bio: '',
  });

  const updateUser = (payload) => {
    setUser({ ...user, ...payload });
  };

  return (
    <>
      <userContext.Provider value={{
        loggedIn, login, logout, user, updateUser,
      }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </userContext.Provider>
    </>
  );
}

export default MyApp;
