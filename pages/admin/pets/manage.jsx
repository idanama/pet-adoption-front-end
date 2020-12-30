import { useContext } from 'react';
import Link from 'next/link';

import userContext from '../../../context/userContext';

export default function AddPet() {
  const { user } = useContext(userContext);

  if (user.role === 'admin') {
    return (
      <div className="container-max">
        <h3 className="text-xl mb-4">
          <span className="text-green-500">
            <Link href="/admin">← Dashboard</Link>
          </span>
        </h3>
        <h1 className="text-3xl mb-7">Manage Pets</h1>
      </div>
    );
  }
  return <></>;
}
