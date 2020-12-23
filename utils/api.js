// const baseUrl = 'https://pet-adoption-back-end.herokuapp.com';
const baseUrl = 'http://localhost:5000';

const fetchJson = async (url, options) => {
  const optionHelper = { ...options };
  if (optionHelper.body) {
    optionHelper.headers = { 'Content-Type': 'application/json' };
    optionHelper.body = JSON.stringify(options.body);
  }
  optionHelper.credentials = 'include';
  const res = await fetch(url, optionHelper);
  if (res.ok) {
    console.log('ok');
    return res.json();
  }
  console.log('not OK');
  throw new Error(res.body);
};

const signup = async (userData) => fetchJson(`${baseUrl}/signup`, { method: 'POST', body: userData });
const login = async (email, password) => fetchJson(`${baseUrl}/login`, { method: 'POST', body: { email, password } });

const addPet = (petData) => fetchJson(`${baseUrl}/pet`, { method: 'POST', body: petData });
const getPet = (petId) => fetchJson(`${baseUrl}/pet/${petId}`);
const getPetByName = (petName) => fetchJson(`${baseUrl}/pet/name/${petName}`);
const getRandomPet = () => fetchJson(`${baseUrl}/pet/random`);
const getPets = () => fetchJson(`${baseUrl}/pet`);
const editPet = (petId, petData) => fetchJson(`${baseUrl}/pet/${petId}`, { method: 'PUT', body: petData });
const adoptPet = (petId, type) => fetchJson(`${baseUrl}/pet/${petId}/adopt`, { method: 'POST', body: type });
const returnPet = (petId) => fetchJson(`${baseUrl}/pet/${petId}/return`, { method: 'POST' });
const savePet = (petId) => fetchJson(`${baseUrl}/pet/${petId}/save`, { method: 'POST' });
const deleteSavedPet = (petId) => fetchJson(`${baseUrl}/pet/${petId}/save`, { method: 'DELETE' });
const getUserPets = (userId) => fetchJson(`${baseUrl}/pet/user/${userId}`);
const getUser = (userId) => fetchJson(`${baseUrl}/user/${userId}`);
const getUserFull = (userId) => fetchJson(`${baseUrl}/user/${userId}/full`);
const updateUser = (userId, userData) => fetchJson(`${baseUrl}/user/${userId}`, { method: 'PUT', body: userData });
const getUsers = () => fetchJson(`${baseUrl}/user`);

export default {
  login,
  signup,
  addPet,
  getPet,
  getPetByName,
  getRandomPet,
  editPet,
  getPets,
  adoptPet,
  returnPet,
  savePet,
  deleteSavedPet,
  getUserPets,
  getUser,
  getUserFull,
  updateUser,
  getUsers,
};
