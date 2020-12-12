import { useEffect, useState } from 'react';
import Modal from './base/Modal';
import Input from './base/Input';
import Button from './base/Button';

export default function Register({ close }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

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
        />
        <Input
          type="password"
          name="Confirm Password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          error={error.passwordConfirm}
        />

        <Input
          type="text"
          name="First Name"
          value={firstName}
          onChange={setFirstName}
        />
        <Input
          type="text"
          name="Last Name"
          value={lastName}
          onChange={setLastName}
        />
        <Input
          type="number"
          name="Phone Number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
        <Button type="submit" primary xl onClick={close}>
          Register
        </Button>
      </form>
    </Modal>
  );
}
