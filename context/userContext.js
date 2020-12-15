const { createContext } = require('react');

const loggedIn = createContext({
  loggedIn: false,
  user: {
    fName: '',
    lName: '',
    email: '',
    phone: '',
    password: '', // change before deploy
    bio: '',
  },
  login: () => { },
  logout: () => { },
  updateUser: () => { },
  pets: {},
  getPet: () => { },
});

export default loggedIn;
