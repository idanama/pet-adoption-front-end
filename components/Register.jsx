import { useContext, useEffect, useState } from 'react';
import Modal from './base/Modal';
import Input from './base/Input';
import Button from './base/Button';
import userContext from '../context/userContext';

export default function Register({ close }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(userContext);

  useEffect(() => {
    if (passwordConfirm.length > 0 && password !== passwordConfirm) {
      setError((e) => ({
        ...e,
        passwordConfirm: 'Passwords do not match',
      }));
    } else {
      setError((e) => ({ ...e, passwordConfirm: null }));
    }
  }, [password, passwordConfirm]);

  return (
    <Modal title="Register" close={close}>
      <form className="flex flex-col">
        <Input type="email" name="Email" value={email} onChange={setEmail} />
        <Input
          type="password"
          name="Password"
          value={password}
          onChange={setPassword}
          required
        />
        <Input
          type="password"
          name="Confirm Password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          error={error.passwordConfirm}
          required
        />

        <Input
          type="text"
          name="First Name"
          value={firstName}
          onChange={setFirstName}
          required
        />
        <Input
          type="text"
          name="Last Name"
          value={lastName}
          onChange={setLastName}
          required
        />
        <Input
          type="number"
          name="Phone Number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          required
        />
        <Button submit primary xl onClick={() => login()}>
          Register
        </Button>
      </form>
    </Modal>
  );
}