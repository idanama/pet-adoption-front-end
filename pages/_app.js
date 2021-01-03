/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import userContext from '../context/userContext';
import api from '../utils/api';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loadingUser, setLoadingUser] = useState(true);
  const [userState, setUser] = useState({});

  const signup = async (userInfo) => {
    try {
      setLoadingUser(true);
      const { user } = (await api.signup(userInfo)).res;
      setUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUser(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoadingUser(true);
      const { user } = (await api.login(email, password)).res;
      setUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = () => {
    setUser({});
    router.push('/');
    document.cookie = 'jwt=; Max-Age=-99999999999';
  };

  const setSavedPet = (petId, truth) => {
    if (truth) {
      return setUser({ ...userState, savedPets: { ...userState.setSavedPets, petId } });
    }
    const filteredPets = userState.setSavedPets.filter((id) => id !== petId);
    return setUser({ ...userState, savedPets: filteredPets });
  };

  const rehydrateUser = async () => {
    try {
      setLoadingUser(true);
      const { res, ok } = await api.hydrateUser();
      if (ok) {
        setUser(res);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    rehydrateUser();
  }, []);

  useEffect(() => {
    if (
      router.route.startsWith('/admin')
      && !loadingUser
      && userState.role !== 'admin') {
      router.push('/');
    }
  }, [userState, loadingUser, router]);

  return (
    <>
      <userContext.Provider value={{
        loggedIn: '_id' in userState,
        login,
        logout,
        signup,
        user: userState,
        loading: loadingUser,
        setSavedPet,
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
