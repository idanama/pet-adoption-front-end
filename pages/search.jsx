import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';
import PetCard from '../components/PetCard';

export default function Search() {
  const [petResults, setPetResults] = useState([]);

  const { query } = useRouter();
  let { animal, relationship } = query;
  if (relationship === 'any' || !relationship) {
    relationship = 'adopt or foster';
  }
  if (animal === 'any' || !animal) {
    animal = 'pet';
  }

  const updateResults = async (queryParams) => {
    try {
      const urlParams = new URLSearchParams();
      Object.keys(queryParams).forEach((key) => {
        urlParams.append(key, queryParams[key]);
      });
      const { res } = await api.getPets(`?${urlParams.toString()}`);
      setPetResults(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateResults(query);
  }, [query]);

  return (
    <>
      <div className="container-max">
        <h1 className="text-3xl">
          <span className="capitalize">{`${animal}s to ${relationship}`}</span>
        </h1>
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {petResults.map((pet) => (
            <PetCard key={`saved-${pet._id}`} pet={pet} />
          ))}
        </section>
      </div>
    </>
  );
}
