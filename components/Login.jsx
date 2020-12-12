import { useState } from 'react';
import Modal from './base/Modal';
import Input from './base/Input';
import Button from './base/Button';

export default function Login({ close }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal title="Login" close={close}>
      <form className="flex flex-col">
        <Input
          type="email"
          name="Email"
          value={email}
          onChange={setEmail}
          required
        />
        <Input
          type="password"
          name="Password"
          value={password}
          onChange={setPassword}
          required
        />
        <Button submit primary xl>
          {' '}
          Login
        </Button>
      </form>
    </Modal>
  );
}
