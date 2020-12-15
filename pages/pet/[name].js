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
import Modal from '../../components/base/Modal';

import userContext from '../../context/userContext';

export default function PetPage() {
  const { name } = useRouter().query;

  const { pets, getPet } = useContext(userContext);

  const [pet, setPet] = useState({
    Name: 'Loading', pictures: [''], gender: '', dateOfBirth: new Date(), type: '',
  });
  const [petTable, setPetTable] = useState([{ title: '', value: '', icon: '' }]);
  const [saved, setSaved] = useState(false);
  const [modal, setModal] = useState('');

  const [loading, setLoading] = useState(true);

  const fetchPetByName = async (param) => {
    setLoading(true);
    const petResponse = await (await fetch(`/api/pet/name/${param}`)).json();
    const userOwned = pets[petResponse.id] !== undefined;
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

  const changePetStatus = (status) => {
    getPet(pet.id, status);
    setPet({ ...pet, userOwned: !!status });
  };

  useEffect(() => {
    if (name !== undefined) {
      fetchPetByName(name);
    }
  }, [name]);

  return (
    <div className="container mx-auto max-w-screen-lg px-3 lg:px-0">
      <img src={pet.pictures && pet.pictures[0]} alt={pet.name} className="object-cover h-full w-full object-center max-h-60v rounded-2xl" />
      <div className="flex">
        <div className="w-2/3 m-4">
          <div className="text-4xl pb-3 flex justify-between items-center">
            <h1>{pet.name}</h1>
            <Button transparent className="flex flex-col items-center w-5" onClick={() => setSaved(!saved)}>
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
              `${pet.gender} ${pet.type.toLowerCase()}, ${formatDistanceToNow(new Date(pet.dateOfBirth.toString()))} old.`
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
        <div className="md:px-5 w-1/3 py-5">
          <div className="sticky top-0 p-5 border rounded-xl shadow-xl">
            <div className="grid grid-cols-1 gap-2">
              { !pet.userOwned
                && (
                <>
                  <div className="text-xl">
                    {`Want to have ${pet.name}?`}
                  </div>
                  <Button xl primary onClick={() => changePetStatus('adopt')}>Adopt</Button>
                  <Button white onClick={() => changePetStatus('foster')}>Foster</Button>
                </>
                )}
              {pet.userOwned && (
                <>
                  <div className="text-xl">{`You already have ${pet.name}, isn't ${pet.gender === 'Male' ? 'he' : 'she'} cute? 😍`}</div>
                  <div>Help up save more animals!</div>
                  <Button primary className="mb-12" link="\donate">Donate to spca</Button>
                  <Button text className="text-gray-700" onClick={() => setModal('return')}>{`I'm a heartless person and I want to return ${pet.name}.`}</Button>
                  {modal === 'return' && (
                    <Modal title="Return a pet" close={() => setModal('')}>
                      <div className="grid grid-col-1 gap-3">
                        <div>
                          Pets have feelings and get traumatized when they become orphaned
                          willingly, if you have any issues please ask for advice before giving up.

                        </div>
                        <Button xl primary onClick={() => setModal('')}>{`I will be a good parent to ${pet.name}`}</Button>
                        <Button text onClick={() => { changePetStatus(undefined); setModal(''); }}>{`Return ${pet.name}`}</Button>
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
    </div>
  );
}
