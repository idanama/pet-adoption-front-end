/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { useState } from 'react';
import Layout from '../components/Layout';
import userContext from '../context/userContext';

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pets, setPets] = useState({});
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

  const getPet = (petId, status) => {
    setPets({ ...pets, [petId]: status });
  };

  return (
    <>
      <userContext.Provider value={{
        loggedIn, login, logout, user, updateUser, pets, getPet,
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
