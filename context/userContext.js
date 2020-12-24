const { createContext } = require('react');

const loggedIn = createContext({
  loggedIn: false,
  user: {},
  login: () => { },
  logout: () => { },
  signup: () => { },
});

export default loggedIn;
