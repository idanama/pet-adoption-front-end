import Link from 'next/link';
import Button from './base/Button';

export default function PetCard({ pet }) {
  const photoTransformation =
    typeof pet.pictures?.[0] === 'string'
      ? pet.pictures[0].replace('/upload/', '/upload/c_scale,w_500/')
      : pet.pictures[0];

  return (
    <Link href={`/pet/${pet.name.toLowerCase()}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-200 overflow-hidden cursor-pointer">
        <div className="h-40 overflow-hidden  bg-gray-300">
          <img
            src={pet.pictures && photoTransformation}
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
            <Button
              color={`bg-${pet.status.toLowerCase()} ${
                pet.status === 'Adopted' ? 'text-gray-500' : 'text-gray-50'
              }`}
            >
              {pet.status}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
