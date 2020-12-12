const { createContext } = require('react');

const loggedIn = createContext({
  loggedIn: false,
  login: () => { },
  logout: () => { },
});

export default loggedIn;
