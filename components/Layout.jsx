import { useRouter } from 'next/router';
import Footer from './Footer';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
