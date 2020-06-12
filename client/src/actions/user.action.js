import { setAuthToken, removeAuthToken } from '../utils/auth';
import { user } from '../services/api';

export default {
  loginUser: token => dispatch => {
    dispatch({
      type: 'USER_DATA_LOADING'
    });
    setAuthToken(token);
    localStorage.setItem('jwtToken', token);
    user
      .getCurrentUser()
      .then(({ data }) => {
        dispatch({
          type: 'USER_LOGIN',
          payload: data
        });
      })
      .catch(() => {
        dispatch({
          type: 'SESSION_TIME_EXPIRED'
        });
        localStorage.removeItem('jwtToken');
      });
  },
  logoutUser: () => dispatch => {
    removeAuthToken();
    localStorage.removeItem('jwtToken');
    dispatch({
      type: 'USER_LOGOUT'
    });
  },
  sessionTimeExpired: () => dispatch => {
    dispatch({
      type: 'SESSION_TIME_EXPIRED'
    });
  }
};
