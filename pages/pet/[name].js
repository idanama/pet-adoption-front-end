import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import {
  RiHeartLine,
  RiHeartFill,
} from 'react-icons/ri';
import Button from '../../components/base/Button';
import Register from '../../components/Register';
import Login from '../../components/Login';
import Modal from '../../components/base/Modal';
import PetProfile from '../../components/PetProfile';
import api from '../../utils/api';

import userContext from '../../context/userContext';

export default function PetPage() {
  const { name } = useRouter().query;

  const { user, loggedIn } = useContext(userContext);

  const [pet, setPet] = useState({
    Name: 'Loading', pictures: [''], gender: '', dateOfBirth: new Date(), type: '',
  });
  const [saved, setSaved] = useState(false);
  const [modal, setModal] = useState('');

  const [loading, setLoading] = useState(true);

  const fetchPetByName = async (petName) => {
    setLoading(true);
    const { res, ok } = await api.getPetByName(petName);
    if (ok) {
      let userOwned = false;
      if (user._id) {
        userOwned = res.owner === user._id;
      }
      setPet({ ...res, userOwned });
    }
    setLoading(false);
  };

  const changePetOwnership = async (status) => {
    if (status === 'return') {
      const { res, ok } = await api.returnPet(user._id, pet._id);
      if (ok) {
        setPet(res);
      }
    } else {
      const { res, ok } = await api.adoptPet(user._id, pet._id, status);
      if (ok) {
        setPet(res);
      }
    }
  };

  const toggleLikePet = async () => {
    if (saved) {
      setSaved(false);
      const { res, ok } = await api.deleteSavedPet(user._id, pet._id);
      if (!ok || res.savedPets.includes(pet._id)) {
        setSaved(true);
      }
    } else {
      setSaved(true);
      const { res, ok } = await api.savePet(user._id, pet._id);
      if (!ok || !res.savedPets.includes(pet._id)) {
        setSaved(false);
      }
    }
  };

  useEffect(() => {
    if (name !== undefined) {
      fetchPetByName(name);
    }
  }, [name]);

  useEffect(() => {
    if (user.savedPets?.includes(pet._id)) {
      setSaved(true);
    }
  }, [user, pet]);

  return (
    <div className="container-max">
      <div className="relative">
        <img src={pet.pictures && pet.pictures[0]} alt={pet.name} className="object-cover h-full w-full object-center max-h-60v rounded-2xl" />
        <div className="absolute bottom-4 right-6">
          <Button
            transparent
            className="flex flex-col items-center w-12 h-12 text-4xl"
            onClick={() => toggleLikePet()}
          >
            {!saved && (
              <RiHeartLine className="text-white" />
            )}
            {saved && (
              <RiHeartFill className="text-primary" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/3 m-4">

          {
            !loading && (
              <PetProfile pet={pet} />
            )
          }
        </div>
        <div className="md:px-5 w-1/3">
          <div className="sticky top-1/3 py-5">
            <div className=" p-5 border rounded-xl shadow-xl grid grid-cols-1 gap-2 min-h-">
              { !loading && pet.owner === null && (
                <>
                  <div className="text-xl">
                    {`Want to have ${pet.name}?`}
                  </div>
                    { loggedIn && (
                    <>
                      <Button xl primary onClick={() => changePetOwnership('adopt')}>Adopt</Button>
                      <Button white onClick={() => changePetOwnership('foster')}>Foster</Button>
                    </>
                    )}
                    { !loggedIn && (
                    <div className="grid grid-cols-2 gap-2">
                      <Button white onClick={() => setModal('register')}>Register</Button>
                      <Button white onClick={() => setModal('login')}>Login</Button>
                    </div>
                    )}
                </>
              )}
              {!loading && pet.owner === user._id && (
                <>
                  <div className="text-xl">{`You already have ${pet.name}, isn't ${pet.gender === 'Male' ? 'he' : 'she'} cute? 😍`}</div>
                  <div>Help up save more animals!</div>
                  {pet.status === 'Fostered' && (
                    <>
                      <Button primary xl onClick={() => changePetOwnership('adopt')}>
                        Adopt
                        {' '}
                        { pet.name}
                      </Button>
                    </>
                  )}
                  <Button primary={pet.status === 'Adopted'} link="\donate">Donate to spca</Button>
                  <Button text className="text-gray-700" onClick={() => setModal('return')}>{`Things are not going well between me and ${pet.name}.`}</Button>
                  {modal === 'return' && (
                    <Modal title="Return a pet" close={() => setModal('')}>
                      <div className="grid grid-col-1 gap-3">
                        <div>
                          Pets just want to be loved, sometimes we don&apos;t understand each other.
                          If you have any issues please ask for advice before giving up.
                        </div>
                        <Button xl primary onClick={() => setModal('')}>{`I will be a good parent to ${pet.name}`}</Button>
                        <Button text onClick={() => { changePetOwnership('return'); setModal(''); }}>{`Return ${pet.name}`}</Button>
                        {' '}
                      </div>
                    </Modal>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {modal === 'register' && (<Register close={() => setModal('')} />)}
      {modal === 'login' && (<Login close={() => setModal('')} />)}
    </div>
  );
}
