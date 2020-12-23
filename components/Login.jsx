import { useContext, useState } from 'react';
import Modal from './base/Modal';
import Input from './base/Input';
import Button from './base/Button';
import userContext from '../context/userContext';

export default function Login({ close }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(userContext);

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
        <Button
          submit
          primary
          xl
          onClick={async () => {
            await login(email, password);
            close();
          }}
        >
          Login
        </Button>
      </form>
    </Modal>
  );
}
