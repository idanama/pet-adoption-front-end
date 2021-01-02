import { useEffect, useState } from 'react';
import Modal from './base/Modal';
import Input from './base/Input';
import Button from './base/Button';
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

  const handleEdit = (edited) => {
    setForm({ ...form, ...edited });
  };

  const [error, setError] = useState('');

  useEffect(() => {
    if (
      form.passwordConfirm.length > 0 &&
      form.password !== form.passwordConfirm
    ) {
      setError((e) => ({
        ...e,
        passwordConfirm: 'Passwords do not match',
      }));
    } else {
      setError((e) => ({ ...e, passwordConfirm: null }));
    }
  }, [form.password, form.passwordConfirm]);

  return (
    <Modal title="Register" close={close}>
      <form className="flex flex-col">
        <Input
          type="email"
          name="email"
          label="Email"
          value={form.email}
          onChange={handleEdit}
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
          error={error.passwordConfirm}
          required
        />

        <Input
          type="text"
          name="fName"
          label="First Name"
          value={form.fName}
          onChange={handleEdit}
          required
        />
        <Input
          type="text"
          name="lName"
          label="Last Name"
          value={form.lName}
          onChange={handleEdit}
          required
        />
        <Input
          type="number"
          name="phone"
          label="Phone Number"
          value={form.phone}
          onChange={handleEdit}
          required
        />
        <Button submit primary xl onClick={() => api.signup(form)}>
          Register
        </Button>
      </form>
    </Modal>
  );
}
