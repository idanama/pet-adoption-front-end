import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import api from '../utils/api';

import Button from '../components/base/Button';
import Input from '../components/base/Input';
import userContext from '../context/userContext';
import validateFields from '../utils/validator';
import removeEmpty from '../utils/removeEmpty';

export default function Profile() {
  const { user } = useContext(userContext);

  const [formUser, updateFormUser] = useState({
    lName: '',
    fName: '',
    phone: '',
    email: '',
    bio: '',
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const handleEdit = (edited) => {
    updateFormUser({ ...formUser, ...edited });
    setErrors({ ...errors, ...validateFields(edited) });
  };

  const getUser = async (userId) => {
    setLoading(true);
    const { res, error } = await api.getUserFull(userId);
    if (!error) {
      updateFormUser({ ...formUser, ...res });
    } else {
      setErrors({ page: 'Could not load profile ☹' });
    }
    setLoading(false);
  };

  const saveChanges = async () => {
    if (Object.values(errors).every((item) => item === null)) {
      const userToUpdate = removeEmpty(formUser);
      const { res, error } = await api.updateUser(user._id, userToUpdate);
      if (!error) {
        setErrors({});
        updateFormUser({ ...formUser, res });
      } else {
        setErrors(error.errors);
      }
    }
  };

  useEffect(() => {
    if (user._id) {
      getUser(user._id);
    }
  }, [user]);

  if (errors?.page) {
    return (
      <>
        <Head>
          <title>SPCA - My Profile</title>
        </Head>
        <div className="container-max">
          <h1 className="text-3xl">Profile</h1>
          <p>{errors.page}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>SPCA - My Profile</title>
      </Head>
      <div className="container-max">
        <h1 className="text-3xl">Profile</h1>
        <form
          action={`/api/update/${user._id}`}
          method="put"
          className="flex pt-10 flex-col max-w-lg"
          autoComplete="off"
        >
          <Input
            label="First Name"
            name="fName"
            value={formUser.fName}
            type="text"
            onChange={handleEdit}
            error={errors.fName?.message || errors.fName}
          />
          <Input
            label="Last Name"
            name="lName"
            value={formUser.lName}
            type="text"
            onChange={handleEdit}
            error={errors.lName?.message || errors.lName}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={formUser.phone}
            type="number"
            onChange={handleEdit}
            error={errors.phone?.message || errors.phone}
          />
          <Input
            label="Email"
            name="email"
            value={formUser.email}
            type="email"
            onChange={handleEdit}
            error={errors.email?.message || errors.email}
          />
          <Input
            label="Bio"
            name="bio"
            value={formUser.bio}
            type="textarea"
            onChange={handleEdit}
            error={errors.bio?.message}
          />
          <Button submit xl className="max-w-min" onClick={saveChanges}>
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
