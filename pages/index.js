import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Hero from '../components/Hero';
import PetIcon from '../components/PetIcon';
import api from '../utils/api';
import Button from '../components/base/Button';

export default function Home() {
  const [heroPet, setHeroPet] = useState(
    {
      img: '',
      title: 'SPCA',
      text: 'Society for Prevention of Cruelty to Animals in Israel',
      action: ``,
      to: `/`,
    }
  );
  const [recentPets, setRecentPets] = useState();
  const [lastAdoption, setLastAdoption] = useState();

  const fetchRandomPet = async () => {
    const pet = await api.getRandomPet();
    if (pet.ok) {
      const { pictures, name, tagline } = pet.res;
      setHeroPet({
        img: pictures[0],
        title: name,
        text: tagline,
        action:`Meet ${name}`,
        to: `/pet/${name}`,
      });
    }
  };

  const fetchRecentPets = async () => {
    const {error, res} = await api.getRecentPet();
    if (!error) {
      setRecentPets(res);
    } else {
      console.error(error);
    }
  }

  const fetchLastAdoption = async () => {
    const {error, res} = await api.getLastAdoption();
    if (!error) {
      setLastAdoption(res);
    } else {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRandomPet();
    fetchRecentPets();
    fetchLastAdoption();
  }, []);

  return (
    <div>
      <Head>
        <title>SPCA - Home Page</title>
      </Head>
      <main>
        <Hero img={heroPet.img} title={heroPet.title} text={heroPet.text} action={heroPet.action} to={heroPet.to} />
      </main>
      <section className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentPets?.length > 0 && recentPets.map(pet => (
              <Link href={`/pet/${pet.name}`} key={pet.id}>
                <a>
                  <div className="flex items-center">
                    <PetIcon photo={pet.pictures[0]} status={pet.status} name={pet.name} circle={false} />
                    <div className="text-lg ml-4">
                      <div className="font-semibold">{pet.name}</div>
                      <div className="-mt-2">{`${pet.age} ${pet.species && pet.species.toLowerCase()}`}</div>
                    </div>
                  </div>
                </a>
              </Link>
            ))
          }
        </div>
      </section>
      {lastAdoption && (
        <section className="bg-black text-white">
            <div className="container-max grid grid-cols-2 md:grid-cols-3 p-3">

          <div className="md:col-span-2">
            <div className="overflow-hidden mr-6 bg-gray-300 rounded-xl h-full">
              <img
                src={lastAdoption.pet.pictures[0]}
                alt={lastAdoption.pet.name}
                className="h-full object-cover w-full"
              />
           </div>
          </div>
          <div className="flex flex-col justify-center">
              <h2 className="text-4xl">{`${lastAdoption.pet.name} just found a home!`}</h2>
              <p>{`Congratulations to ${lastAdoption.user.fName} for having ${lastAdoption.pet.gender === 'Male' ? 'him' : 'her'}.`}</p>
              <p className="mt-4 text-lg font-semibold">{`There are still more ${lastAdoption.pet.species.toLowerCase()}s in need for a home!`}</p>
              <div className="text-center m-3">
                <Button link={`/search?animal=${lastAdoption.pet.species.toLowerCase()}`} primary>{`Adopt a ${lastAdoption.pet.species.toLowerCase()}`}</Button>
              </div>
          </div>
            </div>
        </section>
      )}
    </div>
  );
}
