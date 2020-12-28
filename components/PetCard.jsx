import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import Button from './base/Button';

export default function PetCard({ pet }) {
  return (
    <Link href={`/pet/${pet.name}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-200 overflow-hidden cursor-pointer">
        <div className="h-40 overflow-hidden  bg-gray-300">
          <img
            src={pet.pictures && pet.pictures[0]}
            alt={pet.name}
            className="h-full object-cover w-full"
          />
        </div>
        <div className="px-3 pt-3 text-gray-400">
          {`${pet.gender} ${pet.species.toLowerCase()}, ${pet.age}.`}
        </div>
        <div className="p-3 pb-6 flex justify-between items-center">
          <div className="text-3xl">{pet.name}</div>
          <div>
            <Button>{pet.status}</Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
