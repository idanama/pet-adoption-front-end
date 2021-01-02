import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
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
    setLoading(true);
    const { res, ok } = await api.getPet(id);
    if (ok) {
      setPet(res);
    }
    setLoading(false);
  };

  const handleEdit = (edited) => {
    console.log(edited);
    setPet({ ...pet, ...edited });
  };

  useEffect(() => {
    if (petId !== undefined) {
      fetchPetById(petId);
    }
  }, [petId]);

  if (user.role === 'admin') {
    return (
      <div className="container-max">
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
                <Button primary>Save changes</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
