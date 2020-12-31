import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { RiArrowRightSLine } from 'react-icons/ri';
import api from '../../../utils/api';

import userContext from '../../../context/userContext';

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
                      <div className="relative">
                        <div
                          className={`rounded-full overflow-hidden h-16 w-16 m-2`}
                        >
                          <img
                            src={pet.pictures[0]}
                            className="object-cover h-full"
                          />
                        </div>
                        <div
                          className={`absolute bottom-3 right-3 w-3 h-3 rounded-full ${
                            pet.status !== 'Adopted' &&
                            `bg-${pet.status.toLowerCase()} shadow-inner`
                          }`}
                        ></div>
                      </div>
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
