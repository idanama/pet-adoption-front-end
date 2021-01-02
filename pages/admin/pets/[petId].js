import { useEffect, useState, useContext } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import Button from '../../../components/base/Button';
import PetProfile from '../../../components/PetProfile';
import api from '../../../utils/api';

import userContext from '../../../context/userContext';

export default function EditPet() {
  const { petId } = useRouter().query;

  const { user } = useContext(userContext);

  const [pet, setPet] = useState({
    Name: 'Loading', pictures: [''], gender: '', dateOfBirth: new Date(), type: '',
  });

  const [loading, setLoading] = useState(true);

  const fetchPetById = async (id) => {
    const { res, ok } = await api.getPet(id);
    if (ok) {
      setPet(res);
    }
    setLoading(false);
  };

  const handleEdit = (edited) => {
    setPet({ ...pet, ...edited });
  };

  const saveChanges = async () => {
    const { res, ok } = await api.editPet(petId, pet);
    if (ok) {
      setLoading(true);
      setPet(res);
      setLoading(false);
    }
  };

  const resetChanges = async () => {
    setLoading(true);
    fetchPetById(petId);
  };

  useEffect(() => {
    if (petId !== undefined) {
      fetchPetById(petId);
    }
  }, [petId]);

  if (user.role === 'admin') {
    return (
      <div className="container-max">
        <h3 className="text-xl mb-4">
          <span className="text-adoptable">
            <Link href="/admin/pets/manage">← Manage Pets</Link>
          </span>
        </h3>
        <div className="relative">
          <img src={pet.pictures && pet.pictures[0]} alt={pet.name} className="object-cover h-full w-full object-center max-h-60v rounded-2xl" />
        </div>
        <div className="flex">
          <div className="w-2/3 m-4">

            {
            !loading && (
              <PetProfile pet={pet} onEdit={handleEdit} />
            )
          }
          </div>
          <div className="md:px-5 w-1/3">
            <div className="sticky top-1/3 py-5">
              <div className=" p-5 border rounded-xl shadow-xl grid grid-cols-1 gap-2 min-h-">
                <Button primary onClick={() => saveChanges()}>Save changes</Button>
                <Button onClick={() => resetChanges()}>Reset form</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
