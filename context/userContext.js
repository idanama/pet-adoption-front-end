const { createContext } = require('react');

const loggedIn = createContext({
  loggedIn: false,
  user: {},
  login: () => { },
  logout: () => { },
});

export default loggedIn;
