import { useContext } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import userContext from '../context/userContext';

export default function Layout({ children }) {
  const { user } = useContext(userContext);
  return (
    <>
      <NavBar />
      <div className="min-h-screen">{children}</div>
      <Footer admin={user.role === 'admin'} signedIn={!!user._id} />
    </>
  );
}
