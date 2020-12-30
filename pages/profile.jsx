import { useContext, useState } from 'react';

import Button from '../components/base/Button';
import Input from '../components/base/Input';
import userContext from '../context/userContext';

export default function Profile() {
  const { user, updateUser } = useContext(userContext);
  const [formUser, updateFormUser] = useState(user);

  return (
    <div className="container-max">
      <h1 className="text-3xl">Profile</h1>
      <form className="flex pt-10 flex-col max-w-lg" autoComplete="off">
        <Input
          value={formUser.fName}
          type="text"
          onChange={(val) => updateFormUser({ ...formUser, fName: val })}
          name="First Name"
        />
        <Input
          name="Last Name"
          value={formUser.lName}
          type="text"
          onChange={(val) => updateFormUser({ ...formUser, lName: val })}
        />
        <Input
          name="Phone Number"
          value={formUser.phone}
          type="email"
          onChange={(val) => updateFormUser({ ...formUser, phone: val })}
        />
        <Input
          name="Email"
          value={formUser.email}
          type="email"
          onChange={(val) => updateFormUser({ ...formUser, email: val })}
        />
        <Input
          name="Password"
          value={formUser.password}
          type="password"
          onChange={(val) => updateFormUser({ ...formUser, password: val })}
        />
        <Input
          name="Bio"
          value={formUser.bio}
          type="textarea"
          onChange={(val) => updateFormUser({ ...formUser, bio: val })}
        />
        <Button
          submit
          xl
          className="max-w-min"
          onClick={() => {
            updateUser(formUser);
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
