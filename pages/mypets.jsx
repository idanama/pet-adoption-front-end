import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';

import api from '../utils/api';

import userContext from '../context/userContext';
import PetCard from '../components/PetCard';

export default function MyPets() {
  const { user } = useContext(userContext);

  const [loading, setLoading] = useState(true);
  const [myPets, setMyPets] = useState({});

  const fetchPetsArray = async (userId) => {
    setLoading(true);
    const { res } = await api.getUserPets(userId);
    if ('savedPets' in res) {
      setMyPets(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    if ('_id' in user) {
      fetchPetsArray(user._id);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>SPCA - My Pets</title>
      </Head>
      <div className="container-max">
        <h1 className="text-3xl mb-7">My Pets</h1>
        <h2 className="text-2xl mb-3">Owned Pets</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myPets.ownedPets &&
            myPets.ownedPets.map((pet) => <PetCard key={`owned-${pet._id}`} pet={pet} />)}
        </section>
        <h2 className="text-2xl mt-7 mb-3">Saved Pets</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myPets.savedPets &&
            myPets.savedPets.map((pet) => <PetCard key={`saved-${pet._id}`} pet={pet} />)}
        </section>
      </div>
    </>
  );
}
