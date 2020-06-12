import axios from 'axios';
import { async } from 'q';

export default {
  login: async data => {
    return await axios.post('/v1/api/user/auth', data);
  },
  registration: async data => {
    return await axios.post('/v1/api/user', data);
  },
  getCurrentUser: async () => {
    return await axios.get('/v1/api/user/current');
  },
  confirmUserAccount: async hash => {
    return await axios.get(`/v1/api/user/confirmation/${hash}`);
  },
  resetPasswordEmail: async email => {
    return await axios.post('/v1/api/user/reset-password', { email });
  },
  resetPassword: async ({ hash, password }) => {
    return await axios.put('/v1/api/user/reset-password', { hash, password });
  }
};
