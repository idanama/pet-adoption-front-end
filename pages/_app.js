/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import userContext from '../context/userContext';
import api from '../utils/api';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userState, setUser] = useState({});

  const signup = async (userInfo) => {
    try {
      setLoading(true);
      const { token, user } = (await api.signup(userInfo)).res;
      Cookies.set('jwt', token, { expires: 30 });
      Cookies.set('uid', user._id, { expires: 30 });
      setUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { token, user } = (await api.login(email, password)).res;
      Cookies.set('jwt', token, { expires: 30 });
      Cookies.set('uid', user._id, { expires: 30 });
      setUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser({});
    router.push('/');
    Cookies.remove('jwt');
    Cookies.remove('uid');
  };

  const rehydrateUser = async () => {
    try {
      setLoading(true);
      const jwt = Cookies.get('jwt');
      if (jwt) {
        const userData = (await api.hydrateUser()).res;
        setUser(userData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    rehydrateUser();
  }, []);

  return (
    <>
      <userContext.Provider value={{
        loggedIn: '_id' in userState, login, logout, signup, user: userState, loading,
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
