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
import Selection from './base/Selection';
import Input from './base/Input';

export default function PetProfile({ pet, onEdit }) {
  const petTable = [
    {
      title: 'Gender',
      value: pet.gender,
      icon: pet.gender === 'Male' ? <RiMenLine /> : <RiWomenLine />,
      type: 'selection',
      options: ['Male', 'Female'],
      name: 'gender',
    },
    {
      title: 'Adoption Status',
      value: pet.status,
      icon: <RiEmpathizeLine />,
      type: 'selection',
      options: ['Adoptable', 'Adopted', 'Fostered'],
      name: 'status',
    },
    {
      title: 'Height',
      value: `${pet.height} cm`,
      icon: <RiArrowUpDownLine />,
      type: 'number',
      name: 'height',
      suffix: 'cm',
    },
    {
      title: 'Weight',
      value: `${pet.weight} kg`,
      icon: <RiScales2Line />,
      type: 'number',
      name: 'weight',
      suffix: 'kg',
    },
    {
      title: 'Color',
      value: pet.color,
      icon: <RiPaletteLine />,
      type: 'text',
      name: 'color',
    },
    {
      title: 'Hypoallergenic',
      value: pet.hypoallergenic ? 'Yes' : 'No',
      icon: <RiCapsuleLine />,
      type: 'selection',
      options: [true, false],
      name: 'hypoallergenic',
    },
    {
      title: 'Diet',
      value: pet.diet,
      icon: <RiRestaurantLine />,
      type: 'text',
      name: 'diet',
    },
  ];

  return (
    <>
      <div className="text-4xl pb-3 flex justify-between items-center">
        <h1>
          {!onEdit && pet.name}
          {onEdit && (
            <Input
              type="text"
              value={pet.name}
              name="name"
              label="Pet Name"
              onChange={onEdit}
            />
          )}
        </h1>
      </div>
      <div className="text-2xl">
        {`${pet.gender} ${pet.species.toLowerCase()}, ${pet.age}.`}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 border-t border-b py-3">
        <IconContext.Provider value={{ size: '1.5em' }}>
          {petTable.map(
            (field) =>
              (onEdit || field.value) && (
                <div key={field.title} className="flex p-3">
                  <div className="w-12 flex items-center">{field.icon}</div>
                  <div className="w-full">
                    <div className="font-semibold">{field.title}</div>
                    <div className="flex">
                      {!onEdit && field.value}
                      {onEdit && ['number', 'text'].includes(field.type) && (
                        <Input
                          value={pet[field.name]}
                          name={field.name}
                          onChange={onEdit}
                          type={field.type}
                          suffix={field.suffix}
                        />
                      )}
                      {onEdit && field.type === 'selection' && (
                        <Selection
                          action={field.title}
                          options={field.options}
                          value={pet[field.name]}
                        >
                          <ul>{field.options.map((option) => option)}</ul>
                        </Selection>
                      )}
                    </div>
                  </div>
                </div>
              )
          )}
        </IconContext.Provider>
      </div>
      <div className="mt-3 text-lg">
        {!onEdit && pet.bio}
        {onEdit && (
          <Input
            type="textarea"
            value={pet.bio}
            name="bio"
            label="Bio"
            onChange={onEdit}
          ></Input>
        )}
      </div>
    </>
  );
}
