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
  RiCake2Line,
} from 'react-icons/ri';
import Selection from './base/Selection';
import Input from './base/Input';
import Options from './base/Options';
import { useEffect, useState } from 'react';

export default function PetProfile({ pet, onEdit }) {
  const [petCompare, setPetCompare] = useState({});

  useEffect(() => {
    setPetCompare(pet);
  }, []);

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
      type: 'boolean',
      options: ['Yes', 'No'],
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

  const newValueStyle = 'border-2 border-primary';

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
              onChange={onEdit}
              placeholder="Pet Name"
              className={pet.name !== petCompare.name && newValueStyle}
            />
          )}
        </h1>
      </div>
      <div className="text-2xl">
        {`${pet.gender} ${pet.species.toLowerCase()}${
          pet.dateOfBirth === petCompare.dateOfBirth ? `, ${pet.age}` : ''
        }.`}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 border-t border-b py-3">
        <IconContext.Provider value={{ size: '1.5em' }}>
          {onEdit && (
            <div className="flex p-3">
              <div className="w-12 flex items-center">
                <RiCake2Line />
              </div>
              <div className="w-full">
                <div className="font-semibold">Date of birth</div>
                <div className="flex">
                  <div
                    className={`rounded-3xl border w-full p-3 ${
                      pet.dateOfBirth !== petCompare.dateOfBirth &&
                      newValueStyle
                    }`}
                  >
                    <input
                      type="date"
                      id="birthday"
                      value={
                        pet.dateOfBirth &&
                        new Date(pet.dateOfBirth)
                          .toISOString()
                          .replace(/T.*/, '')
                      }
                      name="birthday"
                      onChange={(e) => onEdit({ dateOfBirth: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
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
                          className={
                            pet[field.name] !== petCompare[field.name] &&
                            newValueStyle
                          }
                        />
                      )}
                      {onEdit && field.type === 'selection' && (
                        <>
                          <Options
                            value={pet[field.name]}
                            name={field.name}
                            fullwidth
                            className={
                              pet[field.name] !== petCompare[field.name] &&
                              newValueStyle
                            }
                          >
                            {field.options.map((option, i) => (
                              <label
                                key={option}
                                htmlFor={option}
                                className={`flex items-center px-6 py-2 ${
                                  field.options.length - 1 > i && 'border-b'
                                } hover:bg-gray-200 text-lg cursor-pointer`}
                              >
                                <input
                                  id={option}
                                  name={field.name}
                                  type="radio"
                                  value={field.value}
                                  className="hidden pointer-events-none"
                                  checked={pet[field.name] === option}
                                  onChange={() =>
                                    onEdit({ [field.name]: option })
                                  }
                                />
                                {option}
                              </label>
                            ))}
                          </Options>
                        </>
                      )}
                      {onEdit && field.type === 'boolean' && (
                        <>
                          <Options
                            value={pet[field.name] ? 'Yes' : 'No'}
                            name={field.name}
                            onChange={onEdit}
                            fullwidth
                            className={
                              pet[field.name] !== petCompare[field.name] &&
                              newValueStyle
                            }
                          >
                            <label
                              htmlFor="yes"
                              className="flex items-center px-6 py-2 border-b hover:bg-gray-200 text-lg cursor-pointer"
                            >
                              <input
                                id="yes"
                                name={field.name}
                                type="radio"
                                value="yes"
                                className="hidden pointer-events-none"
                                checked={pet[field.name] === true}
                                onChange={() => onEdit({ [field.name]: true })}
                              />
                              Yes
                            </label>

                            <label
                              htmlFor="no"
                              className="flex items-center px-6 py-2 border-b hover:bg-gray-200 text-lg cursor-pointer"
                            >
                              <input
                                id="no"
                                name={field.name}
                                type="radio"
                                value="no"
                                onChange={() => onEdit({ [field.name]: false })}
                                className="hidden pointer-events-none"
                                checked={pet[field.name] === false}
                              />
                              No
                            </label>
                          </Options>
                        </>
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
            placeholder="Pet Bio"
            name="bio"
            onChange={onEdit}
            className={pet.bio !== petCompare.bio && newValueStyle}
          ></Input>
        )}
      </div>
    </>
  );
}
