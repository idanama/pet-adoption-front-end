import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  RiArrowRightSLine,
  RiFolderShieldLine,
  RiFolderUserLine,
  RiHeartAddLine,
} from 'react-icons/ri';
import api from '../../utils/api';

import userContext from '../../context/userContext';
import PetIcon from '../../components/PetIcon';

export default function Dashboard() {
  const [recentActivity, setRecentActivity] = useState();
  const [recentPets, setRecentPets] = useState();

  const { user } = useContext(userContext);

  const fetchRecentActivity = async () => {
    const { error, res } = await api.getRecentActivity();
    if (!error) {
      setRecentActivity(res);
    } else {
      console.error(error);
    }
  };

  const fetchRecentPets = async () => {
    const { error, res } = await api.getPets();
    if (!error) {
      const petsFiltered = res
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 10);
      setRecentPets(petsFiltered);
    } else {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
    fetchRecentPets();
  }, []);

  const actions = [
    {
      name: 'Add a Pet',
      text: 'Put up a new pet adoption for adoption.',
      icon: <RiHeartAddLine />,
      href: '/admin/pets/add',
    },
    {
      name: 'Manage Users',
      text: 'Overview of all the users and contact information.',
      icon: <RiFolderUserLine />,
      href: '/admin/users/manage',
    },
    {
      name: 'Manage Pets',
      text: 'Edit pet pages and information.',
      icon: <RiFolderShieldLine />,
      href: '/admin/pets/manage',
    },
  ];

  if (user.role === 'admin') {
    return (
      <>
        <Head>
          <title>SPCA - Admin Console</title>
        </Head>
        <div className="container-min">
          <h1 className="text-3xl mb-7">Dashboard</h1>
          <h3 className="text-xl">
            <span className="font-bold">{`${user.fName} ${user.lName}`}</span>
            {' · '}
            <span className="text-primary">
              <Link href="/profile">Go to profile</Link>
            </span>
          </h3>
          <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-max gap-4">
            {actions.map((action) => (
              <Link href={action.href} key={action.name}>
                <a>
                  <div className="p-6 shadow-md w-72 h-44">
                    <div className="text-3xl mb-4">{action.icon}</div>
                    <div className="text-xl flex items-center">
                      {action.name}
                      <RiArrowRightSLine />
                    </div>
                    <div>{action.text}</div>
                  </div>
                </a>
              </Link>
            ))}
          </section>
          <section className="md:grid md:grid-cols-2 gap-4 mt-10">
            {recentActivity && (
              <div>
                <h3 className="text-xl">Recent Activity</h3>
                <ul className="bg-gray-200 rounded-lg mt-2">
                  {recentActivity.map((activity) => (
                    <li
                      className="flex items-center"
                      key={`${activity.petId}${activity.updatedAt}`}
                    >
                      <PetIcon
                        photo={activity.pet.pictures[0]}
                        status={activity.pet.status}
                        name={activity.pet.name}
                        small
                      />
                      {`${activity.user.fName} ${activity.action} ${
                        activity.pet.name
                      } at ${new Date(activity.updatedAt).toLocaleString()}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {recentPets && (
              <div>
                <h3 className="text-xl">Latest Changes</h3>
                <ul className="bg-gray-200 rounded-lg mt-2">
                  {recentPets.map((pet) => (
                    <Link href={`/admin/pets/${pet._id}`}>
                      <a>
                        <li className="flex items-center" key={`${pet._id}`}>
                          <PetIcon
                            photo={pet.pictures[0]}
                            status={pet.status}
                            name={pet.name}
                            small
                          />
                          {`${pet.name} ${
                            pet.updatedAt ? `at ${new Date(pet.updatedAt).toLocaleString()}` : ''
                          }`}
                        </li>
                      </a>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </>
    );
  }
  return <></>;
}
