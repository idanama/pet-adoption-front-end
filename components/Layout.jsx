import { useRouter } from 'next/router';
import NavBar from './NavBar';

export default function Layout({ children }) {
  const router = useRouter();
  const spacing = router.pathname === '/' ? '' : 'mt-20';
  return (
    <>
      <div className={spacing}>{children}</div>
      <NavBar />
    </>
  );
}
