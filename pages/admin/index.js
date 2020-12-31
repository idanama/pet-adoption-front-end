import { useContext } from 'react';
import Link from 'next/link';

import {
  RiArrowRightSLine, RiFolderShieldLine, RiFolderUserLine, RiHeartAddLine,
} from 'react-icons/ri';

import userContext from '../../context/userContext';

export default function Dashboard() {
  const { user } = useContext(userContext);

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
      <div className="container-min">
        <h1 className="text-3xl mb-7">Dashboard</h1>
        <h3 className="text-xl">
          <span className="font-bold">
            {`${user.fName} ${user.lName}`}
          </span>
          {' · '}
          <span className="text-green-500">
            <Link href="/profile">Go to profile</Link>
          </span>
        </h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-max gap-4">
          {actions.map((action) => (
            <Link href={action.href} key={action.name}>
              <a>
                <div className="p-6 shadow-md w-72 h-44">
                  <div className="text-3xl mb-4">
                    {action.icon}
                  </div>
                  <div className="text-xl flex items-center">
                    {action.name}
                    <RiArrowRightSLine />
                  </div>
                  <div>{action.text}</div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  return (<></>);
}
