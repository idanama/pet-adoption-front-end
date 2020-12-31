import { IconContext } from 'react-icons';
import {
  RiPaletteLine,
  RiMenLine,
  RiWomenLine,
  RiScales2Line,
  RiArrowUpDownLine,
  RiCapsuleLine,
  RiEmpathizeLine,
  RiRestaurantLine,
} from 'react-icons/ri';

export default function PetProfile({ pet }) {
  const petTable = [
    {
      title: 'Gender',
      value: pet.gender,
      icon: pet.gender === 'Male' ? <RiMenLine /> : <RiWomenLine />,
    },
    {
      title: 'Adoption Status',
      value: pet.status,
      icon: <RiEmpathizeLine />,
    },
    {
      title: 'Height',
      value: `${pet.height} cm`,
      icon: <RiArrowUpDownLine />,
    },
    {
      title: 'Weight',
      value: `${pet.weight} kg`,
      icon: <RiScales2Line />,
    },
    { title: 'Color', value: pet.color, icon: <RiPaletteLine /> },
    {
      title: 'Hypoallergenic',
      value: pet.hypoallergenic ? 'Yes' : 'No',
      icon: <RiCapsuleLine />,
    },
    { title: 'Diet', value: pet.diet, icon: <RiRestaurantLine /> },
  ];

  return (
    <>
      <div className="text-4xl pb-3 flex justify-between items-center">
        <h1>{pet.name}</h1>
      </div>
      <div className="text-2xl">
        {`${pet.gender} ${pet.species.toLowerCase()}, ${pet.age}.`}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 border-t border-b py-3">
        <IconContext.Provider value={{ size: '1.5em' }}>
          {petTable.map(
            (field) =>
              field.value && (
                <div key={field.title} className="flex p-3">
                  <div className="w-12 flex items-center">{field.icon}</div>
                  <div className="w-full">
                    <div className="font-semibold">{field.title}</div>
                    <div>{field.value}</div>
                  </div>
                </div>
              )
          )}
        </IconContext.Provider>
      </div>
      <div className="mt-3 text-lg">{pet.bio}</div>
    </>
  );
}
