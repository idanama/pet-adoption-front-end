import { useContext, useState, useEffect } from 'react';
import api from '../utils/api';

import Button from '../components/base/Button';
import Input from '../components/base/Input';
import userContext from '../context/userContext';
import PetCard from '../components/PetCard';

export default function MyPets() {
  const { user, updateUser } = useContext(userContext);
  const [formUser, updateFormUser] = useState(user);

  const [loading, setLoading] = useState(true);
  const [myPets, setMyPets] = useState({});
  const [savedPets, setSavedPets] = useState({});

  const fetchPetsArray = async (userId) => {
    setLoading(true);
    const pets = await api.getUserPets(userId);
    if ('savedPets' in pets) {
      setMyPets(pets);
    }
    setLoading(false);
  };

  useEffect(() => {
    if ('_id' in user) {
      fetchPetsArray(user._id);
    }
  }, [user]);

  return (
    <div className="container mx-auto max-w-screen-lg px-7 lg:px-1">
      <h1 className="text-3xl mb-7">My Pets</h1>
      <h2 className="text-2xl mb-3">Owned Pets</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myPets.ownedPets &&
          myPets.ownedPets.map((pet) => <PetCard pet={pet} />)}
      </section>
      <h2 className="text-2xl mt-7 mb-3">Saved Pets</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myPets.savedPets &&
          myPets.savedPets.map((pet) => <PetCard pet={pet} />)}
      </section>
    </div>
  );
}
