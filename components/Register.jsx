import { useEffect, useState, useContext } from 'react';
import Modal from './base/Modal';
import Input from './base/Input';
import Button from './base/Button';
import userContext from '../context/userContext';
import validateFields from '../utils/validator';
import removeEmpty from '../utils/removeEmpty';
import api from '../utils/api';

export default function Register({ close }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    fName: '',
    lName: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const { updateUser } = useContext(userContext);

  const handleEdit = (edited) => {
    setForm({ ...form, ...edited });
    setErrors({ ...errors, ...validateFields(edited) });
  };

  const signup = async (userInfo) => {
    try {
      const { res, error } = await api.signup(userInfo);
      if (error) {
        setErrors({ ...errors, ...error });
      } else {
        updateUser(res.user);
        close();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (form.passwordConfirm.length > 0 && form.password !== form.passwordConfirm) {
      setErrors((e) => ({
        ...e,
        passwordConfirm: 'Passwords do not match',
      }));
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }
  }, [form.password, form.passwordConfirm]);

  return (
    <Modal title="Register" close={close}>
      <form action="/api/signup" method="post" className="flex flex-col">
        <Input
          type="email"
          name="email"
          label="Email"
          value={form.email}
          onChange={handleEdit}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={handleEdit}
          required
        />
        <Input
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
          value={form.passwordConfirm}
          onChange={handleEdit}
          error={errors.passwordConfirm}
          required
        />

        <Input
          type="text"
          name="fName"
          label="First Name"
          value={form.fName}
          onChange={handleEdit}
          required
          error={errors.fName}
        />
        <Input
          type="text"
          name="lName"
          label="Last Name"
          value={form.lName}
          onChange={handleEdit}
          required
          error={errors.lName}
        />
        <Input
          type="number"
          name="phone"
          label="Phone Number"
          value={form.phone}
          onChange={handleEdit}
          required
          error={errors.phone}
        />
        <Button
          submit
          primary
          xl
          onClick={async () => {
            if (Object.values(errors).every((item) => item === null)) {
              await signup(removeEmpty(form));
            }
          }}
        >
          Register
        </Button>
      </form>
    </Modal>
  );
}
