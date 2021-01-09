import { useContext, useState } from 'react';
import Modal from './base/Modal';
import Input from './base/Input';
import Button from './base/Button';
import userContext from '../context/userContext';
import validateFields from '../utils/validator';

export default function Login({ close }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleEdit = (edited) => {
    setForm({ ...form, ...edited });
    setErrors({ ...errors, ...validateFields(edited) });
  };

  const { login } = useContext(userContext);

  return (
    <Modal title="Login" close={close}>
      <form action="/api/login" method="post" className="flex flex-col">
        <Input
          type="email"
          name="email"
          label="Email"
          value={form.email}
          error={errors.email}
          onChange={handleEdit}
          required
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={handleEdit}
          required
        />
        <Button
          submit
          primary
          xl
          onClick={async () => {
            if (Object.values(errors).every((item) => item === null)) {
              await login(form.email, form.password);
              close();
            }
          }}
        >
          Login
        </Button>
      </form>
    </Modal>
  );
}
