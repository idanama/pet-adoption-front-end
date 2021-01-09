const { createContext } = require('react');

const loggedIn = createContext({
  loggedIn: false,
  user: {},
  login: () => { },
  logout: () => { },
  signup: () => { },
  savedPets: [],
  setSavedPet: () => { },
  updateUser: () => { },
});

export default loggedIn;
