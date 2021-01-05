import { IconContext } from 'react-icons';
import {
  RiPaletteLine,
  RiMenLine,
  RiWomenLine,
  RiGenderlessLine,
  RiScales2Line,
  RiArrowUpDownLine,
  RiCapsuleLine,
  RiEmpathizeLine,
  RiRestaurantLine,
  RiCake2Line,
  RiPriceTagLine,
  RiHonourLine,
} from 'react-icons/ri';
import { useEffect, useState } from 'react';
import Input from './base/Input';
import Options from './base/Options';

export default function PetProfile({ pet, onEdit, errors }) {
  const [petCompare, setPetCompare] = useState({});

  useEffect(() => {
    setPetCompare(pet);
  }, []);

  const gender = {
    Male: <RiMenLine />,
    Female: <RiWomenLine />,
    Other: <RiGenderlessLine />,
  };

  const petTable = [
    {
      title: 'Date of birth',
      icon: <RiCake2Line />,
      type: 'date',
      name: 'dateOfBirth',
      editOnly: true,
    },
    {
      title: 'Species',
      icon: <RiPriceTagLine />,
      type: 'selection',
      options: ['Cat', 'Dog', 'Other'],
      name: 'species',
      editOnly: true,
    },
    {
      title: 'Gender',
      icon: gender[pet.gender] || <RiGenderlessLine />,
      type: 'selection',
      options: ['Male', 'Female', 'Other'],
      name: 'gender',
    },
    {
      title: 'Adoption Status',
      icon: <RiEmpathizeLine />,
      type: 'selection',
      options: ['Adoptable', 'Adopted', 'Fostered'],
      name: 'status',
    },
    {
      title: 'Height',
      icon: <RiArrowUpDownLine />,
      type: 'number',
      name: 'height',
      suffix: 'cm',
    },
    {
      title: 'Weight',
      icon: <RiScales2Line />,
      type: 'number',
      name: 'weight',
      suffix: 'kg',
    },
    {
      title: 'Color',
      icon: <RiPaletteLine />,
      type: 'text',
      name: 'color',
    },
    {
      title: 'Breed',
      icon: <RiHonourLine />,
      type: 'text',
      name: 'breed',
    },
    {
      title: 'Hypoallergenic',
      icon: <RiCapsuleLine />,
      type: 'boolean',
      options: ['Yes', 'No'],
      name: 'hypoallergenic',
    },
    {
      title: 'Diet',
      icon: <RiRestaurantLine />,
      type: 'text',
      name: 'diet',
    },
  ].filter((item) => !!item.editOnly === !!onEdit || onEdit);

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
              error={errors?.name?.message}
            />
          )}
        </h1>
      </div>
      <div className="text-2xl">
        {!onEdit && `${pet.gender} ${pet.species?.toLowerCase()}, ${pet.age}.`}
        {onEdit && (
          <Input
            type="text"
            value={pet.tagline}
            name="tagline"
            onChange={onEdit}
            placeholder="Tagline"
            className={pet.tagline !== petCompare.tagline && newValueStyle}
            error={errors?.tagline?.message}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 border-t border-b py-3">
        <IconContext.Provider value={{ size: '1.5em' }}>
          {petTable.map(
            (field) =>
              (onEdit || pet[field.name] !== undefined) && (
                <div key={field.title} className="flex p-3">
                  <div className="w-12 flex items-center">{field.icon}</div>
                  <div className="w-full">
                    <div className="font-semibold">{field.title}</div>
                    <div className="flex">
                      {!onEdit &&
                        field.type !== 'boolean' &&
                        `${pet[field.name]}
                        ${field.suffix ? ` ${field.suffix}` : ''}`}
                      {!onEdit &&
                        field.type === 'boolean' &&
                        `${pet[field.name] ? 'Yes' : 'No'}`}

                      {onEdit &&
                        ['number', 'text', 'date'].includes(field.type) && (
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
                            error={errors?.[field.name]?.message}
                          />
                        )}
                      {onEdit && field.type === 'selection' && (
                        <>
                          <Options
                            value={pet[field.name]}
                            name={field.name}
                            label={field.title}
                            fullwidth
                            className={
                              pet[field.name] !== petCompare[field.name] &&
                              newValueStyle
                            }
                            error={errors?.[field.name]?.message}
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
                                  value={pet[field.name]}
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
                            error={errors?.[field.name]?.message}
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
            error={errors?.bio?.message}
          />
        )}
      </div>
    </>
  );
}
