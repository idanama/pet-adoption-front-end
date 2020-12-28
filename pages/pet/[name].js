import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import {
  RiPaletteLine,
  RiMenLine,
  RiWomenLine,
  RiScales2Line,
  RiArrowUpDownLine,
  RiCapsuleLine,
  RiEmpathizeLine,
  RiRestaurantLine,
  RiHeartLine,
  RiHeartFill,
} from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { formatDistanceToNow } from 'date-fns';
import Button from '../../components/base/Button';
import Register from '../../components/Register';
import Login from '../../components/Login';
import Modal from '../../components/base/Modal';
import api from '../../utils/api';

import userContext from '../../context/userContext';

export default function PetPage() {
  const { name } = useRouter().query;

  const { user, loggedIn } = useContext(userContext);

  const [pet, setPet] = useState({
    Name: 'Loading', pictures: [''], gender: '', dateOfBirth: new Date(), type: '',
  });
  const [petTable, setPetTable] = useState([{ title: '', value: '', icon: '' }]);
  const [saved, setSaved] = useState(false);
  const [modal, setModal] = useState('');

  const [loading, setLoading] = useState(true);

  const fetchPetByName = async (petName) => {
    setLoading(true);
    const petResponse = (await api.getPetByName(petName)).res;
    let userOwned = false;
    if (user._id) {
      userOwned = petResponse.owner === user._id;
    }
    setPet({ ...petResponse, userOwned });
    setPetTable([
      { title: 'Gender', value: petResponse.gender, icon: petResponse.gender === 'Male' ? <RiMenLine /> : <RiWomenLine /> },
      { title: 'Adoption Status', value: petResponse.status, icon: <RiEmpathizeLine /> },
      { title: 'Height', value: petResponse.height, icon: <RiArrowUpDownLine /> },
      { title: 'Weight', value: petResponse.weight, icon: <RiScales2Line /> },
      { title: 'Color', value: petResponse.color, icon: <RiPaletteLine /> },
      { title: 'Hypoallergenic', value: petResponse.hypoallergenic ? 'Yes' : 'No', icon: <RiCapsuleLine /> },
      { title: 'Diet', value: petResponse.diet, icon: <RiRestaurantLine /> },
    ]);

    setLoading(false);
  };

  const changePetOwnership = async (status) => {
    let petResponse;
    switch (status) {
      case 'adopt':
        petResponse = (await api.adoptPet(user._id, pet._id, 'adopt')).res;
        break;
      case 'foster':
        petResponse = (await api.adoptPet(user._id, pet._id, 'foster')).res;
        break;
      case 'return':
        petResponse = (await api.returnPet(user._id, pet._id)).res;
        break;
      default:
        break;
    }
    setPet(petResponse);
  };

  const likePet = async () => {
    setSaved(true);
    const { savedPets, ok } = await api.savePet(user._id, pet._id);
    if (!ok || !savedPets.includes(pet._id)) {
      setSaved(false);
    }
  };

  const unlikePet = async () => {
    setSaved(false);
    const { savedPets, ok } = await api.deleteSavedPet(user._id, pet._id);
    if (!ok || savedPets.includes(pet._id)) {
      setSaved(true);
    }
  };

  const toggleLikePet = () => {
    if (saved) {
      unlikePet();
    } else {
      likePet();
    }
  };
  useEffect(() => {
    if (name !== undefined) {
      fetchPetByName(name);
    }
  }, [name]);

  return (
    <div className="container mx-auto max-w-screen-lg px-7 lg:px-1">
      <img src={pet.pictures && pet.pictures[0]} alt={pet.name} className="object-cover h-full w-full object-center max-h-60v rounded-2xl" />
      <div className="flex">
        <div className="w-2/3 m-4">
          <div className="text-4xl pb-3 flex justify-between items-center">
            <h1>{pet.name}</h1>
            <Button transparent className="flex flex-col items-center w-5" onClick={() => toggleLikePet()}>
              {!saved && (
              <>
                <RiHeartLine size="0.8em" />
                <div className="text-sm text-gray-700 underline">Save</div>
              </>
              )}
              {
                saved && (
                <>
                  <RiHeartFill size="0.8em" className="text-green-500" />
                  <div className="text-sm text-gray-700 underline invisible">Remove</div>
                </>
                )
              }
            </Button>
          </div>
          <div className="text-2xl">
            {!loading && (
              `${pet.gender} ${pet.species.toLowerCase()}, ${formatDistanceToNow(new Date(pet.dateOfBirth.toString()))} old.`
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 border-t border-b py-3">
            <IconContext.Provider value={{ size: '1.5em' }}>
              {petTable.map((field) => (field.value
                && (
                <div key={field.title} className="flex p-3">
                  <div className="w-12 flex items-center">{field.icon}</div>
                  <div className="w-full">
                    <div className="font-semibold">
                      {field.title}
                    </div>
                    <div>
                      {field.value}
                    </div>
                  </div>
                </div>
                )
              ))}
            </IconContext.Provider>
          </div>
          <div className="mt-3 text-lg">
            {pet.bio}
          </div>
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
