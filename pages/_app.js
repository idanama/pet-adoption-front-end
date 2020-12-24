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

  const [userState, setUser] = useState({});

  const signup = async (userInfo) => {
    try {
      const { token, user } = await api.signup(userInfo);
      Cookies.set('jwt', token, { expires: 30 });
      Cookies.set('uid', user._id, { expires: 30 });
      setUser(user);
    } catch (e) {
      console.error(e);
    }
  };

  const login = async (email, password) => {
    try {
      const { token, user } = await api.login(email, password);
      Cookies.set('jwt', token, { expires: 30 });
      Cookies.set('uid', user._id, { expires: 30 });
      setUser(user);
    } catch (e) {
      console.error(e);
    }
  };
  const logout = () => {
    setUser({});
    router.push('/');
    Cookies.remove('jwt');
    Cookies.remove('uid');
  };

  const rehydrateUser = async () => {
    const uid = Cookies.get('uid');
    if (uid) {
      const userData = await api.getUser(uid);
      setUser(userData);
    }
  };

  useEffect(() => {
    rehydrateUser();
  }, []);

  return (
    <>
      <userContext.Provider value={{
        loggedIn: '_id' in userState, login, logout, signup, user: userState,
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
