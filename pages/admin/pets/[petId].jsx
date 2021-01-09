import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RiUpload2Line } from 'react-icons/ri';

import Button from '../../../components/base/Button';
import PetProfile from '../../../components/PetProfile';
import api from '../../../utils/api';
import validateFields from '../../../utils/validator';

import userContext from '../../../context/userContext';

export default function EditPet() {
  const { petId } = useRouter().query;

  const { user } = useContext(userContext);

  const [pet, setPet] = useState({
    Name: 'Loading',
    pictures: [''],
    gender: '',
    dateOfBirth: new Date(),
    type: '',
  });
  const [picture, setPicture] = useState({ preview: null, file: null });
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(true);

  const fetchPetById = async (id) => {
    const { res, ok } = await api.getPet(id);
    if (ok) {
      setPet(res);
    }
    setLoading(false);
  };

  const handleEdit = (edited) => {
    setPet({ ...pet, ...edited });
    setErrors({ ...errors, ...validateFields(edited) });
  };

  const saveChanges = async () => {
    const formData = new FormData();
    Object.keys(pet).forEach((key) => {
      if (pet[key] !== '') {
        formData.append(key, pet[key]);
      }
    });
    if (picture.file) {
      formData.append('picture', picture.file);
    }
    const { res, error } = await api.editPet(petId, formData);
    if (!error) {
      setErrors({});
      setLoading(true);
      setPet({ ...pet, res });
      setLoading(false);
    } else {
      setErrors(error.errors);
    }
  };

  const resetChanges = async () => {
    setLoading(true);
    fetchPetById(petId);
  };

  useEffect(() => {
    if (petId !== undefined) {
      fetchPetById(petId);
    }
  }, [petId]);

  if (user.role === 'admin') {
    return (
      <>
        <Head>
          <title>{`SPCA - Admin - ${pet.name ? pet.name : ''}`}</title>
        </Head>
        <div className="container-max">
          <h3 className="text-xl mb-4">
            <span className="text-adoptable">
              <Link href="/admin/pets/manage">← Manage Pets</Link>
            </span>
          </h3>
          <form action={`/api/pet/${petId}`} method="put" encType="multipart/form-data">
            <div className="relative rounded-2xl bg-gray-200  min-h-30v overflow-hidden">
              <label
                htmlFor="picture"
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
              >
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  className="opacity-0 absolute -z-10 w-full h-full"
                  onChange={(e) =>
                    setPicture({
                      preview: URL.createObjectURL(e.target.files[0]),
                      file: e.target.files[0],
                    })
                  }
                />
                {!picture.preview && !pet.pictures[0] && (
                  <div className="h-full w-full cursor-pointer flex items-center justify-around">
                    <RiUpload2Line size="3rem" />
                  </div>
                )}
              </label>
              <img
                src={picture.preview || pet.pictures[0]}
                alt={pet.name}
                className="object-cover h-full w-full object-center max-h-60v"
              />
            </div>
            <div className="flex">
              <div className="w-2/3 m-4">
                {!loading && <PetProfile pet={pet} onEdit={handleEdit} errors={errors} />}
              </div>
              <div className="md:px-5 w-1/3">
                <div className="sticky top-1/3 py-5">
                  <div className=" p-5 border rounded-xl shadow-xl grid grid-cols-1 gap-2 min-h-">
                    <Button primary submit onClick={saveChanges}>
                      Save changes
                    </Button>
                    <Button onClick={resetChanges}>Reset changes</Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
  return <></>;
}
