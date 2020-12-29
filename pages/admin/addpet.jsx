import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import userContext from '../../context/userContext';

export default function AddPet() {
  const { user } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (user.role !== 'admin') {
      router.push('/');
    }
  });

  return (
    <div className="container mx-auto max-w-screen-lg px-7 lg:px-1">
      <h1 className="text-3xl mb-7">Add Pet</h1>
    </div>
  );
}
