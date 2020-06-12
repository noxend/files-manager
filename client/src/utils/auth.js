import axios from 'axios';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = token;
};

const removeAuthToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export { setAuthToken, removeAuthToken };
