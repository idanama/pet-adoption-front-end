import { useContext, useState, useEffect } from 'react';
import api from '../utils/api';

import Button from '../components/base/Button';
import Input from '../components/base/Input';
import userContext from '../context/userContext';

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
    <div className="container mx-auto max-w-screen-lg px-3">
      <h1 className="text-3xl">My Pets</h1>
      <section> </section>
      <section>
        <h2 className="text-2xl">Saved Pets</h2>
      </section>
    </div>
  );
}
