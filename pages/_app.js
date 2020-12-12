/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { useState } from 'react';
import Layout from '../components/Layout';
import userContext from '../context/userContext';

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  return (
    <>
      <userContext.Provider value={{ loggedIn, login, logout }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </userContext.Provider>
    </>
  );
}

export default MyApp;
