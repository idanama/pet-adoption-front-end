import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RiMailLine, RiPhoneLine } from 'react-icons/ri';
import api from '../../../utils/api';

import userContext from '../../../context/userContext';
import PetCard from '../../../components/PetCard';

export default function ManageUser() {
  const { userId } = useRouter().query;

  const [petUser, setPetUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(userContext);

  const fetchUser = async (id) => {
    const { res, ok } = await api.getUserFull(id);
    if (ok) {
      setPetUser(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId !== undefined) {
      fetchUser(userId);
    }
  }, [userId]);

  if (user.role === 'admin' && loading === false) {
    return (
      <>
        <Head>
          <title>
            {`SPCA - Admin - User ${petUser.fName ? `${petUser.fName} ${petUser.lName}` : ''}`}
          </title>
        </Head>
        <div className="container-max">
          <h3 className="text-xl mb-4">
            <span className="text-primary">
              <Link href="/admin/users/manage">← Manage Users</Link>
            </span>
          </h3>
          <h1 className="text-3xl mb-2">
            {petUser.fName ? `${petUser.fName} ${petUser.lName}` : ''}
          </h1>
          {petUser.phone && (
            <a href={`tel:${petUser.phone}`}>
              <RiPhoneLine className="inline-block mr-1" />
              {petUser.phone}
            </a>
          )}
          {petUser.email && (
            <a href={`mailto:${petUser.email}`}>
              <RiMailLine className="inline-block mr-1" />
              {petUser.email}
            </a>
          )}
          <p className="mt-5">{petUser.bio}</p>
          <h2 className="text-2xl mt-5 mb-3">Owned Pets</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {petUser.ownedPets?.length > 0 &&
              petUser.ownedPets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
            {petUser.ownedPets?.length < 1 && <div>None</div>}
          </section>
          <h2 className="text-2xl mt-7 mb-3">Saved Pets</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {petUser.savedPets?.length > 0 &&
              petUser.savedPets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
            {petUser.savedPets?.length < 1 && <div>None</div>}
          </section>
        </div>
      </>
    );
  }
  return <></>;
}
