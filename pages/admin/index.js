import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/base/Button';

import userContext from '../../context/userContext';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useContext(userContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user.role !== 'admin') {
        router.push('/');
      } else {
        setIsAdmin(true);
      }
    }
  }, [user, loading, router]);

  if (isAdmin) {
    return (
      <div className="container mx-auto max-w-screen-lg px-7 lg:px-1">
        <h1 className="text-3xl mb-7">Dashboard</h1>
        <ul>
          <li><Button>Add Pet</Button></li>
          <li>Manage Users</li>
          <li>Manage Pets</li>
        </ul>
      </div>
    );
  }
  return (<></>);
}
