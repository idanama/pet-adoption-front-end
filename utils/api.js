const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '/api';

const fetchJson = async (url, options, formData = false) => {
  const optionHelper = { ...options };
  if (optionHelper.body && !formData) {
    optionHelper.headers = { 'Content-Type': 'application/json' };
    optionHelper.body = JSON.stringify(options.body);
  }
  optionHelper.credentials = 'include';
  const res = await fetch(url, optionHelper);
  if (res.ok) {
    return { res: await res.json(), error: undefined, ok: true };
  }
  const error = await res.json();
  error.status = res.status;
  console.error(error);
  return ({ error, ok: false });
};

const signup = async (userData) => fetchJson(`${baseUrl}/signup`, { method: 'POST', body: userData });
const login = async (email, password) => fetchJson(`${baseUrl}/login`, { method: 'POST', body: { email, password } });

const addPet = (petData) => fetchJson(`${baseUrl}/pet`, { method: 'POST', body: petData }, true);
const getPet = (petId) => fetchJson(`${baseUrl}/pet/${petId}`);
const getPetByName = (petName) => fetchJson(`${baseUrl}/pet/name/${petName}`);
const getRandomPet = () => fetchJson(`${baseUrl}/pet/random`);
const getPets = () => fetchJson(`${baseUrl}/pet`);
const search = (query) => fetchJson(`${baseUrl}/search${query || ''}`);
const editPet = (petId, petData) => fetchJson(`${baseUrl}/pet/${petId}`, { method: 'PUT', body: petData }, true);
const adoptPet = (userId, petId, action) => fetchJson(`${baseUrl}/pet/${petId}/adopt`, { method: 'POST', body: { action, userId } });
const returnPet = (userId, petId) => fetchJson(`${baseUrl}/pet/${petId}/return`, { method: 'POST', body: { userId } });
const savePet = (userId, petId) => fetchJson(`${baseUrl}/pet/${petId}/save`, { method: 'POST', body: { userId } });
const deleteSavedPet = (userId, petId) => fetchJson(`${baseUrl}/pet/${petId}/save`, { method: 'DELETE', body: { userId } });
const getUserPets = (userId) => fetchJson(`${baseUrl}/pet/user/${userId}`);
const getUser = (userId) => fetchJson(`${baseUrl}/user/${userId}`);
const getUserFull = (userId) => fetchJson(`${baseUrl}/user/${userId}/full`);
const updateUser = (userId, userData) => fetchJson(`${baseUrl}/user/${userId}`, { method: 'PUT', body: userData });
const getUsers = (query) => fetchJson(`${baseUrl}/user${query || ''}`);
const hydrateUser = () => fetchJson(`${baseUrl}/user/refresh`);

export default {
  login,
  signup,
  addPet,
  getPet,
  getPetByName,
  getRandomPet,
  editPet,
  getPets,
  search,
  adoptPet,
  returnPet,
  savePet,
  deleteSavedPet,
  getUserPets,
  getUser,
  getUserFull,
  updateUser,
  getUsers,
  hydrateUser,
};
