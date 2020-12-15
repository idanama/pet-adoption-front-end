import { useRouter } from 'next/router';
import Footer from './Footer';
import NavBar from './NavBar';

export default function Layout({ children }) {
  const router = useRouter();
  const spacing = router.pathname === '/' ? '' : 'mt-24';
  return (
    <>
      <div className={`${spacing} min-h-screen`}>{children}</div>
      <NavBar />
      <Footer />
    </>
  );
}
