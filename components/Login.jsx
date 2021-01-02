import { useContext, useState } from 'react';
import Modal from './base/Modal';
import Input from './base/Input';
import Button from './base/Button';
import userContext from '../context/userContext';

export default function Login({ close }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleEdit = (edited) => {
    setForm({ ...form, ...edited });
  };

  const { login } = useContext(userContext);

  return (
    <Modal title="Login" close={close}>
      <form className="flex flex-col">
        <Input
          type="email"
          name="email"
          label="Email"
          value={form.email}
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
            await login(form.email, form.password);
            close();
          }}
        >
          Login
        </Button>
      </form>
    </Modal>
  );
}
