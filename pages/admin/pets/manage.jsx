import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { RiArrowRightSLine } from 'react-icons/ri';
import api from '../../../utils/api';

import userContext from '../../../context/userContext';
import PetIcon from '../../../components/PetIcon';

export default function AddPet() {
  const [pets, setPets] = useState([]);
  const { user } = useContext(userContext);

  const groupByKey = (array, key) => {
    const grouped = {};
    array.forEach((item) => {
      if (!grouped[item[key]]) {
        grouped[item[key]] = [];
      }
      grouped[item[key]].push(item);
    });
    return grouped;
  };

  const fetchPets = async () => {
    const urlParams = new URLSearchParams();
    urlParams.append('get', ['fName', 'lName']);

    const { res, ok } = await api.getPets();
    if (ok) {
      setPets(groupByKey(res, 'status'));
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  if (user.role === 'admin') {
    return (
      <div className="container-max">
        <h3 className="text-xl mb-4">
          <span className="text-adoptable">
            <Link href="/admin">← Dashboard</Link>
          </span>
        </h3>
        <h1 className="text-3xl mb-7">Manage Pets</h1>
        {Object.keys(pets).map((groupName) => (
          <div key={groupName}>
            <h2 className="text-2xl mt-5 mb-3">{groupName}</h2>
            <section className="flex flex-wrap">
              {pets[groupName].map((pet) => (
                <div className="p-2" key={pet._id}>
                  <Link href={`/admin/pets/${pet._id}`}>
                    <a>
                      <PetIcon photo={pet.pictures[0]} status={pet.status} />
                    </a>
                  </Link>
                </div>
              ))}
            </section>
          </div>
        ))}
      </div>
    );
  }
  return <></>;
}
