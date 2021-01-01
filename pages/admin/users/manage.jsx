import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { RiArrowRightSLine } from 'react-icons/ri';
import api from '../../../utils/api';

import userContext from '../../../context/userContext';
import PetIcon from '../../../components/PetIcon';

export default function AddPet() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(userContext);

  const fetchUsers = async () => {
    const urlParams = new URLSearchParams();
    urlParams.append('get', ['fName', 'lName']);

    const { res, ok } = await api.getUsers(`?${urlParams.toString()}`);
    if (ok) {
      setUsers(res);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (user.role === 'admin') {
    return (
      <div className="container-max">
        <h3 className="text-xl mb-4">
          <span className="text-adoptable">
            <Link href="/admin">← Dashboard</Link>
          </span>
        </h3>
        <h1 className="text-3xl mb-7">Manage Users</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((petUser) => (
            <Link key={petUser._id} href={`/admin/users/${petUser._id}`}>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-200 overflow-hidden cursor-pointer">
                <div className="mt-3 p-6 pb-6 flex flex-col justify-between">
                  <div className="text-2xl">
                    {`${petUser.fName} ${petUser.lName}`}{' '}
                    <RiArrowRightSLine className="inline-block" />
                  </div>
                  <div className="flex flex-wrap mt-4">
                    {petUser.ownedPets?.map((pet) => (
                      <PetIcon
                        status={pet.status}
                        photo={pet.pictures[0]}
                        name={pet.name}
                        key={pet._id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    );
  }
  return <></>;
}
